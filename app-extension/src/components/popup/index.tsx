import './popup.css';
import { Button } from '@/components/ui/button.tsx';
import { CircleHelp, GithubIcon, Link, Settings } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings.tsx';
import SafeImage from '@/components/ui/safe-image';
import iconLight from '@/assets/images/icon-light.png';
import iconDark from '@/assets/images/icon-dark.png';
import CredentialsForm from './credentials-form';
import { Toaster } from '../ui/sonner';
import { useEffect, useState } from 'react';
import MainPopup from './main-popup';

export default function Popup() {
  const { settings } = useSettings();
  const [isHeroConfigured, setIsHeroConfigured] = useState<boolean | undefined>(undefined);

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
      return <p>Loading...</p>;
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
    <div className="ext-h-[600px]  ext-w-[400px] ext-bg-white ext-flex ext-flex-col ext-border-0 ext-p-0 ext-m-0">
      <div className="ext-w-full ext-h-full ext-flex ext-flex-col ext-justify-between ext-py-3 ext-px-3 ext-bg-background ext-text-foreground">
        {/* HEADER */}
        <div className="ext-flex ext-flex-row ext-justify-between ext-items-center">
          <div className="ext-flex">
            <div className="ext-flex ext-flex-row ext-items-center">
              <SafeImage className="ext-pl-3" width={40} src={settings.theme === 'dark' ? iconLight : iconDark} />
              <p
                className={`ext-text-center ext-text-lg ext-ml-2 ext-font-black ${settings.theme === 'dark' ? 'ext-text-white' : 'ext-text-black'}`}
              >
                Hero Rabbit
              </p>
            </div>
          </div>
          <div className="ext-flex">
            <Button size="sm" variant="ghost" onClick={() => chrome?.runtime?.openOptionsPage()}>
              <Settings size={12} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="ext-flex ext-flex-col ext-gap-3 ext-flex-1 ext-overflow-y-auto ext-my-4">
          {/* <CardSwitch
            title={'Dark Mode'}
            checked={settings.theme === 'dark'}
            onChecked={(checked: boolean) => setSettings({ theme: checked ? 'dark' : 'light' })}
            subtitle={'Switch between dark mode applied to all extension modules.'}
          /> */}
          {renderMainComponent()}
        </div>

        {/* FOOTER */}
        <div className="ext-flex">
          <div className="ext-flex ext-flex-row ext-justify-between ext-items-center ext-w-full">
            <Button className="hover:ext-text-orange-900" size="sm" variant="ghost" onClick={openGitHub}>
              <GithubIcon size={16} />
              Contribute
            </Button>
            <p className="ext-text-xs">Version {chrome?.runtime?.getManifest().version}</p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
