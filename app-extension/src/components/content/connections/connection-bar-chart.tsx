import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { getRandomColor } from '@/lib/utils';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type ConnectionData = {
  user_provided_name: string;
  connection_name: string;
  product: string;
};

const DEFAULT_TOP_ITEMS = 10;

export function ConnectionBarOverviewChart() {
  const [connectionsData, setConnectionsData] = useState<ConnectionData[]>([]);
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  const [topItems, setTopItems] = useState<number>(DEFAULT_TOP_ITEMS);

  /**
   * Fetch quantity of messages by queue
   */
  const updateQueueData = async () => {
    let toastId = toast.loading('Loading queue data...');
    try {
      const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
      let response = await fetch('/api/connections', {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      let data = await response.json();
      setConnectionsData(data as ConnectionData[]);
    } catch (error) {
      toast.error('Failed to load queue data', { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (!currentCredentials) return;
    updateQueueData();
  }, [currentCredentials]);

  const userConnectionsMap = new Map<string, number>();

  connectionsData.forEach((connection) => {
    const { user_provided_name } = connection;
    if (userConnectionsMap.has(user_provided_name)) {
      userConnectionsMap.set(user_provided_name, userConnectionsMap.get(user_provided_name)! + 1);
    } else {
      userConnectionsMap.set(user_provided_name, 1);
    }
  });

  const userConnectionsList: { user: string; connections: number; fill: string }[] = [];
  userConnectionsMap.forEach((value, key) => {
    userConnectionsList.push({ user: key, connections: value, fill: getRandomColor() });
  });

  let topUserConnectionsList = userConnectionsList
    .sort((a, b) => b.connections - a.connections)
    .slice(0, topItems)
    .filter((item) => item.connections > 0);

  return (
    <Card className="flex flex-col ext-w-1/3 m-2 rounded-sm">
      <CardHeader>
        <div className=" ext-flex ext-flex-row ext-justify-between ">
          <div>
            <CardTitle>Connections by user</CardTitle>
            <CardDescription>Current top {topItems} total connections by user</CardDescription>
          </div>
          <div className="ext-flex ext-flex-row ext-self-end">
            <Input
              onChange={(value) => setTopItems(Number(value.target.value))}
              onWheel={(e) => e.preventDefault()}
              className=" ext-text-center ext-rounded-sm"
              value={topItems}
              type="number"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="ext-flex-1 ext-pb-0">
        <ChartContainer config={{}} className="ext-mx-auto ext-aspect-square ext-max-h-[500px]">
          <BarChart accessibilityLayer data={topUserConnectionsList} layout="vertical" margin={{ right: 16 }}>
            <YAxis dataKey="user" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis dataKey="connections" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="connections" layout="vertical" radius={4}>
              <LabelList dataKey="user" position="center" className="ext-fill-white ext-font-semibold " offset={8} />
              <LabelList dataKey="connections" position="right" offset={8} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
