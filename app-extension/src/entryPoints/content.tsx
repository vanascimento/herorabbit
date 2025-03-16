import { renderTableOptions } from '@/components/content/queue-and-streams/render-queue-and-streams-table-options';
import {
  QUEUE_OVERVIEW_CHART_ID,
  QUEUE_TABLE_LIST_ID,
  renderQueueDashboard,
} from '@/components/content/queue-and-streams/render-queue-dashboard';

renderQueueDashboard();
//renderSidePanel();

const observer = new MutationObserver(() => {
  if (!document.getElementById(QUEUE_OVERVIEW_CHART_ID)) {
    renderQueueDashboard();
  }

  if (!document.getElementById(QUEUE_TABLE_LIST_ID)) {
    renderTableOptions();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
