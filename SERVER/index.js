const { ApolloServer, gql } = require('apollo-server');
const typeDefs =require('./schema/schema');
const mongoose=require("mongoose");
const resolvers =require("./resolver");

const app = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources:()=>({

    })
});


app.listen().then(() => {
    console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});

mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true});
let conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));

