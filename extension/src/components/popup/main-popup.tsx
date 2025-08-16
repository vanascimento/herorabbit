import { useSettings } from '@/hooks/useSettings';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import ConfigurationTogglesTabs from './configs/configuration-toogles-tabs';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { useTranslation } from 'react-i18next';
import { LogOut, Rabbit } from 'lucide-react';

export default function MainPopup() {
  const { settings, setSettings } = useSettings();
  const [currentOrigin, setCurrentOrigin] = useState<string | undefined>(undefined);
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  const { t } = useTranslation();

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
    <div className="ext-flex ext-flex-col ext-h-full ext-justify-between ext-space-y-3">
      {/* Header Section */}
      <div className="ext-w-full ext-space-y-3">
        <div className="ext-flex ext-items-center ext-space-x-2 ext-p-3 ext-bg-gradient-to-r ext-from-orange-50 ext-to-amber-50 ext-border ext-border-gray-200">
          <Rabbit size={20} className="ext-text-orange-600" />
          <div className="ext-flex ext-flex-col ext-flex-1">
            <h2 className="ext-text-sm ext-font-semibold ext-text-gray-800">{t('popup.description')}</h2>
            <div className="ext-flex ext-items-center ext-space-x-2 ext-mt-1">
              <span className="ext-text-xs ext-text-gray-600">Version:</span>
              <span className="ext-text-xs ext-font-mono ext-font-semibold ext-text-orange-600 ext-bg-orange-100 ext-px-2 ext-py-1">
                {currentCredentials?.management_version}
              </span>
            </div>
          </div>
        </div>

        <Separator orientation="horizontal" className="ext-my-2" />

        <ConfigurationTogglesTabs />
      </div>

      {/* Logout Button */}
      <div className="ext-w-full ext-pt-2">
        <Button size="sm" variant="destructive" className="ext-w-full  " onClick={handleLogout}>
          <LogOut size={16} />
          <span>{t('popup.logout')}</span>
        </Button>
      </div>
    </div>
  );
}
