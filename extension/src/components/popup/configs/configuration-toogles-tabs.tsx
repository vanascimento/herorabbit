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
    <Tabs defaultValue={CONFIGURATION_TABS_ENUM.QUEUES} className="ext-w-full">
      <TabsList className="ext-w-full ext-h-10 ext-bg-gray-100 ext-p-1 ext-border ext-border-gray-200 ß">
        <TabsTrigger
          value={CONFIGURATION_TABS_ENUM.QUEUES}
          className="ext-flex-1 ext-h-8 ext-text-xs ext-font-medium ext-transition-all ext-duration-200 data-[state=active]:ext-bg-white data-[state=active]:ext-text-orange-600 data-[state=active]:ext-shadow-sm ext-text-gray-600 hover:ext-text-gray-800 "
        >
          {t('configurations.tabs.queues')}
        </TabsTrigger>
        <TabsTrigger
          value={CONFIGURATION_TABS_ENUM.CHANNELS}
          className="ext-flex-1 ext-h-8 ext-text-xs ext-font-medium ext-transition-all ext-duration-200 data-[state=active]:ext-bg-white data-[state=active]:ext-text-orange-600 data-[state=active]:ext-shadow-sm ext-text-gray-600 hover:ext-text-gray-800"
        >
          {t('configurations.tabs.channels')}
        </TabsTrigger>
        <TabsTrigger
          value={CONFIGURATION_TABS_ENUM.CONNECTIONS}
          className="ext-flex-1 ext-h-8 ext-text-xs ext-font-medium ext-transition-all ext-duration-200 data-[state=active]:ext-bg-white data-[state=active]:ext-text-orange-600 data-[state=active]:ext-shadow-sm ext-text-gray-600 hover:ext-text-gray-800"
        >
          {t('configurations.tabs.connections')}
        </TabsTrigger>
      </TabsList>

      <div className="ext-mt-3">
        <TabsContent value={CONFIGURATION_TABS_ENUM.QUEUES} className="ext-m-0 ext-data-[state=inactive]:ext-hidden">
          <QueueAndStreamsToggles />
        </TabsContent>
        <TabsContent value={CONFIGURATION_TABS_ENUM.CHANNELS} className="ext-m-0 ext-data-[state=inactive]:ext-hidden">
          <ChannelsConfiguration />
        </TabsContent>
        <TabsContent
          value={CONFIGURATION_TABS_ENUM.CONNECTIONS}
          className="ext-m-0 ext-data-[state=inactive]:ext-hidden"
        >
          <ConnectionsConfiguration />
        </TabsContent>
      </div>
    </Tabs>
  );
}
