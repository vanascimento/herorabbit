import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { ConnectionData } from '@/models/connections';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ConnectionDataContext = createContext<{
  connectionsData: ConnectionData[];
}>({
  connectionsData: [],
});
interface ConnectionDataProviderProps {
  children: ReactNode;
}
export default function ConnectionDataProvider({ children }: ConnectionDataProviderProps) {
  const [connectionsData, setConnectionsData] = useState<ConnectionData[]>([]);
  const { currentCredentials } = useCurrentRabbitmqCredentials();

  /**
   * Fetch quantity of messages by queue
   */
  const updateQueueData = async () => {
    let toastId = toast.loading('Loading queue data...');
    try {
      const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
      let response = await fetch('/api/connections', {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      let data = await response.json();
      setConnectionsData(data as ConnectionData[]);
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
  return <ConnectionDataContext.Provider value={{ connectionsData }}>{children}</ConnectionDataContext.Provider>;
}
