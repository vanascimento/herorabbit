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
import renderRoot from '@/entryPoints/render/render-root';
import { Button } from '@/components/ui/button';
import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import DownloadMessagesFromQueueButton from '@/components/management/download-messages-from-queue-button';

export const QUEUE_OVERVIEW_CHART_ID = 'queue-overview-chart';
export const QUEUE_TABLE_LIST_ID = 'queue-table-list';
const QUEUE_HEROACTIONS_ACTIONS_ID = 'queue-heroactions-actions';
const QUEUE_HEROACTIONS_MANAGEMENT_ID = 'queue-heroactions-management';

const checkIfElementHasChildrenWithId = (element: Element, id: string) => {
  return Array.from(element.children).some((child) => child.id == id);
};

export const renderTableOptions = () => {
  const queueAndStreamTab = document.getElementById('queues-and-streams');
  if (!queueAndStreamTab || !queueAndStreamTab.firstElementChild?.classList.contains('selected')) {
    return;
  }
  const topTr = document.querySelector('table thead tr');
  if (topTr) {
    const th = document.createElement('th');
    th.id = QUEUE_TABLE_LIST_ID;
    th.colSpan = 2;
    th.textContent = 'Hero Actions';
    if (!checkIfElementHasChildrenWithId(topTr, th.id)) {
      topTr.insertBefore(th, topTr.lastElementChild);
    }
  }

  const secondTr = document.querySelector('table thead tr:nth-child(2)');
  if (secondTr) {
    const queueActionHeader = document.createElement('th');
    queueActionHeader.id = QUEUE_HEROACTIONS_ACTIONS_ID;
    queueActionHeader.textContent = 'Actions';
    if (!checkIfElementHasChildrenWithId(secondTr, queueActionHeader.id)) {
      secondTr.appendChild(queueActionHeader);
    }

    const queroManagementHeader = document.createElement('th');
    queroManagementHeader.id = QUEUE_HEROACTIONS_MANAGEMENT_ID;
    queroManagementHeader.textContent = 'Management';
    if (!checkIfElementHasChildrenWithId(secondTr, queroManagementHeader.id)) {
      secondTr.appendChild(queroManagementHeader);
    }
  }

  const tableRows = document.querySelectorAll('table tbody tr');
  tableRows.forEach((row) => {
    const actionTd = document.createElement('td');
    actionTd.textContent = 'Action';
    row.appendChild(actionTd);

    const managementTd = document.createElement('td');

    const root = document.createElement('div');
    const shadowRoot = GetTailwindBackStyles(root);

    createRoot(shadowRoot).render(
      <SettingsProvider defaultTheme="light" shadowRoot={shadowRoot}>
        <DownloadMessagesFromQueueButton QueueName={row.children[1].textContent!} />
      </SettingsProvider>,
    );
    managementTd.appendChild(root);
    row.appendChild(managementTd);
  });
  // for (let row in tableRows) {
  //   const td = document.createElement('td');
  //   td.textContent = 'Action';
  //   tableRows[row].appendChild(td);

  //   const td2 = document.createElement('td');
  //   const div2 = document.createElement('div');
  //   td2.appendChild(div2);

  //   td2.textContent = 'Management';
  //   //createRoot(div2).render(<button>Management Button</button>);
  //   tableRows[row].appendChild(td2);
  // }
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

    const shadowRoot = GetTailwindBackStyles(root);

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
  console.info('Queue dashboard rendered');
}
