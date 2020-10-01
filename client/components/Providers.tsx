import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AUTH_TOKEN } from '../utils/constants';
import withAuth from './isAuthed';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:4000/',
  headers: {
    authorization: typeof window !== 'undefined' && localStorage.getItem(AUTH_TOKEN) ? `Bearer ${localStorage.getItem(AUTH_TOKEN)}` : '',
  }
});

export default function Provider({ checkAuth = true, children }) {
  const AuthWrappedChildren = withAuth(() => children);

  return (
    <ApolloProvider client={client}>
      { checkAuth ? <AuthWrappedChildren /> : children }
    </ApolloProvider>
  )
}