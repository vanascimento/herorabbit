import { useSettings } from '@/hooks/useSettings';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import ConfigurationTogglesTabs from './configs/configuration-toogles-tabs';

export default function MainPopup() {
  const { settings, setSettings } = useSettings();
  const [currentOrigin, setCurrentOrigin] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let originPage = new URL(tabs[0].url!).origin;
      setCurrentOrigin(originPage);
    });
  }, []);
  const handleLogout = () => {
    let newCredentials = settings.credentials.filter((cred) => cred.host != currentOrigin);
    setSettings({ ...settings, credentials: newCredentials });
  };
  return (
    <div className="ext-flex ext-flex-col  ext-h-full ext-justify-between  ">
      <div className="ext-w-full ext-text-muted-foreground">
        <h1 className="ext-w-full ext-text-sm">Welcome to Hero Rabbit. Your best `duct tape solution` for RabbitMQ </h1>
        <Separator orientation="horizontal" className="ext-my-2" />
        <ConfigurationTogglesTabs />
      </div>
      <Button size="sm" className="ext-w-full ext-self-baseline" onClick={handleLogout}>
        LogOut
      </Button>
    </div>
  );
}
