import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const IsLoggedInVar = makeVar(Boolean(token));
export const AuthToken = makeVar(token);
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const authLink = setContext((_, { headers }) => {
  console.log(headers);
  return {
    headers: { ...headers, "x-jwt": AuthToken() || "" },
  };
});
export const client = new ApolloClient({
  //saving in cache
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return IsLoggedInVar;
            },
          },
          token: {
            read() {
              return AuthToken;
            },
          },
        },
      },
    },
  }),
});
