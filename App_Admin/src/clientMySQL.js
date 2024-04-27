import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLinkMySQL = new HttpLink({
  uri: 'http://api_python:5000/graphql',
});

const link = httpLinkMySQL;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;

