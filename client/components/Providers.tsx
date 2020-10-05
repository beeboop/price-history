import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { AUTH_TOKEN } from '../utils/constants';
import withAuth from './isAuthed';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:4000/',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  if (localStorage.getItem(AUTH_TOKEN)) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      }
    });
  }

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default function Provider({ checkAuth = true, children }) {
  const AuthWrappedChildren = withAuth(() => children);

  return (
    <ApolloProvider client={client}>
      { checkAuth ? <AuthWrappedChildren /> : children }
    </ApolloProvider>
  )
}