import {
  CHANNELS_OVERVIEW_CHART_ID,
  renderChannelDashboard,
} from '@/components/content/channels/render-channel-dashboard';
import {
  CONNECTION_OVERVIEW_CHART_ID,
  renderConnectionDashboard,
} from '@/components/content/connections/render-connection-dashboard';
import { renderTableOptions } from '@/components/content/queue-and-streams/render-queue-and-streams-table-options';
import {
  QUEUE_OVERVIEW_CHART_ID,
  QUEUE_TABLE_LIST_ID,
  renderQueueDashboard,
} from '@/components/content/queue-and-streams/render-queue-dashboard';
import { getCurrentTabUrl } from '@/hooks/useCurrentTabUrl';
import { GetGeneralSettings } from '@/hooks/useSettings';

async function renderAll() {
  const settings = await GetGeneralSettings();
  const currentUrl = await getCurrentTabUrl();
  if (!settings) {
    console.debug('settings is null');
  }

  if (!currentUrl) {
    console.debug('currentUrl is null');
  }

  const isRabbitMq = settings?.credentials?.some((credential) => currentUrl?.includes(credential.host));
  if (!isRabbitMq) {
    console.debug('currentUrl is not a registered rabbitmq');
    return;
  }

  if (!document.getElementById(CONNECTION_OVERVIEW_CHART_ID)) {
    renderConnectionDashboard();
  }

  if (!document.getElementById(QUEUE_OVERVIEW_CHART_ID)) {
    renderQueueDashboard();
  }

  if (!document.getElementById(QUEUE_TABLE_LIST_ID)) {
    renderTableOptions();
  }

  if (!document.getElementById(CHANNELS_OVERVIEW_CHART_ID)) {
    renderChannelDashboard();
  }

  console.debug('renderAll done');
}
//renderSidePanel();

const observer = new MutationObserver(() => {
  renderAll();
});

observer.observe(document.body, { childList: true, subtree: true });
renderAll();
