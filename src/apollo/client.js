import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://graph.hotcross.dev/subgraphs/name/bttc-dex`,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.hotcross.dev/subgraphs/name/bttc-blocks',
  }),
  cache: new InMemoryCache(),
});
