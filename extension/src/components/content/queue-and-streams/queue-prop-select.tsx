import * as React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartConfig } from '@/components/ui/chart';

const desktopData = [
  { month: 'january', desktop: 186, fill: 'var(--color-january)' },
  { month: 'february', desktop: 305, fill: 'var(--color-february)' },
  { month: 'march', desktop: 237, fill: 'var(--color-march)' },
  { month: 'april', desktop: 173, fill: 'var(--color-april)' },
  { month: 'may', desktop: 209, fill: 'var(--color-may)' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
  },
  mobile: {
    label: 'Mobile',
  },
  january: {
    label: 'January',
    color: 'hsl(var(--chart-1))',
  },
  february: {
    label: 'February',
    color: 'hsl(var(--chart-2))',
  },
  march: {
    label: 'March',
    color: 'hsl(var(--chart-3))',
  },
  april: {
    label: 'April',
    color: 'hsl(var(--chart-4))',
  },
  may: {
    label: 'May',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function QueuePropSelect() {
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);
  const months = React.useMemo(() => desktopData.map((item) => item.month), []);

  return (
    <Select value={activeMonth} onValueChange={setActiveMonth}>
      <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a value">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent align="end" className="rounded-xl">
        {months.map((key) => {
          const config = chartConfig[key as keyof typeof chartConfig];
          if (!config) {
            return null;
          }
          return (
            <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
              <div className="flex items-center gap-2 text-xs">
                <span
                  className="flex h-3 w-3 shrink-0 rounded-sm"
                  style={{
                    backgroundColor: `var(--color-${key})`,
                  }}
                />
                {config?.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
