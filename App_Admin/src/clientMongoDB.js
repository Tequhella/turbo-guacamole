import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLinkMongoDB = new HttpLink({
  uri: 'http://api_nodejs:5001/graphql',
});

const link = httpLinkMongoDB;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;

