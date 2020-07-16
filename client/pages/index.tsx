import { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardsContainer from '../components/CardsContainer';
import SpeedDials from '../components/SpeedDials';
import Login from './login';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:4000/',
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
    },
    main: {
      marginBottom: theme.spacing(12),
    }
  })
);

export default function Home() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={classes.container}>
      <Head>
        <title>Price History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <main className={classes.main}>
        <ApolloProvider client={client}>
          { !isLoggedIn ?
            <Login setIsLoggedIn={setIsLoggedIn} />
            : <>
              <CardsContainer />
              <SpeedDials />
            </>
          }
        </ApolloProvider>
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
