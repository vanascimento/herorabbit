import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QueueAndStreamsToggles from './queue-and-streams-toggles';
import { useTranslation } from 'react-i18next';
import ChannelsConfiguration from './channels-toggles';
import ConnectionsConfiguration from './connections-configuration';

enum CONFIGURATION_TABS_ENUM {
  CONNECTIONS = 'connections',
  CHANNELS = 'channels',
  QUEUES = 'queues',
}
export default function ConfigurationTogglesTabs() {
  const { t } = useTranslation();
  return (
    <Tabs defaultValue={CONFIGURATION_TABS_ENUM.QUEUES} className="ext-my-2">
      <TabsList className="ext-rounded-sm ext-w-full ext-flex ext-justify-start ">
        <TabsTrigger value={CONFIGURATION_TABS_ENUM.QUEUES} className="ext-rounded-sm">
          {t('configurations.tabs.queues')}
        </TabsTrigger>
        <TabsTrigger value={CONFIGURATION_TABS_ENUM.CHANNELS} className="ext-rounded-sm">
          {t('configurations.tabs.channels')}
        </TabsTrigger>

        <TabsTrigger value={CONFIGURATION_TABS_ENUM.CONNECTIONS} className="ext-rounded-sm">
          {t('configurations.tabs.connections')}
        </TabsTrigger>
      </TabsList>
      <TabsContent className="ext-flex ext-flex-row ext-space-x-10 " value={CONFIGURATION_TABS_ENUM.QUEUES}>
        <QueueAndStreamsToggles />
      </TabsContent>
      <TabsContent className="ext-flex ext-flex-row ext-space-x-10 " value={CONFIGURATION_TABS_ENUM.CHANNELS}>
        <ChannelsConfiguration />
      </TabsContent>{' '}
      <TabsContent className="ext-flex ext-flex-row ext-space-x-10 " value={CONFIGURATION_TABS_ENUM.CONNECTIONS}>
        <ConnectionsConfiguration />
      </TabsContent>
    </Tabs>
  );
}
