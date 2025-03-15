import {
  QUEUE_OVERVIEW_CHART_ID,
  renderQueueDashboard,
} from '@/components/content/queue-and-streams/render-queue-dashboard';

renderQueueDashboard();
//renderSidePanel();

const observer = new MutationObserver(() => {
  if (!document.getElementById(QUEUE_OVERVIEW_CHART_ID)) {
    renderQueueDashboard();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
