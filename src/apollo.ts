import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { AUTH_TOKEN } from './constants';

const token = localStorage.getItem(AUTH_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          authToken: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
