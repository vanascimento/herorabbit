import mainCSS from '@/entryPoints/main.css?inline';
import contentCSS from '@/components/content/content.css?inline';
import { waitForElement } from '@/lib/wait-for-element';
import { createRoot } from 'react-dom/client';
import { QueueOverviewChart } from '@/components/content/queue-and-streams/queue-dashboard';
import { SettingsProvider } from '@/hooks/useSettings';
import { HeroConfiguredProvider } from '@/providers/hero-configured-provider';

export const QUEUE_OVERVIEW_CHART_ID = 'queue-overview-chart';

export function renderQueueDashboard() {
  waitForElement('#main', (mainDiv) => {
    // Check if the "Queues and Streams" tab is selected. If not, do nothing.
    // This component should only be rendered when the "Queues and Streams" tab is selected.
    const queueAndStreamTab = document.getElementById('queues-and-streams');
    if (!queueAndStreamTab || !queueAndStreamTab.firstElementChild?.classList.contains('selected')) {
      return;
    }

    // Check if the component is already rendered. If so, do nothing.
    let existingComponent = document.getElementById(QUEUE_OVERVIEW_CHART_ID);
    if (existingComponent) {
      return;
    }

    const root = document.createElement('div');
    root.id = QUEUE_OVERVIEW_CHART_ID;
    const container = document.getElementById('main');

    // if the container is not found, do nothing
    if (!container) {
      return;
    }

    // Insert the component right after the first child of the container
    const secondChild = container?.children[1];
    container.insertBefore(root, secondChild!);

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
        <HeroConfiguredProvider>
          <QueueOverviewChart />
        </HeroConfiguredProvider>
      </SettingsProvider>,
    );
  });
}
