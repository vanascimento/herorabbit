import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { ChannelData } from '@/models/connections';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ChannelDataContext = createContext<{
  channelsData: ChannelData[];
}>({
  channelsData: [],
});
interface ConnectionDataProviderProps {
  children: ReactNode;
}
export default function ChannelDataProvider({ children }: ConnectionDataProviderProps) {
  const [channelsData, setChannelsData] = useState<ChannelData[]>([]);
  const { currentCredentials } = useCurrentRabbitmqCredentials();

  /**
   * Fetch quantity of messages by queue
   */
  const updateChannelData = async () => {
    let toastId = toast.loading('Loading queue data...');
    try {
      const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
      let response = await fetch('/api/channels', {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      let data = await response.json();
      setChannelsData(data as ChannelData[]);
    } catch (error) {
      toast.error('Failed to load queue data', { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (!currentCredentials) return;
    updateChannelData();
  }, [currentCredentials]);
  return <ChannelDataContext.Provider value={{ channelsData }}>{children}</ChannelDataContext.Provider>;
}
