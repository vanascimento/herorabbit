import { renderQueueDashboard } from '@/components/content/queue-and-streams/render-queue-dashboard';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { GeneralSettings } from '@/lib/types';
import { BuildInterfaceMapperElements } from '@/lib/version-mapper-elements';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const QueueAndStreamsTogglesSchema = z.object({
  queue_chart: z.boolean(),
  download_messages: z.boolean(),
});

export type QueueAndStreamsToggles = z.infer<typeof QueueAndStreamsTogglesSchema>;

export default function ConnectionToggles() {
  const { setSettings, settings } = useSettings();
  const [localSettingsState, setLocalSettingsState] = useState<GeneralSettings>(settings);
  const { t } = useTranslation();

  return (
    <div className="ext-w-full ext-flex ext-flex-col ext-space-y-2">
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-rounded-sm ext-border ext-p-3 ext-shadow-sm">
        <div className="ext-space-y-0.5">
          <div className="ext-font-bold">{t('configurations.queues.title')}</div>
          <div>{t('configurations.queues.description')}</div>
        </div>
        <Switch
          checked={localSettingsState.toggleSettings.queue_chart}
          onCheckedChange={async (value) => {
            let newSettingsValue = {
              ...settings,
              toggleSettings: {
                ...settings.toggleSettings,
                queue_chart: value,
              },
            };
            await setSettings(newSettingsValue);
            const adapter = await BuildInterfaceMapperElements(settings.credentials[0].management_version!);
            setLocalSettingsState(newSettingsValue);
            renderQueueDashboard(adapter);
          }}
          aria-readonly
        />
      </div>
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-rounded-sm ext-border ext-p-3 ext-shadow-sm">
        <div className="ext-space-y-0.5">
          <div className="ext-font-bold ">{t('configurations.queues.management.title')}</div>
          <div className="ext-text-xs">{t('configurations.queues.management.description')}</div>
        </div>
        <Switch
          checked={localSettingsState.toggleSettings.download_messages}
          onCheckedChange={async (value) => {
            let newSettingsValue: GeneralSettings = {
              ...settings,
              toggleSettings: {
                ...settings.toggleSettings,
                download_messages: value,
              },
            };
            setSettings(newSettingsValue);
            setLocalSettingsState(newSettingsValue);
          }}
          aria-readonly
        />
      </div>
    </div>
  );
}
