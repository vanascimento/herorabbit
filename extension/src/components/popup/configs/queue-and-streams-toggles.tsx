import { renderQueueDashboard } from '@/components/content/queue-and-streams/render-queue-dashboard';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { GeneralSettings } from '@/lib/types';
import { BuildInterfaceMapperElements } from '@/lib/version-mapper-elements';
import { useState } from 'react';
import { z } from 'zod';

const QueueAndStreamsTogglesSchema = z.object({
  queue_chart: z.boolean(),
  download_messages: z.boolean(),
});

export type QueueAndStreamsToggles = z.infer<typeof QueueAndStreamsTogglesSchema>;

export default function ConnectionToggles() {
  const { setSettings, settings } = useSettings();
  const [localSettingsState, setLocalSettingsState] = useState<GeneralSettings>(settings);

  return (
    <div className="ext-w-full ext-flex ext-flex-col ext-space-y-2">
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-rounded-sm ext-border ext-p-3 ext-shadow-sm">
        <div className="ext-space-y-0.5">
          <div>Queue Chart</div>
          <div>Chart that shows the size of each queue by name.</div>
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
          <div>Message downloads</div>
          <div>Provide a button to download all messages from queue in a jsonl file</div>
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
