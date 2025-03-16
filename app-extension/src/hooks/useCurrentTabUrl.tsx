import { CHROME_ACTION } from '@/lib/chrome-actions';
import { useEffect, useState } from 'react';

export function useGetCurrentTabUrl() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: CHROME_ACTION.GET_ACTIVE_TAB_URL }, (response) => {
      if (response && response.url) {
        setUrl(response.url);
      }
    });
  }, []);

  return { url };
}

export async function getCurrentTabUrl() {
  return new Promise<string | null>((resolve) => {
    chrome.runtime.sendMessage({ action: CHROME_ACTION.GET_ACTIVE_TAB_URL }, (response) => {
      if (response && response.url) {
        resolve(response.url);
      } else {
        resolve(null);
      }
    });
  });
}
