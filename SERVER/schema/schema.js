const {gql} = require('apollo-server');
const { createUser }=require('../resolver');

const typeDefs = gql`
 type Query{
    users:[User]
    user(id:ID!):User
 }
 
 type User{
     id:String
     firstName:String
     lastName:String
     email:String
 }

 type Mutation{
     createUser(userNew:UserInput):User
     deleteUser(removeUser:delete!):User
     updateUser(editUser:editInput!):User
 }
 
 input UserInput{
    firstName:String!
    lastName:String!
    email:String!
 }
 
 input editInput{
    id:String!
    firstName:String!
    lastName:String!
    email:String!
 }
 
 input delete{
    id:String!
 }
`;

module.exports = typeDefs;
