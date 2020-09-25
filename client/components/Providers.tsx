import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { AUTH_TOKEN } from '../utils/constants';
import withAuth from './isAuthed';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:4000/',
  request: (operation) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
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