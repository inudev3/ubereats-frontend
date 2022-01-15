module.exports = {
  client: {
    includes: ["src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      url: "http://localhost:4000/graphql",
      name: "nuber-eats-backend",
    },
  },
};
