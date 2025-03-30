import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ROOT_CONTAINER_ID } from '@/lib/constants.ts';
import { renderFonts } from '@/entryPoints/render/render-font.tsx';
import { SettingsProvider } from '@/hooks/useSettings.tsx';

if (import.meta.env.DEV) {
  // Only when vite in development mode `yarn dev`
  import('@/assets/fonts/index.css');
}

export default function renderRoot(rootElement: HTMLElement | ShadowRoot, rootNode: ReactNode) {
  if (import.meta.env.PROD) {
    // Inject custom font files resolved chrome ext path in production build
    renderFonts();
  }

  const rootContainer = document.createElement('div');
  rootContainer.id = ROOT_CONTAINER_ID;

  rootElement.append(rootContainer);

  const isContent = rootElement instanceof ShadowRoot;

  createRoot(rootContainer).render(
    <SettingsProvider defaultTheme="light" shadowRoot={isContent ? rootElement : undefined}>
      {rootNode}
    </SettingsProvider>,
  );
}

export function renderWithShadowRoot(shadowRoot: ShadowRoot, rootNode: ReactNode) {
  if (import.meta.env.PROD) {
    // Inject custom font files resolved chrome ext path in production build
    renderFonts();
  }

  createRoot(shadowRoot).render(
    <SettingsProvider defaultTheme="light" shadowRoot={shadowRoot}>
      {rootNode}
    </SettingsProvider>,
  );
}
