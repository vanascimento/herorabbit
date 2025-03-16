import { checkIfElementHasChildrenWithId } from '@/lib/utils';
import { QUEUE_TABLE_LIST_ID } from './render-queue-dashboard';
import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import { createRoot } from 'react-dom/client';
import { SettingsProvider } from '@/hooks/useSettings';
import DownloadMessagesFromQueueButton from '@/components/management/download-messages-from-queue-button';
import { getCurrentRabbitmqCredentials } from '@/hooks/useCurrentRabbitmqCredentials';

export const QUEUE_HEROACTIONS_ACTIONS_ID = 'queue-heroactions-actions';
export const QUEUE_HEROACTIONS_MANAGEMENT_ID = 'queue-heroactions-management';

/**
 * Render the table options for the queues and streams table.
 * @returns
 */
export const renderTableOptions = async () => {
  const queueAndStreamTab = document.getElementById('queues-and-streams');
  if (!queueAndStreamTab || !queueAndStreamTab.firstElementChild?.classList.contains('selected')) {
    return;
  }

  const currentUrl = await getCurrentRabbitmqCredentials();
  if (!currentUrl?.endsWith('/#/queues')) {
    return;
  }

  // findthe table primary header and add Hero Actions column
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

  // find the secondary header and add Actions and Management
  const secondTr = document.querySelector('table thead tr:nth-child(2)');
  if (secondTr) {
    const queueActionHeader = document.createElement('th');
    queueActionHeader.id = QUEUE_HEROACTIONS_ACTIONS_ID;
    queueActionHeader.textContent = 'Actions';

    // if the header already exists, do nothing for entire render
    if (checkIfElementHasChildrenWithId(secondTr, queueActionHeader.id)) {
      return;
    }

    secondTr.appendChild(queueActionHeader);

    const queroManagementHeader = document.createElement('th');
    queroManagementHeader.id = QUEUE_HEROACTIONS_MANAGEMENT_ID;
    queroManagementHeader.textContent = 'Management';
    secondTr.appendChild(queroManagementHeader);
  }

  //for each row in the table, add the download button
  const tableRows = document.querySelectorAll('table tbody tr');
  tableRows.forEach((row) => {
    const actionTd = document.createElement('td');
    actionTd.id = `queue-actions-${row.children[1].textContent}`;
    actionTd.textContent = 'Action';
    row.appendChild(actionTd);

    const managementTd = document.createElement('td');

    const root = document.createElement('div');
    root.id = `queue-management-${row.children[1].textContent}`;
    const shadowRoot = GetTailwindBackStyles(root);

    createRoot(shadowRoot).render(
      <SettingsProvider defaultTheme="light" shadowRoot={shadowRoot}>
        <DownloadMessagesFromQueueButton QueueName={row.children[1].textContent!} />
      </SettingsProvider>,
    );
    managementTd.appendChild(root);
    row.appendChild(managementTd);
  });
};
