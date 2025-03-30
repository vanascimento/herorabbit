import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';

const CredentialsFormSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  host: z.string().url(),
});

export type RabbitMqCredentials = z.infer<typeof CredentialsFormSchema>;

export default function CredentialsForm() {
  const form = useForm<z.infer<typeof CredentialsFormSchema>>({
    resolver: zodResolver(CredentialsFormSchema),
    defaultValues: {
      username: '',
      password: '',
      host: '',
    },
  });

  const { setSettings, settings } = useSettings();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let originPage = new URL(tabs[0].url!).origin;
      form.setValue('host', originPage);
    });
  });

  const handleSave = async (data: z.infer<typeof CredentialsFormSchema>) => {
    let toastId = toast.loading('Saving...');
    const base64Credentials = btoa(`${data.username}:${data.password}`);
    try {
      let response = await fetch(`${data.host}/api/overview`, {
        headers: { Authorization: `Basic ${base64Credentials}` },
      });
      if (response.ok) {
        let newCredentials = settings.credentials.filter((cred) => cred.host !== data.host);
        setSettings({ ...settings, credentials: [...newCredentials, data] });
        // localStorage.setItem(`${HERO_RABBIT_PREFIX}_credentials_${data.host}`, JSON.stringify(data));
        toast.success('Saved', { id: toastId });
      } else if (response.status === 401) {
        toast.error(`Error saving credentials,verify your credential`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Error saving credentials`, { id: toastId });
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
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input {...field} disabled={form.formState.isSubmitting} className="ext-rounded-sm" />
              </FormControl>
              <FormDescription>Http address to access rabbitmq</FormDescription>
              <FormMessage>{form.formState.errors.host?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="ext-px-1">
              <FormLabel>User</FormLabel>
              <FormControl>
                <Input {...field} disabled={form.formState.isSubmitting} className="ext-rounded-sm" />
              </FormControl>
              <FormDescription>Username of rabbit</FormDescription>
              <FormMessage>{form.formState.errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="ext-px-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={form.formState.isSubmitting} className="ext-rounded-sm" />
              </FormControl>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
              <FormDescription>Password to interact with rabbitmq</FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="ext-w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
