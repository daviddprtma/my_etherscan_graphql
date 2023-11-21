// Import Apollo Server and schema 
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom data source
const EtherDataSource = require("./datasource/ethDatasource");  

// Import GraphQL schema
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables
require("dotenv").config();

// Define GraphQL resolvers
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      // Call etherBalanceByAddress method on data source
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      // Call totalSupplyOfEther method on data source  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      // Call getLatestEthereumPrice method on data source
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      // Call getBlockConfirmationTime method on data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  
  // Pass in schema and resolvers
  typeDefs,
  resolvers,
  
  // Set up data sources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set timeout and start server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});