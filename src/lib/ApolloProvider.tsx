// lib/apollo-provider.js
"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {SSRMultipartLink,ApolloNextAppProvider, InMemoryCache, ApolloClient} from '@apollo/experimental-nextjs-app-support'
import { setContext } from '@apollo/client/link/context';

const getToken = () => {
  // env variable
  return 'e74153843b1cdab7a1ee9145353b2c6686a89be207152ff9d3abe4098caa00cda26352d35b19e7acaa3f6400087d8a5192f71cd5e108c1388bbb32cf17eaef1177f4b3f3471f57ed5012932937a3f9489a82bf20ba110c5bdcc77e72b8c41ebd8415d2be828bc2afc3bbd64e8d281e853b406b79c636c71414cfac437d352065';
};


const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = getToken();
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  }
});

function makeClient() {
  const httpLink = authLink.concat(new HttpLink({
    uri: "https://productive-comfort-ceaf1158d0.strapiapp.com/graphql",
  }))

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
