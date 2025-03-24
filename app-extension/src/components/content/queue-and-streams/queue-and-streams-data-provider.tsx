import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { ConnectionData, QueueData } from '@/models/connections';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const QueueAndStreamDataContext = createContext<{
  queuesData: QueueData[];
}>({
  queuesData: [],
});
interface QueueAndStreamDataProviderProps {
  children: ReactNode;
}
export default function QueueAndStreamDataProvider({ children }: QueueAndStreamDataProviderProps) {
  const [queuesData, setQueueData] = useState<QueueData[] | undefined>(undefined);
  const { currentCredentials } = useCurrentRabbitmqCredentials();

  /**
   * Fetch quantity of messages by queue
   */
  const updateQueueData = async () => {
    let toastId = toast.loading('Loading queue data...');
    try {
      const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
      let response = await fetch('/api/queues', {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      let data = await response.json();
      setQueueData(data as QueueData[]);
    } catch (error) {
      toast.error('Failed to load queue data', { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (!currentCredentials) return;
    updateQueueData();
  }, [currentCredentials]);

  if (!queuesData) {
    return <div>Loading...</div>;
  }

  return <QueueAndStreamDataContext.Provider value={{ queuesData }}>{children}</QueueAndStreamDataContext.Provider>;
}
