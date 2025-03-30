import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QueueAndStreamsToggles from './queue-and-streams-toggles';

enum CONFIGURATION_TABS_ENUM {
  CONNECTIONS = 'connections',
  CHANNELS = 'channels',
  QUEUES = 'queues',
}
export default function ConfigurationTogglesTabs() {
  return (
    <Tabs defaultValue={CONFIGURATION_TABS_ENUM.CONNECTIONS} className="ext-my-2">
      <TabsList className="ext-rounded-sm ext-w-full ">
        <TabsTrigger value={CONFIGURATION_TABS_ENUM.CONNECTIONS} className="ext-rounded-sm">
          Connections
        </TabsTrigger>
        <TabsTrigger value={CONFIGURATION_TABS_ENUM.CHANNELS} className="ext-rounded-sm">
          Channels
        </TabsTrigger>
        <TabsTrigger value={CONFIGURATION_TABS_ENUM.QUEUES} className="ext-rounded-sm">
          Queues and Streams
        </TabsTrigger>
      </TabsList>
      <TabsContent
        className="ext-flex ext-flex-row ext-space-x-10 ext-my-10"
        value={CONFIGURATION_TABS_ENUM.CONNECTIONS}
      >
        <QueueAndStreamsToggles />
      </TabsContent>
      <TabsContent
        className="ext-flex ext-flex-row ext-space-x-10 ext-my-10"
        value={CONFIGURATION_TABS_ENUM.CHANNELS}
      ></TabsContent>{' '}
      <TabsContent
        className="ext-flex ext-flex-row ext-space-x-10 ext-my-10"
        value={CONFIGURATION_TABS_ENUM.QUEUES}
      ></TabsContent>
    </Tabs>
  );
}
