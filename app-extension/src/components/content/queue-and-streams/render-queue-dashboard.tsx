import { waitForElement } from '@/lib/wait-for-element';
import { createRoot } from 'react-dom/client';

import { SettingsProvider } from '@/hooks/useSettings';
import { HeroConfiguredProvider } from '@/providers/hero-configured-provider';
import { QueuePizzaOverviewChart } from './queue-pizza-chart';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QueueBarOverviewChart } from './queue-bar-chart';
import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import { CHROME_ACTION } from '@/lib/chrome-actions';
import { renderTableOptions } from './render-queue-and-streams-table-options';

export const QUEUE_OVERVIEW_CHART_ID = 'queue-overview-chart';
export const QUEUE_TABLE_LIST_ID = 'queue-table-list';

const GetCurrentPathname = async () => {
  return new Promise<string | null>((resolve) => {
    chrome.runtime.sendMessage({ action: CHROME_ACTION.GET_ACTIVE_TAB_URL_PATH }, (response) => {
      if (response && response.pathname) {
        resolve(response.pathname);
      } else {
        resolve(null);
      }
    });
  });
};
/**
 * Render the main chart for queue and streams dashboard.
 */
export async function renderQueueDashboard() {
  const pathname = await GetCurrentPathname();
  waitForElement('#main', async (_) => {
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

    const shadowRoot = GetTailwindBackStyles(root);

    createRoot(shadowRoot).render(
      <SettingsProvider defaultTheme="light" shadowRoot={shadowRoot}>
        <HeroConfiguredProvider>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Bar {pathname}</TabsTrigger>
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
  console.info('Queue dashboard rendered');
}
