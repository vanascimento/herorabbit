import mainCSS from '@/entryPoints/main.css?inline';
import contentCSS from '@/components/content/content.css?inline';
import { waitForElement } from '@/lib/wait-for-element';
import { createRoot } from 'react-dom/client';

import { SettingsProvider } from '@/hooks/useSettings';
import { HeroConfiguredProvider } from '@/providers/hero-configured-provider';
import { QueuePizzaOverviewChart } from './queue-pizza-chart';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QueueBarOverviewChart } from './queue-bar-chart';

export const QUEUE_OVERVIEW_CHART_ID = 'queue-overview-chart';
export const QUEUE_TABLE_LIST_ID = 'queue-table-list';

const checkIfElementHasChildrenWithId = (element: Element, id: string) => {
  return Array.from(element.children).some((child) => child.id == id);
};

export const renderTableOptions = () => {
  const tr = document.querySelector('table thead tr');
  if (tr) {
    const th = document.createElement('th');
    th.id = QUEUE_TABLE_LIST_ID;
    th.textContent = 'Hero Actions';
    if (!checkIfElementHasChildrenWithId(tr, th.id)) {
      tr.insertBefore(th, tr.lastElementChild);
    }
  }
};
export function renderQueueDashboard() {
  waitForElement('#main', (_) => {
    // Check if the "Queues and Streams" tab is selected. If not, do nothing.
    // This component should only be rendered when the "Queues and Streams" tab is selected.

    const queueAndStreamTab = document.getElementById('queues-and-streams');
    if (!queueAndStreamTab || !queueAndStreamTab.firstElementChild?.classList.contains('selected')) {
      return;
    }
    renderTableOptions();

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
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Bar</TabsTrigger>
              <TabsTrigger value="password">Pizza</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <QueueBarOverviewChart />
            </TabsContent>
            <TabsContent value="password">
              <QueuePizzaOverviewChart />
            </TabsContent>
          </Tabs>
          <Toaster />
        </HeroConfiguredProvider>
      </SettingsProvider>,
    );
  });
}
