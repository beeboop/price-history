import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardsContainer from '../components/CardsContainer';
import Fab from '../components/FloatingActionButton';

const client = new ApolloClient({
  uri: process.env.SERVER_URI || 'http://localhost:4000',
});


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <main>
        <ApolloProvider client={client}>
          <CardsContainer />
          <Fab />
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
