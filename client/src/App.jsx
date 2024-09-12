import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen'; // Import the LoadingScreen component

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the animation has already been played
    const hasPlayed = localStorage.getItem('hasPlayedIntro');

    if (hasPlayed) {
      setIsLoading(false);
    } else {
      // If not played, show the animation and set the flag after it's done
      setIsLoading(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    // Set the flag in localStorage to mark the animation as played
    localStorage.setItem('hasPlayedIntro', 'true');
    setIsLoading(false);
  };

  return (
    <ApolloProvider client={client}>
      {isLoading ? (
        <LoadingScreen onComplete={handleAnimationComplete} />
      ) : (
        <div>
          <Header />
          <div>
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </ApolloProvider>
  );
}

export default App;
