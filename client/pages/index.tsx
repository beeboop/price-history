import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AUTH_TOKEN } from '../utils/constants';
import Providers from '../components/Providers';
import CardsContainer from '../components/CardsContainer';
import SearchContainer from '../components/SearchContainer';
import SpeedDials from '../components/SpeedDials';
import { LOGIN_STATE } from '../types/login';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
    },
    main: {
      paddingBottom: theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
    }
  })
);

export default function Home() {
  const router = useRouter();
  const classes = useStyles();
  const [loginState, setLoginState] = useState<keyof typeof LOGIN_STATE>('LOADING');
  // const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setLoginState(!!localStorage.getItem(AUTH_TOKEN) ? 'LOGGED_IN' : 'NOT_LOGGED_IN');
  }, []);

  if (loginState === 'LOADING') {
    return null;
  }

  if (loginState === 'NOT_LOGGED_IN') {
    router.push('/login');
    return null;
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>Price History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <main className={classes.main}>
        <Providers>
          <CardsContainer />
          <SpeedDials />
        </Providers>
      </main>  

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
