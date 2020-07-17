import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AUTH_TOKEN } from '../utils/constants';

const IS_AUTH = gql`
  {
    isAuth
  }
`;

export default function withAuth(Component) {
  return function(props) {
    const { loading, error, data } = useQuery(IS_AUTH);
  
    if (loading) return 'Loading....';
    if (error || !data.isAuth) {
      localStorage.removeItem(AUTH_TOKEN);
      return 'Log in again';
    }
  
    return <Component { ...props } />;
  }
}
