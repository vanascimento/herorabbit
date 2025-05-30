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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="ext-h-full ext-space-y-5">
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem className="ext-px-1">
              <FormLabel>{t('credentials.host.label')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={true} className="ext-rounded-sm" />
              </FormControl>
              <FormDescription>{t('credentials.host.description')}</FormDescription>
              <FormMessage>{form.formState.errors.host?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="ext-px-1">
              <FormLabel>{t('credentials.username.label')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={form.formState.isSubmitting} className="ext-rounded-sm" />
              </FormControl>
              <FormDescription>{t('credentials.username.description')}</FormDescription>
              <FormMessage>{form.formState.errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="ext-px-1">
              <FormLabel>{t('credentials.password.label')}</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={form.formState.isSubmitting} className="ext-rounded-sm" />
              </FormControl>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
              <FormDescription>{t('credentials.password.description')}</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="management_version"
          render={({ field }) => (
            <FormItem className="ext-px-1">
              <FormLabel>{t('credentials.management_version.label')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={true} className="ext-rounded-sm" />
              </FormControl>
              <FormDescription>{t('credentials.management_version.description')}</FormDescription>
              <FormMessage>{form.formState.errors.management_version?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="ext-w-full" disabled={form.formState.isSubmitting}>
          {t('credentials.button.save')}
        </Button>
      </form>
    </Form>
  );
}
