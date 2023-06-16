/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuoteAppData = /* GraphQL */ `
  query GetQuoteAppData($id: ID!) {
    getQuoteAppData(id: $id) {
      id
      queryName
      quotesGenerated
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listQuoteAppData = /* GraphQL */ `
  query ListQuoteAppData(
    $filter: ModelQuoteAppDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuoteAppData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        queryName
        quotesGenerated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const quotesQueryName = /* GraphQL */ `
  query QuotesQueryName(
    $queryName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelQuoteAppDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    quotesQueryName(
      queryName: $queryName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        queryName
        quotesGenerated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const generateAQuote = /* GraphQL */ `
  query GenerateAQuote($input: AWSJSON!) {
    generateAQuote(input: $input)
  }
`;
