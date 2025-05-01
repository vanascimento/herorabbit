import { renderVersionInfo, VERSION_ELEMENT_ID } from '../render-version-info';
import '@testing-library/jest-dom';
import { waitFor, act } from '@testing-library/react';

// Mock do GetTailwindBackStyles
jest.mock('@/lib/tailwind-custom', () => ({
  GetTailwindBackStyles: (root: HTMLElement) => {
    const shadowRoot = root.attachShadow({ mode: 'open' });
    return shadowRoot;
  },
}));

// Mock do fetch
global.fetch = jest.fn();

// Mock do chrome.runtime
global.chrome = {
  runtime: {
    getManifest: jest.fn().mockReturnValue({ version: '1.0.0' }),
  },
} as any;

// Mock da função waitForElement
jest.mock('@/lib/wait-for-element', () => ({
  waitForElement: (selector: string, callback: (element: Element) => void) => {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
    }
    return Promise.resolve();
  },
}));

describe('renderVersionInfo', () => {
  let originalConsoleError: typeof console.error;
  let originalConsoleInfo: typeof console.info;

  beforeEach(() => {
    // Limpa o DOM antes de cada teste
    document.body.innerHTML = `
      <div id="main">
        <div id="logo"></div>
      </div>
    `;

    // Reseta os mocks
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
  });

  afterEach(() => {
    // Restaura os consoles originais após cada teste
    if (originalConsoleError) {
      console.error = originalConsoleError;
    }
    if (originalConsoleInfo) {
      console.info = originalConsoleInfo;
    }
  });

  it('should not render anything when versions match', async () => {
    // Mock da resposta da API do GitHub
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ tag_name: 'v1.0.0' }),
    });

    // Executa a função dentro do act
    await act(async () => {
      await renderVersionInfo();
    });

    // Espera o componente ser renderizado
    await waitFor(() => {
      const versionElement = document.getElementById(VERSION_ELEMENT_ID);
      expect(versionElement).toBeTruthy();
      expect(versionElement?.shadowRoot?.innerHTML || '').not.toContain('Hero Rabbit alert');
    });
  });

  it('should render alert when versions do not match', async () => {
    // Mock da resposta da API do GitHub com uma versão mais recente
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ tag_name: 'v2.0.0' }),
    });

    // Executa a função dentro do act
    await act(async () => {
      await renderVersionInfo();
    });

    // Espera o componente ser renderizado
    await waitFor(() => {
      const versionElement = document.getElementById(VERSION_ELEMENT_ID);
      expect(versionElement).toBeTruthy();
      expect(versionElement?.shadowRoot?.innerHTML || '').toContain('Hero Rabbit alert');
      expect(versionElement?.shadowRoot?.innerHTML || '').toContain('Your version is 1.0.0, latest is 2.0.0');
    });
  });

  it('should not create duplicate elements', async () => {
    // Mock da resposta da API do GitHub
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ tag_name: 'v1.0.0' }),
    });

    // Simula que o elemento já existe
    const existingElement = document.createElement('div');
    existingElement.id = VERSION_ELEMENT_ID;
    document.body.appendChild(existingElement);

    // Executa a função dentro do act
    await act(async () => {
      await renderVersionInfo();
    });

    const elements = document.querySelectorAll(`#${VERSION_ELEMENT_ID}`);
    expect(elements.length).toBe(1);
  });

  it('should not render when version-info element already exists in document', async () => {
    // Mock do console.info
    originalConsoleInfo = console.info;
    console.info = jest.fn();

    // Mock da resposta da API do GitHub
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ tag_name: 'v2.0.0' }),
    });

    // Cria um elemento com id version-info no documento
    const existingVersionInfo = document.createElement('span');
    existingVersionInfo.id = 'version-info';
    document.body.appendChild(existingVersionInfo);

    // Executa a função dentro do act
    await act(async () => {
      await renderVersionInfo();
    });

    // Verifica se o console.info foi chamado com a mensagem correta
    expect(console.info).toHaveBeenCalledWith('Queue dashboard rendered');

    // Verifica se não foi criado um novo elemento
    const versionElements = document.querySelectorAll('#version-info');
    expect(versionElements.length).toBe(1);
  });

  it('should handle API errors gracefully', async () => {
    // Salva o console.error original
    originalConsoleError = console.error;
    // Mock do console.error para não mostrar o erro no console
    console.error = jest.fn();

    // Mock da resposta da API do GitHub com erro
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    // Executa a função dentro do act
    await act(async () => {
      await renderVersionInfo();
    });

    // Verifica se não houve erro
    const versionElement = document.getElementById(VERSION_ELEMENT_ID);
    expect(versionElement).toBeFalsy();

    // Verifica se o console.error foi chamado com o erro esperado
    expect(console.error).toHaveBeenCalledWith('Error fetching version info:', expect.any(Error));
  });
});
