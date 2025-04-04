import { useEffect, useState } from 'react';
import { GetGeneralSettings, useSettings } from './useSettings';
import { RabbitMqCredentials } from '@/components/popup/credentials-form';
import { getCurrentTabUrl, useGetCurrentTabUrl } from './useCurrentTabUrl';

export default function useCurrentRabbitmqCredentials() {
  const { settings } = useSettings();
  const [currentCredentials, setCurrentCredentials] = useState<RabbitMqCredentials | null | undefined>(null);
  const { url } = useGetCurrentTabUrl();

  useEffect(() => {
    const credentials = settings?.credentials?.find((credential) => url?.includes(credential.host));
    if (credentials) {
      setCurrentCredentials(credentials);
    } else {
      setCurrentCredentials(null);
    }
  }, [url]);

  return { currentCredentials };
}

export async function getCurrentRabbitmqCredentials() {
  let currentUrl = await getCurrentTabUrl();
  const settings = await GetGeneralSettings();
  if (!settings) {
    console.debug('settings is null');
    return null;
  }
  if (!currentUrl) {
    console.debug('currentUrl is null');
    return null;
  }
  const currentCredentials = settings.credentials.find((credential) => currentUrl.includes(credential.host));
  if (!currentCredentials) {
    console.debug('currentCredentials is null');
    return null;
  }

  return currentCredentials;
}
