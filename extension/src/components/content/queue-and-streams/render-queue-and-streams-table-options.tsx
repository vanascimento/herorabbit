import { checkIfElementHasChildrenWithId } from '@/lib/utils';
import { QUEUE_TABLE_LIST_ID } from './render-queue-dashboard';
import { GetTailwindBackStyles } from '@/lib/tailwind-custom';
import { createRoot } from 'react-dom/client';
import { GetGeneralSettings, SettingsProvider } from '@/hooks/useSettings';
import DownloadMessagesFromQueueButton from '@/components/management/download-messages-from-queue-button';
import ImportMessagesToQueueButton from '@/components/management/import-messages-from-queue-button';
import { getCurrentTabUrl } from '@/hooks/useCurrentTabUrl';
import { VersionMapperElements } from '@/lib/version-mapper-elements';

export const QUEUE_HEROACTIONS_ACTIONS_ID = 'queue-heroactions-actions';
export const QUEUE_HEROACTIONS_MANAGEMENT_ID = 'queue-heroactions-management';

/**
 * Render the table options for the queues and streams table.
 * @returns
 */
export const renderTableOptions = async (mapper: VersionMapperElements) => {
  const settings = await GetGeneralSettings();
  if (settings?.toggleSettings.download_messages === false) {
    const queueTableOptions = document.getElementById(QUEUE_HEROACTIONS_ACTIONS_ID);
    if (queueTableOptions) {
      queueTableOptions.remove();
    }

    return;
  }
  const queueAndStreamTab = mapper.GetNodeOfQueuesTabIfisSelected(document);
  if (!queueAndStreamTab) {
    console.debug('Queues tab is not selected or was not founded. Cancelling renderTableOptions');
    return;
  }

  const currentUrl = await getCurrentTabUrl();
  if (currentUrl && !currentUrl.endsWith('/#/queues')) {
    return;
  }

  // findthe table primary header and add Hero Actions column. Only tables that have the class 'updatable' are the ones we want to add the column to
  const topTr = document.querySelector('.updatable table thead tr');
  if (topTr) {
    const th = document.createElement('th');
    th.id = QUEUE_TABLE_LIST_ID;
    th.colSpan = 2;
    th.textContent = 'Hero Actions';
    if (!checkIfElementHasChildrenWithId(topTr, th.id)) {
      topTr.insertBefore(th, topTr.lastElementChild);
    }
  }

  // find the secondary header and add Actions and Management. Only tables that have the class 'updatable' are the ones we want to add the column to
  const secondTr = document.querySelector('.updatable table thead tr:nth-child(2)');
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
    queroManagementHeader.className = 'bold';
    secondTr.appendChild(queroManagementHeader);
  }

  //for each row in the table, add the download button. Only tables that have the class 'updatable' are the ones we want to add the button to
  const tableRows = document.querySelectorAll('.updatable table tbody tr');

  let nameIndex = findIndexOfNameColumn();

  tableRows.forEach((row) => {
    const actionTd = document.createElement('td');
    actionTd.id = `queue-actions-${row.children[nameIndex].textContent}`;
    actionTd.textContent = 'Action';
    row.appendChild(actionTd);

    const managementTd = document.createElement('td');

    const root = document.createElement('div');
    root.id = `queue-management-${row.children[nameIndex].textContent}`;
    const shadowRoot = GetTailwindBackStyles(root);

    createRoot(shadowRoot).render(
      <SettingsProvider defaultTheme="light" shadowRoot={shadowRoot}>
        <div className="ext-w-full ext-flex ext-justify-evenly">
          <DownloadMessagesFromQueueButton QueueName={row.children[nameIndex].textContent!} />
          <ImportMessagesToQueueButton />
        </div>
      </SettingsProvider>,
    );
    managementTd.appendChild(root);
    row.appendChild(managementTd);
  });
};

const findIndexOfNameColumn = (): number => {
  const tableHead = document.querySelectorAll('.updatable table thead tr a');

  let nameIndex = 0;
  for (let i = 0; i < tableHead.length; i++) {
    if (tableHead[i].textContent === 'Name') {
      nameIndex = i;
      break;
    }
  }
  return nameIndex;
};
