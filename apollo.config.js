module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'nuber-eats',
      url: 'http://localhost:5000/graphql',
    },
    extends: ['/node_modules'],
  },
};
