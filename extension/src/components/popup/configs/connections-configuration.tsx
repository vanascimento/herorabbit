import { renderConnectionDashboard } from '@/components/content/connections/render-connection-dashboard';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { GeneralSettings } from '@/lib/types';
import { BuildInterfaceMapperElements } from '@/lib/version-mapper-elements';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

const ConnectionsConfigurationSchema = z.object({
  connections_dashboard: z.boolean(),
});

export type ConnectionsConfiguration = z.infer<typeof ConnectionsConfigurationSchema>;

export default function ConnectionsConfiguration() {
  const { setSettings, settings } = useSettings();
  const [localSettingsState, setLocalSettingsState] = useState<GeneralSettings>(settings);
  const { t } = useTranslation();

  return (
    <div className="ext-w-full ext-flex ext-flex-col ext-space-y-2">
      <div className="ext-flex ext-w-full ext-flex-row ext-items-center ext-justify-between ext-rounded-sm ext-border ext-p-3 ext-shadow-sm">
        <div className="ext-space-y-0.5">
          <div className="ext-font-bold">{t('configurations.connections.title')}</div>
          <div>{t('configurations.connections.description')}</div>
        </div>
        <Switch
          checked={localSettingsState.connectionsSettings.connections_dashboard}
          onCheckedChange={async (value) => {
            let newSettingsValue = {
              ...settings,
              connectionsSettings: {
                ...settings.connectionsSettings,
                connections_dashboard: value,
              },
            };
            setLocalSettingsState(newSettingsValue);
            await setSettings(newSettingsValue);
            const adapter = await BuildInterfaceMapperElements(settings.credentials[0].management_version!);
            await renderConnectionDashboard(adapter);
            toast.success(t('configurations.connections.toast'));
          }}
          aria-readonly
        />
      </div>
    </div>
  );
}
