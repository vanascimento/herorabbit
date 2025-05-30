import { waitForElement } from '@/lib/wait-for-element';
import { createRoot } from 'react-dom/client';

import { GetGeneralSettings, SettingsProvider } from '@/hooks/useSettings';
import { HeroConfiguredProvider } from '@/providers/hero-configured-provider';
import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import { HeroRenderProtectedUrlPath } from '@/providers/hero-render-protected-url';
import { ConnectionBarOverviewChart } from './connection-bar-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { ConnectionPizzaOverviewChart } from './connection-pizza-chart';
import ConnectionDataProvider from './connection-data-provider';
import { VersionMapperElements } from '@/lib/version-mapper-elements';
import { CloseConnection } from './close-connection';

export const CONNECTION_OVERVIEW_CHART_ID = 'connection-overview-chart';
export const CONNECTION_TABLE_LIST_ID = 'connection-table-list';

/**
 * Render the main chart for queue and streams dashboard.
 */
export async function renderConnectionDashboard(mapper: VersionMapperElements) {
  waitForElement('#main', async (_) => {
    // Check if the "Queues and Streams" tab is selected. If not, do nothing.
    // This component should only be rendered when the "Queues and Streams" tab is selected.

    const connectionsTab = mapper.GetNodeOfConnectionsTab(document);

    // Check if the "Connections" tab is selected
    if (!connectionsTab) {
      console.debug('Connections tab is not selected or was not founded. Cancelling renderConnectionDashboard');
      return;
    }

    const settings = await GetGeneralSettings();
    const componentShouldRender = settings?.connectionsSettings.connections_dashboard;

    // Check if the component is already rendered. If so, do nothing.
    let existingComponent = document.getElementById(CONNECTION_OVERVIEW_CHART_ID);

    // Check if component existing and is not enabled, if so, remove it
    if (existingComponent && !componentShouldRender) {
      existingComponent.remove();
      return;
    } else if (!componentShouldRender || existingComponent) {
      // If the component is already rendered or disabled, do nothing
      return;
    }

    const root = document.createElement('div');
    root.id = CONNECTION_OVERVIEW_CHART_ID;
    const container = mapper.GetNodeOfConnectionsMainContainer(document)!;

    // Insert the component right after the first child of the container
    const secondChild = container?.children[1];
    container.insertBefore(root, secondChild!);

    const shadowRoot = GetTailwindBackStyles(root);

    createRoot(shadowRoot).render(
      <SettingsProvider defaultTheme="light" shadowRoot={shadowRoot}>
        <HeroConfiguredProvider>
          <HeroRenderProtectedUrlPath path="/#/connections">
            <ConnectionDataProvider>
              <div className="ext-flex ext-justify-between ext-w-full">
                <Tabs defaultValue="bar" className="ext-w-1/2">
                  <TabsList className="ext-flex ext-justify-between ext-w-full">
                    <div>
                      <TabsTrigger value="bar">Bar </TabsTrigger>
                      <TabsTrigger value="pizza">Pizza</TabsTrigger>
                    </div>
                    <CloseConnection />
                  </TabsList>
                  <TabsContent value="bar">
                    <ConnectionBarOverviewChart />
                  </TabsContent>
                  <TabsContent value="pizza">
                    <ConnectionPizzaOverviewChart />
                  </TabsContent>
                </Tabs>
              </div>

              <Toaster />
            </ConnectionDataProvider>
          </HeroRenderProtectedUrlPath>
        </HeroConfiguredProvider>
      </SettingsProvider>,
    );
  });
}
