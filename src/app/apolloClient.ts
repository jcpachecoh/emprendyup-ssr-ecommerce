import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql';

const client = new ApolloClient({
  link: createHttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache(),
});

export default client;
