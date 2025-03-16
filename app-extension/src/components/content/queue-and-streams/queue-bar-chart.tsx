import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { getRandomColor } from '@/lib/utils';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type QueueData = {
  name: string;
  messages: number;
};

const DEFAULT_TOP_ITEMS = 10;

export function QueueBarOverviewChart() {
  const [queueData, setQueueData] = useState<QueueData[]>([]);
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  const [topItems, setTopItems] = useState<number>(DEFAULT_TOP_ITEMS);

  /**
   * Fetch quantity of messages by queue
   */
  const updateQueueData = async () => {
    let toastId = toast.loading('Loading queue data...');
    try {
      const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
      let response = await fetch('/api/queues', {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      let data = await response.json();
      setQueueData(data as QueueData[]);
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

  const orderedQueueData = queueData.sort((a, b) => b.messages - a.messages);
  const firstFiveQueues = orderedQueueData.slice(0, topItems);

  const firstFiveQueuesWithFillColor = firstFiveQueues.map((item) => ({ ...item, fill: getRandomColor() }));
  const allQueues = [
    ...firstFiveQueuesWithFillColor,
    //  other
  ];

  return (
    <Card className="flex flex-col ext-w-1/3 m-2 rounded-sm">
      <CardHeader>
        <div className=" ext-flex ext-flex-row ext-justify-between ">
          <div>
            <CardTitle>Messages by queue</CardTitle>
            <CardDescription>Current top {topItems} total messages by queue</CardDescription>
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
          <BarChart accessibilityLayer data={allQueues} layout="vertical" margin={{ right: 16 }}>
            <YAxis dataKey="name" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis dataKey="messages" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="messages" layout="vertical" radius={4}>
              <LabelList dataKey="name" position="center" className="ext-fill-white ext-font-semibold " offset={8} />
              <LabelList dataKey="messages" position="right" offset={8} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
