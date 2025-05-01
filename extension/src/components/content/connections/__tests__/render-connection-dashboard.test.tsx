import { renderConnectionDashboard, CONNECTION_OVERVIEW_CHART_ID } from '../render-connection-dashboard';
import '@testing-library/jest-dom';
import { waitFor, act } from '@testing-library/react';
import { VersionMapperElements } from '@/lib/version-mapper-elements';

// Mock do GetTailwindBackStyles
jest.mock('@/lib/tailwind-custom', () => ({
  GetTailwindBackStyles: (root: HTMLElement) => {
    const shadowRoot = root.attachShadow({ mode: 'open' });
    return shadowRoot;
  },
}));

// Mock dos componentes React
jest.mock('@/hooks/useSettings', () => ({
  GetGeneralSettings: jest.fn().mockResolvedValue({
    connectionsSettings: {
      connections_dashboard: true,
    },
  }),
  SettingsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/hero-configured-provider', () => ({
  HeroConfiguredProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/hero-render-protected-url', () => ({
  HeroRenderProtectedUrlPath: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/content/connections/connection-data-provider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/content/connections/connection-bar-chart', () => ({
  ConnectionBarOverviewChart: () => <div data-testid="bar-chart">Bar Chart</div>,
}));

jest.mock('@/components/content/connections/connection-pizza-chart', () => ({
  ConnectionPizzaOverviewChart: () => <div data-testid="pizza-chart">Pizza Chart</div>,
}));

jest.mock('@/components/content/connections/close-connection', () => ({
  CloseConnection: () => <div data-testid="close-connection">Close Connection</div>,
}));

jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs">{children}</div>,
  TabsList: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs-trigger">{children}</div>,
  TabsContent: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs-content">{children}</div>,
}));

jest.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
}));

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

describe('renderConnectionDashboard', () => {
  let originalConsoleDebug: typeof console.debug;
  let originalConsoleInfo: typeof console.info;
  let mockMapper: VersionMapperElements;

  beforeEach(() => {
    // Limpa o DOM antes de cada teste
    document.body.innerHTML = `
      <div id="main">
        <div id="connections-tab"></div>
        <div id="connections-container">
          <div>First child</div>
          <div>Second child</div>
        </div>
      </div>
    `;

    // Mock do mapper
    mockMapper = {
      GetNodeOfConnectionsTab: jest.fn().mockReturnValue(document.getElementById('connections-tab')),
      GetNodeOfConnectionsMainContainer: jest.fn().mockReturnValue(document.getElementById('connections-container')),
    } as any;

    // Reseta os mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restaura os consoles originais após cada teste
    if (originalConsoleDebug) {
      console.debug = originalConsoleDebug;
    }
    if (originalConsoleInfo) {
      console.info = originalConsoleInfo;
    }
  });

  it('should not render when connections tab is not selected', async () => {
    // Mock do console.debug
    originalConsoleDebug = console.debug;
    console.debug = jest.fn();

    // Mock do mapper para retornar null (tab não selecionada)
    mockMapper.GetNodeOfConnectionsTab = jest.fn().mockReturnValue(null);

    // Executa a função dentro do act
    await act(async () => {
      await renderConnectionDashboard(mockMapper);
    });

    // Verifica se o console.debug foi chamado com a mensagem correta
    expect(console.debug).toHaveBeenCalledWith(
      'Connections tab is not selected or was not founded. Cancelling renderConnectionDashboard',
    );

    // Verifica se o componente não foi renderizado
    const dashboardElement = document.getElementById(CONNECTION_OVERVIEW_CHART_ID);
    expect(dashboardElement).toBeFalsy();
  });

  it('should render dashboard when connections tab is selected and settings enabled', async () => {
    // Mock do console.info
    originalConsoleInfo = console.info;
    console.info = jest.fn();

    // Executa a função dentro do act
    await act(async () => {
      await renderConnectionDashboard(mockMapper);
    });

    // Verifica se o componente foi renderizado
    const dashboardElement = document.getElementById(CONNECTION_OVERVIEW_CHART_ID);
    expect(dashboardElement).toBeTruthy();

    // Verifica se o componente foi inserido na posição correta
    const container = document.getElementById('connections-container');
    expect(container?.children[1].id).toBe(CONNECTION_OVERVIEW_CHART_ID);

    // Verifica se o console.info foi chamado
    expect(console.info).toHaveBeenCalledWith('Connection dashboard rendered');
  });

  it('should remove dashboard when settings are disabled', async () => {
    // Mock das configurações para desabilitar o dashboard
    const { GetGeneralSettings } = require('@/hooks/useSettings');
    GetGeneralSettings.mockResolvedValueOnce({
      connectionsSettings: {
        connections_dashboard: false,
      },
    });

    // Cria um elemento existente
    const existingDashboard = document.createElement('div');
    existingDashboard.id = CONNECTION_OVERVIEW_CHART_ID;
    document.body.appendChild(existingDashboard);

    // Executa a função dentro do act
    await act(async () => {
      await renderConnectionDashboard(mockMapper);
    });

    // Verifica se o componente foi removido
    const dashboardElement = document.getElementById(CONNECTION_OVERVIEW_CHART_ID);
    expect(dashboardElement).toBeFalsy();
  });

  it('should not create duplicate elements', async () => {
    // Cria um elemento existente
    const existingDashboard = document.createElement('div');
    existingDashboard.id = CONNECTION_OVERVIEW_CHART_ID;
    document.body.appendChild(existingDashboard);

    // Executa a função dentro do act
    await act(async () => {
      await renderConnectionDashboard(mockMapper);
    });

    // Verifica se não há elementos duplicados
    const dashboardElements = document.querySelectorAll(`#${CONNECTION_OVERVIEW_CHART_ID}`);
    expect(dashboardElements.length).toBe(1);
  });
});
