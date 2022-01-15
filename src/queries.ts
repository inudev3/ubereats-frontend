import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query meQuery {
    Me {
      id
      email
      role
      verified
    }
  }
`;
