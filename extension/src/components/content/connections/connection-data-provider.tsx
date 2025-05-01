import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { ConnectionData } from '@/models/connections';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ConnectionDataContext = createContext<{
  connectionsData: ConnectionData[];
  closeUserConnections: (userId: string) => Promise<void>;
}>({
  connectionsData: [],
  closeUserConnections: async () => {},
});

interface ConnectionDataProviderProps {
  children: ReactNode;
}

export default function ConnectionDataProvider({ children }: ConnectionDataProviderProps) {
  const [connectionsData, setConnectionsData] = useState<ConnectionData[]>([]);
  const { currentCredentials } = useCurrentRabbitmqCredentials();

  /**
   * Fetch connections data
   */
  const updateConnectionsData = async () => {
    let toastId = toast.loading('Loading connections data...');
    try {
      const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
      let response = await fetch('/api/connections', {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      let data = await response.json();
      console.log('Connections data:', data);
      setConnectionsData(data as ConnectionData[]);
    } catch (error) {
      toast.error('Failed to load connections data', { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  /**
   * Close all connections for a specific user
   */
  const closeUserConnections = async (userId: string) => {
    const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);

    // Filtra todas as conexões do usuário para verificar se existem
    const userConnections = connectionsData.filter((conn) => conn.user === userId);

    if (userConnections.length === 0) {
      throw new Error('No connections found for this user');
    }

    // Usa o novo endpoint que permite deletar todas as conexões de um usuário de uma vez
    const response = await fetch(`/api/connections/username/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to close connections for user ${userId}`);
    }

    // Atualiza a lista de conexões após fechar todas
    await updateConnectionsData();
  };

  useEffect(() => {
    if (!currentCredentials) return;
    updateConnectionsData();
  }, [currentCredentials]);

  return (
    <ConnectionDataContext.Provider value={{ connectionsData, closeUserConnections }}>
      {children}
    </ConnectionDataContext.Provider>
  );
}
