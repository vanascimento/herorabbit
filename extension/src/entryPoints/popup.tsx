import Popup from '@/components/popup';
import renderRoot from '@/entryPoints/render/render-root.tsx';
import '@/entryPoints/main.css';
import '../i18n';
import i18n from '../i18n';
import { GetGeneralSettings } from '@/hooks/useSettings';

// Renders popup.html
const renderPopup = async () => {
  const settings = await GetGeneralSettings();
  await i18n.changeLanguage(settings?.language);

  const element = document.getElementById('popup-root')!;
  renderRoot(element, <Popup />);
};

renderPopup();
