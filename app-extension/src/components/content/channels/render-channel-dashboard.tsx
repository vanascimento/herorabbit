import { waitForElement } from '@/lib/wait-for-element';
import { createRoot } from 'react-dom/client';

import { SettingsProvider } from '@/hooks/useSettings';
import { HeroConfiguredProvider } from '@/providers/hero-configured-provider';
import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import { HeroRenderProtectedUrlPath } from '@/providers/hero-render-protected-url';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import ChannelDataProvider from './channel-data-provider';
import { ChannelByUserBarOverviewChart } from './channel-byuser-bar-chart';
import { ChannelByUserPizzaOverviewChart } from './channel-byuser-pizza-chart';

export const CHANNELS_OVERVIEW_CHART_ID = 'channels-overview-chart';
export const CHANNELS_TABLE_LIST_ID = 'channels-table-list';

/**
 * Render the main chart for queue and streams dashboard.
 */
export async function renderChannelDashboard() {
  waitForElement('#main', async (_) => {
    // Check if the "Queues and Streams" tab is selected. If not, do nothing.
    // This component should only be rendered when the "Queues and Streams" tab is selected.

    const connectionsTab = document.getElementById('channels');
    if (!connectionsTab || !connectionsTab.firstElementChild?.classList.contains('selected')) {
      return;
    }

    // Check if the component is already rendered. If so, do nothing.
    let existingComponent = document.getElementById(CHANNELS_OVERVIEW_CHART_ID);
    if (existingComponent) {
      return;
    }

    const root = document.createElement('div');
    root.id = CHANNELS_OVERVIEW_CHART_ID;
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
          <HeroRenderProtectedUrlPath path="/#/channels">
            <ChannelDataProvider>
              <Tabs defaultValue="bar">
                <TabsList>
                  <TabsTrigger value="bar">Bar </TabsTrigger>
                  <TabsTrigger value="pizza">Pizza</TabsTrigger>
                </TabsList>
                <TabsContent className="ext-flex ext-flex-row ext-space-x-10 ext-my-10" value="bar">
                  <ChannelByUserBarOverviewChart />
                  {/* <ChannelByConnectionNameBarChart /> */}
                </TabsContent>
                <TabsContent value="pizza">
                  <ChannelByUserPizzaOverviewChart />
                </TabsContent>
              </Tabs>
              <Toaster />
            </ChannelDataProvider>
          </HeroRenderProtectedUrlPath>
        </HeroConfiguredProvider>
      </SettingsProvider>,
    );
  });
  console.info('Channel dashboard rendered');
}
