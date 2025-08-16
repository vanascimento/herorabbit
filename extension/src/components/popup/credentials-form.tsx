import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useTranslation } from 'react-i18next';
import { Key, Server, User, Lock } from 'lucide-react';

const CredentialsFormSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  host: z.string().url(),
  management_version: z.string(),
});

export type RabbitMqCredentials = z.infer<typeof CredentialsFormSchema>;

/**
 * Credentials form component
 *
 * This component is used to add new credentials to the settings
 * It also shows the management version of the RabbitMQ server
 */
export default function CredentialsForm() {
  const form = useForm<z.infer<typeof CredentialsFormSchema>>({
    resolver: zodResolver(CredentialsFormSchema),
    defaultValues: {
      username: '',
      password: '',
      host: '',
      management_version: '',
    },
  });
  const { t } = useTranslation();
  const { setSettings, settings } = useSettings();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let originPage = new URL(tabs[0].url!).origin;
      form.setValue('host', originPage);
    });
  });

  // handle the save button
  const handleSave = async (data: z.infer<typeof CredentialsFormSchema>) => {
    let toastId = toast.loading(t('credentials.toast.saving'));

    // get the base64 credentials
    const base64Credentials = btoa(`${data.username}:${data.password}`);

    try {
      let response = await fetch(`${data.host}/api/overview`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'omit',
      });

      // if the response is ok, get the management version
      if (response.ok) {
        const overviewData = await response.json();
        const managementVersion = overviewData.management_version || '';

        // update the form with the management version
        form.setValue('management_version', managementVersion);

        // update the settings with the new credentials
        let newCredentials = settings.credentials.filter((cred) => cred.host !== data.host);
        setSettings({
          ...settings,
          credentials: [...newCredentials, { ...data, management_version: managementVersion }],
        });
        toast.success(t('credentials.toast.saved'), { id: toastId });
      } else if (response.status === 401) {
        toast.error(t('credentials.toast.invalid_credentials'), { id: toastId });
      }
    } catch (error) {
      toast.error(t('credentials.toast.connection_error'), { id: toastId });
    }
  };

  return (
    <div className="ext-w-full ext-space-y-4">
      {/* Header */}
      <div className="ext-text-center ext-space-y-2">
        <h2 className="ext-text-lg ext-font-bold ext-text-gray-900">Connect to RabbitMQ</h2>
        <p className="ext-text-xs ext-text-gray-600">Enter your credentials to get started</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="ext-space-y-4">
          {/* Host Field */}
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ext-flex ext-items-center ext-space-x-2 ext-text-sm ext-font-medium ext-text-gray-700">
                  <Server size={16} className="ext-text-gray-500" />
                  <span>{t('credentials.host.label')}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={true}
                    className="ext-h-10 ext-border-gray-300 ext-bg-gray-50 ext-text-gray-600 ext-font-mono ext-text-sm"
                  />
                </FormControl>
                <FormDescription className="ext-text-xs ext-text-gray-500 ext-ml-6">
                  {t('credentials.host.description')}
                </FormDescription>
                <FormMessage className="ext-ml-6" />
              </FormItem>
            )}
          />

          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ext-flex ext-items-center ext-space-x-2 ext-text-sm ext-font-medium ext-text-gray-700">
                  <User size={16} className="ext-text-gray-500" />
                  <span>{t('credentials.username.label')}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className="ext-h-10 ext-border-gray-300 focus:ext-border-orange-500 focus:ext-ring-orange-500 ext-transition-colors"
                    placeholder="Enter username"
                  />
                </FormControl>
                <FormDescription className="ext-text-xs ext-text-gray-500 ext-ml-6">
                  {t('credentials.username.description')}
                </FormDescription>
                <FormMessage className="ext-ml-6" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ext-flex ext-items-center ext-space-x-2 ext-text-sm ext-font-medium ext-text-gray-700">
                  <Lock size={16} className="ext-text-gray-500" />
                  <span>{t('credentials.password.label')}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={form.formState.isSubmitting}
                    className="ext-h-10 ext-border-gray-300 focus:ext-border-orange-500 focus:ext-ring-orange-500 ext-transition-colors"
                    placeholder="Enter password"
                  />
                </FormControl>
                <FormDescription className="ext-text-xs ext-text-gray-500 ext-ml-6">
                  {t('credentials.password.description')}
                </FormDescription>
                <FormMessage className="ext-ml-6" />
              </FormItem>
            )}
          />

          {/* Hidden Management Version Field */}
          <FormField
            control={form.control}
            name="management_version"
            render={({ field }) => (
              <FormItem hidden={true}>
                <FormLabel>{t('credentials.management_version.label')}</FormLabel>
                <FormControl>
                  <Input {...field} disabled={true} />
                </FormControl>
                <FormDescription>{t('credentials.management_version.description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="ext-w-full ext-h-11 ext-bg-gradient-to-r ext-from-orange-500 ext-to-amber-500 hover:ext-from-orange-600 hover:ext-to-amber-600 ext-text-white ext-font-semibold ext-shadow-lg hover:ext-shadow-xl ext-transition-all ext-duration-200 ext-mt-4 ext-rounded-sm"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <div className="ext-flex ext-items-center ext-space-x-2">
                <div className="ext-w-4 ext-h-4 ext-border-2 ext-border-white ext-border-t-transparent ext-rounded-full ext-animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="ext-flex ext-items-center ext-space-x-2">
                <Key size={16} />
                <span>{t('credentials.button.save')}</span>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
