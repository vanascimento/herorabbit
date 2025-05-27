import { DownloadCloudIcon, Loader2 } from 'lucide-react';
import { saveAs } from 'file-saver';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { useState } from 'react';

interface DownloadMessagesFromQueueButtonProps {
  QueueName: string;
}
export default function DownloadMessagesFromQueueButton({ QueueName }: DownloadMessagesFromQueueButtonProps) {
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  const [loading, setLoading] = useState(false);
  const downloadAllMessagesFromQueue = async () => {
    if (!currentCredentials) return;
    const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);

    setLoading(true);
    try {
      let response = await fetch(`/api/queues/%2f/${QueueName}/get`, {
        method: 'POST',
        body: JSON.stringify({ count: 100000, ackmode: 'reject_requeue_true', encoding: 'auto', truncate: 100000 }),
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });

      const data = await response.json();

      const jsonData = data.map((message: any) => JSON.stringify(message)).join('\n');
      const blob = new Blob([jsonData], { type: 'application/json' });
      saveAs(blob, `${QueueName}_${new Date().getTime()}.json`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader2 size={16} className="ext-animate-spin" />;
  }
  return (
    <button onClick={downloadAllMessagesFromQueue}>
      <DownloadCloudIcon size={16} />{' '}
    </button>
  );
}
