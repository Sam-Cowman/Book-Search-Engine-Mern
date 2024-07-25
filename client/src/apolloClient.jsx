import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import React from 'react';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to connect to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql', // The URI of the GraphQL server endpoint
});

// Create an authentication link to add the authorization header to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  // Return the headers with the authorization token if it exists
  return {
    headers: {
      ...headers, // Preserve existing headers
      authorization: token ? `Bearer ${token}` : '', // Add the authorization header if the token exists
    },
  };
});

// Initialize the Apollo Client with the authLink and httpLink concatenated
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the authLink and httpLink
  cache: new InMemoryCache(), // Use an in-memory cache for caching GraphQL data
});

// Define a wrapper component for providing the Apollo Client to the React application
const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children} {/* Render the children components wrapped with ApolloProvider */}
  </ApolloProvider>
);

// Export the ApolloProviderWrapper component as the default export
export default ApolloProviderWrapper;