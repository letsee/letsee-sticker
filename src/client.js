// @flow
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient(process.env.GRAPHCOOL_SUBSCRIPTIONS_ENDPOINT, {
  reconnect: true,
});

const networkInterface = createNetworkInterface({
  uri: process.env.GRAPHCOOL_RELAY_ENDPOINT,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

export default client;
