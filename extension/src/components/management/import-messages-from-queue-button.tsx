import { UploadCloudIcon, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { toast } from 'sonner';

interface ImportMessagesToQueueButtonProps {
  QueueName: string;
}

interface MessageData {
  payload_bytes: number;
  redelivered: boolean;
  exchange: string;
  routing_key: string;
  message_count: number;
  properties: any[];
  payload: string;
  payload_encoding: string;
}

export default function ImportMessagesToQueueButton({ QueueName }: ImportMessagesToQueueButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentCredentials } = useCurrentRabbitmqCredentials();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!currentCredentials) {
      toast.error('Credenciais do RabbitMQ não encontradas');
      return;
    }

    setLoading(true);

    try {
      const fileContent = await file.text();
      const lines = fileContent.trim().split('\n');

      if (lines.length === 0) {
        toast.error('Arquivo vazio ou inválido');
        return;
      }

      // Validate file format by checking first line
      try {
        const firstLine = lines[0].trim();
        if (firstLine) {
          const testMessage = JSON.parse(firstLine);
          if (!testMessage.payload || !testMessage.hasOwnProperty('routing_key')) {
            toast.error('Formato de arquivo inválido. Use apenas arquivos exportados pelo botão de download.');
            return;
          }
        }
      } catch (validationError) {
        toast.error('Formato de arquivo inválido. Certifique-se de que é um arquivo JSON válido.');
        return;
      }

      const base64Credentials = btoa(`${currentCredentials.username}:${currentCredentials.password}`);
      let successCount = 0;
      let errorCount = 0;

      // Process each line as a separate JSON message
      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const messageData: MessageData = JSON.parse(line);

          // Determine the exchange to publish to
          // If the original message came from the default exchange (empty string),
          // we'll publish directly to the queue using the default exchange
          const exchangeName = messageData.exchange || '';

          // Publish the message using the RabbitMQ Management API
          // For default exchange (empty string), we need to encode it as empty string
          const publishUrl = `/api/exchanges/%2F/amq.default/publish`;

          // Prepare the message for publishing
          const publishPayload = {
            delivery_mode: 2,
            headers: {},
            name: exchangeName,
            payload: messageData.payload,
            payload_encoding: messageData.payload_encoding || 'string',
            properties: {
              delivery_mode: 2,
              headers: {},
            },
            props: {},
            routing_key: QueueName,
            vhost: '/',
          };

          console.log('Publishing message:', {
            url: publishUrl,
            payload: publishPayload,
            originalMessage: messageData,
          });

          const response = await fetch(publishUrl, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${base64Credentials}`,
              'Content-Type': 'text/plain;charset=UTF-8',
            },
            body: JSON.stringify(publishPayload),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Publish result:', result);
            if (result.routed) {
              successCount++;
            } else {
              console.warn('Message was not routed:', messageData);
              errorCount++;
            }
          } else {
            const errorText = await response.text();
            console.error('Failed to publish message:', response.status, response.statusText, errorText);
            errorCount++;
          }
        } catch (parseError) {
          console.error('Error parsing message line:', parseError);
          errorCount++;
        }
      }

      // Show results
      if (successCount > 0 && errorCount === 0) {
        toast.success(`${successCount} mensagens importadas com sucesso para a fila ${QueueName}`);
      } else if (successCount > 0 && errorCount > 0) {
        toast.warning(`${successCount} mensagens importadas, ${errorCount} falharam`);
      } else {
        toast.error(`Falha ao importar mensagens. ${errorCount} erros encontrados`);
      }
    } catch (error) {
      console.error('Error importing messages:', error);
      toast.error('Erro ao processar o arquivo de mensagens');
    } finally {
      setLoading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (loading) {
    return <Loader2 size={16} className="ext-animate-spin" />;
  }

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="ext-hidden" accept=".json" />
      <button onClick={handleClick} title={`Import messages to ${QueueName}`}>
        <UploadCloudIcon size={16} />
      </button>
    </div>
  );
}
