const {gql} = require('apollo-server');
//
// const typeDefs = gql`
// type Student {
//   id: ID
//   name: String
//   email: String
// }
//
// type Query {
//   students: [Student]!
// }
//
// type Mutation {
//   getStudents(Ids: [ID]!): Response!
//   createStudents(forCreate:Student): Response!
// }
//
// type Response {
//   success: Boolean!
//   message: String
//   students: [Student]
// }
//
// `
//
// module.exports = typeDefs;

const typeDefs = gql`
 type Query{
    users:[User]
    user(id:ID!):User
 }
 
 type User{
     id:ID!
     firstName:String
     lastName:String
     email:String
 }

 type Mutation{
     createUser(userNew:UserInput!):User
 }
 input UserInput{
    firstName:String!
    lastName:String!
    email:String!
 }
`

module.exports = typeDefs;
