import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
// import { setContext } from 'apollo-link-context';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ //link to backend
  uri: 'http://localhost:5000/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  // console.log("token",token)
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
