export type ConnectionProperties = {
  connection_name: string;
  product: string;
};

export type ConnectionData = {
  user: string;
  connection_name: string;
  product: string;
  client_properties: ConnectionProperties;
};

export type QueueData = {
  name: string;
  messages: number;
};

export type ChannelData = {
  user: string;
  name: string;
  connection_details: {
    name: string;
  };
  consumer_count: number;
};
