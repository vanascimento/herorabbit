import './popup.css';
import { Button } from '@/components/ui/button.tsx';
import { GithubIcon, Settings, Zap, Moon, Sun } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings.tsx';
import SafeImage from '@/components/ui/safe-image';
import iconLight from '@/assets/images/icon-light.png';
import iconDark from '@/assets/images/icon-dark.png';
import CredentialsForm from './credentials-form';
import { Toaster } from '../ui/sonner';
import { useEffect, useState } from 'react';
import MainPopup from './main-popup';
import { useTranslation } from 'react-i18next';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

export default function Popup() {
  const { settings, setSettings } = useSettings();
  const [isHeroConfigured, setIsHeroConfigured] = useState<boolean | undefined>(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let originPage = new URL(tabs[0].url!).origin;
      let isConfigured = settings.credentials.some((cred) => cred.host == originPage);
      console.log(`Active page: ${originPage}, isConfigured: ${isConfigured}`);
      setIsHeroConfigured(isConfigured);
    });
  }, [settings]);

  let renderMainComponent = () => {
    if (isHeroConfigured == undefined) {
      return (
        <div className="ext-flex ext-items-center ext-justify-center ext-h-32">
          <div className="ext-flex ext-flex-col ext-items-center ext-space-y-3">
            <div className="ext-w-8 ext-h-8 ext-border-4 ext-border-orange-500 ext-border-t-transparent ext-rounded-full ext-animate-spin"></div>
            <p className="ext-text-sm ext-text-muted-foreground">{t('common.loading')}</p>
          </div>
        </div>
      );
    }

    if (isHeroConfigured) {
      return <MainPopup />;
    }
    if (isHeroConfigured === false) {
      return <CredentialsForm />;
    }
  };

  const openGitHub = () => {
    window.open('https://github.com/vanascimento/herorabbit', '_blank');
  };

  return (
    <div className="ext-h-[600px] ext-w-[400px] ext-bg-gradient-to-br ext-from-white ext-to-gray-50 ext-flex ext-flex-col ext-border-0 ext-p-0 ext-m-0 ext-shadow-2xl ext-overflow-hidden">
      <div className="ext-w-full ext-h-full ext-flex ext-flex-col ext-justify-between ext-py-4 ext-px-4 ext-bg-background ext-text-foreground">
        {/* HEADER */}
        <div className="ext-flex ext-flex-row ext-justify-between ext-items-center ext-mb-2">
          <div className="ext-flex ext-items-center ext-space-x-3">
            <div className="ext-relative">
              <SafeImage
                className="ext-w-10 ext-h-10 ext-shadow-md"
                width={40}
                src={settings.theme === 'dark' ? iconLight : iconDark}
              />
              <div className="ext-absolute -ext-top-1 -ext-right-1 ext-w-3 ext-h-3 ext-bg-orange-500 ext-rounded-full ext-border-2 ext-border-white"></div>
            </div>
            <div className="ext-flex ext-flex-col">
              <h1
                className={`ext-text-xl ext-font-bold ext-leading-tight ${settings.theme === 'dark' ? 'ext-text-white' : 'ext-text-gray-900'}`}
              >
                {t('popup.title')}
              </h1>
              <p className="ext-text-xs ext-text-orange-600 ext-font-medium">RabbitMQ Companion</p>
            </div>
          </div>
          <div className="ext-flex ext-items-center ext-space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="ext-h-8 ext-w-8 ext-p-0 hover:ext-bg-gray-100 ext-transition-colors"
              onClick={() => setSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            >
              {settings.theme === 'dark' ? (
                <Sun size={16} className="ext-text-gray-600" />
              ) : (
                <Moon size={16} className="ext-text-gray-600" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="ext-h-8 ext-w-8 ext-p-0 hover:ext-bg-gray-100 ext-transition-colors"
              onClick={() => chrome?.runtime?.openOptionsPage()}
            >
              <Settings size={16} className="ext-text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="ext-flex ext-flex-col ext-gap-3 ext-flex-1 ext-overflow-hidden ext-my-2 ext-px-1">
          {renderMainComponent()}
        </div>

        {/* FOOTER */}
        <div className="ext-border-t ext-border-gray-200 ext-pt-3 ext-mt-2">
          <div className="ext-flex ext-flex-row ext-justify-between ext-items-center ext-w-full">
            <Button
              className="ext-text-gray-600 hover:ext-text-orange-600 hover:ext-bg-orange-50 ext-transition-all ext-duration-200"
              size="sm"
              variant="ghost"
              onClick={openGitHub}
            >
              <GithubIcon size={16} />
              <span className="ext-ml-2 ext-font-medium">{t('popup.github')}</span>
            </Button>
            <div className="ext-flex ext-items-center ext-space-x-2">
              <Zap size={12} className="ext-text-orange-500" />
              <p className="ext-text-xs ext-text-gray-500 ext-font-mono">
                {t('popup.version')} {chrome?.runtime?.getManifest().version}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
