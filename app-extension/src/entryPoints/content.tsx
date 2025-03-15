import {
  HERO_RABBIT_CONFIGURATION_BUTTON_ID,
  renderHeroRabbitConfiguration,
} from '@/components/content/hero-rabbit-configuration';
import {
  QUEUE_OVERVIEW_CHART_ID,
  renderQueueDashboard,
} from '@/components/content/queue-and-streams/render-queue-dashboard';
import { renderSidePanel } from '@/components/content/side-panel/render-side-panel';

renderQueueDashboard();
renderHeroRabbitConfiguration();
//renderSidePanel();

const observer = new MutationObserver(() => {
  if (!document.getElementById(QUEUE_OVERVIEW_CHART_ID)) {
    renderQueueDashboard();
  }

  if (!document.getElementById(HERO_RABBIT_CONFIGURATION_BUTTON_ID)) {
    renderHeroRabbitConfiguration();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
