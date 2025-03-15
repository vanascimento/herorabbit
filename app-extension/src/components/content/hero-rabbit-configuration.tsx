import { waitForElement } from '@/lib/wait-for-element';
import mainCSS from '@/entryPoints/main.css?inline';
import contentCSS from '@/components/content/content.css?inline';
import { createRoot } from 'react-dom/client';
import { SettingsProvider } from '@/hooks/useSettings';
import { Rabbit } from 'lucide-react';
import { ConfigureHeroRabbitModal } from './configure-modal/configure-modal';
import { Button } from '../ui/button';

export default function HeroRabbitConfiguration() {
  return <ConfigureHeroRabbitModal />;
}

export const HERO_RABBIT_CONFIGURATION_BUTTON_ID = 'hero-rabbit-configuration-button';
const PARENT_ELEMENT_ID = 'versions';

export function renderHeroRabbitConfiguration() {
  waitForElement('#versions', (versionSpan) => {
    // Check if the component is already rendered. If so, do nothing.
    let existingComponent = document.getElementById(HERO_RABBIT_CONFIGURATION_BUTTON_ID);
    if (existingComponent) {
      return;
    }

    const root = document.createElement('div');
    root.id = HERO_RABBIT_CONFIGURATION_BUTTON_ID;
    const container = document.getElementById(PARENT_ELEMENT_ID);

    // if the container is not found, do nothing
    if (!container) {
      console.error('Container for version not found');
      return;
    }

    // Insert the component right after the first child of the container
    container.appendChild(root);

    const shadowRoot = root.attachShadow({ mode: 'open' });
    shadowRoot.adoptedStyleSheets = [];

    // Use tailwind css only for this specific component.
    // This is to avoid conflicts with the main app styles of rabbitmq management plugin.
    if ('adoptedStyleSheets' in Document.prototype) {
      [mainCSS, contentCSS].forEach((styleSheetContent) => {
        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(styleSheetContent);
        shadowRoot.adoptedStyleSheets.push(styleSheet);
      });
    } else {
      // Fallback: Use <style> tags for older browsers
      [mainCSS, contentCSS].forEach((styleSheetContent) => {
        const styleElement = document.createElement('style');
        styleElement.textContent = styleSheetContent;
        shadowRoot.appendChild(styleElement);
      });
    }

    createRoot(shadowRoot).render(
      <SettingsProvider defaultTheme="light" shadowRoot={shadowRoot}>
        <HeroRabbitConfiguration />
      </SettingsProvider>,
    );
  });
}
