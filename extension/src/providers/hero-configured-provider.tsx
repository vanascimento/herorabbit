import { useSettings } from '@/hooks/useSettings';
import { CHROME_ACTION } from '@/lib/chrome-actions';
import { useEffect, useState } from 'react';

export function HeroConfiguredProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: CHROME_ACTION.GET_ACTIVE_TAB_URL }, (response) => {
      if (response && response.url) {
        setIsConfigured(settings?.credentials?.some((credential) => response.url.includes(credential.host)));
      }
    });
  }, [settings]);

  if (isConfigured) {
    return <>{children}</>;
  } else {
    return null;
  }
}
