import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { getRandomColor } from '@/lib/utils';
import { QueuePropSelect } from './queue-prop-select';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

type QueueData = {
  name: string;
  messages: number;
};
export function QueueOverviewChart() {
  const [queueData, setQueueData] = useState<QueueData[]>([]);
  const { currentCredentials } = useCurrentRabbitmqCredentials();

  useEffect(() => {
    const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
    if (!currentCredentials) return;

    fetch('/api/queues', {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data as QueueData[])
      .then((data) => setQueueData(data.map((item) => ({ ...item, fill: getRandomColor() }))))
      .catch((error) => console.error(error));
  }, [currentCredentials]);

  const orderedQueueData = queueData.sort((a, b) => b.messages - a.messages);
  const firstFiveQueues = orderedQueueData.slice(0, 10);
  const otherQueues = orderedQueueData.slice(5);

  // const other: QueueData = {
  //   name: 'Others',
  //   messages: otherQueues.reduce((acc, item) => acc + item.messages, 0),
  // };
  const firstFiveQueuesWithFillColor = firstFiveQueues.map((item) => ({ ...item, fill: getRandomColor() }));
  const allQueues = [
    ...firstFiveQueuesWithFillColor,
    //  other
  ];

  return (
    <Card className="flex flex-col ext-w-1/3 m-2 rounded-sm">
      <CardHeader className="flex flex-col">
        <div>
          <CardTitle>Messages by queue</CardTitle>
          <CardDescription>Current top 10 total messages by queue</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={allQueues} dataKey="messages">
              <LabelList
                dataKey="messages"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
