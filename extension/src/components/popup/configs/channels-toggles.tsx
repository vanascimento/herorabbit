import { renderChannelDashboard } from '@/components/content/channels/render-channel-dashboard';
import { renderQueueDashboard } from '@/components/content/queue-and-streams/render-queue-dashboard';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { GeneralSettings } from '@/lib/types';
import { BuildInterfaceMapperElements } from '@/lib/version-mapper-elements';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

const ChannelsConfigurationSchema = z.object({
  channel_dashboard: z.boolean(),
});

export type ChannelsConfiguration = z.infer<typeof ChannelsConfigurationSchema>;

export default function ChannelsConfiguration() {
  const { setSettings, settings } = useSettings();
  const [localSettingsState, setLocalSettingsState] = useState<GeneralSettings>(settings);
  const { t } = useTranslation();

  return (
    <div className="ext-w-full ext-flex ext-flex-col ext-space-y-2">
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-rounded-sm ext-border ext-p-3 ext-shadow-sm">
        <div className="ext-space-y-0.5">
          <div className="ext-font-bold">{t('configurations.channels.title')}</div>
          <div>{t('configurations.channels.description')}</div>
        </div>
        <Switch
          checked={localSettingsState.channelSettings.channel_dashboard}
          onCheckedChange={async (value) => {
            let newSettingsValue = {
              ...settings,
              channelSettings: {
                ...settings.channelSettings,
                channel_dashboard: value,
              },
            };
            setLocalSettingsState(newSettingsValue);
            await setSettings(newSettingsValue);
            const adapter = await BuildInterfaceMapperElements(settings.credentials[0].management_version!);
            await renderChannelDashboard(adapter);
            toast.success(t('configurations.channels.toast'));
          }}
          aria-readonly
        />
      </div>
    </div>
  );
}
