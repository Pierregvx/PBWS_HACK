import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
export function createApolloClient() {
  return new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/43214/core-subgraph-arbitrum/v0.0.2/',
    cache: new InMemoryCache(),
  });
}
const TOKENS_QUERY = gql`
  query {
    tokens(orderBy: totalLocked, orderDirection: desc) {
      id
      name
    }
  }
`;

const GRIDS_QUERY = gql`
  query Grids($tokenAddress: String!) {
    grids(where: { token0_: { id: $tokenAddress } }) {
      id
      token0 {
        name
        symbol
      }
      token1 {
        name
        symbol
      }
      price1
      price0
    }
  }
`;

export async function getToken() {
  const client = createApolloClient();
  const { data } = await client.query({ query: TOKENS_QUERY });
  return {
    tokens: data.tokens,
  };
}

export async function getTokenGrids(tokenAddress) {
  const client = createApolloClient();
  const { data } = await client.query({ query: GRIDS_QUERY, variables: { tokenAddress } });
  return {
    grids: data.grids,
  };
}
