import { useEffect, useState } from 'react';
import { useSettings } from './useSettings';
import { CHROME_ACTION } from '@/lib/chrome-actions';

export type RabbitmqCredentials = {
  username: string;
  password: string;
};
export default function useCurrentRabbitmqCredentials() {
  const { settings } = useSettings();
  const [currentCredentials, setCurrentCredentials] = useState<RabbitmqCredentials | null | undefined>(null);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: CHROME_ACTION.GET_ACTIVE_TAB_URL }, (response) => {
      if (response && response.url) {
        const credentials = settings?.credentials?.find((credential) => response.url.includes(credential.host));
        if (credentials) {
          setCurrentCredentials(credentials);
        } else {
          setCurrentCredentials(null);
        }
      }
    });
  }, [settings]);

  return { currentCredentials };
}
