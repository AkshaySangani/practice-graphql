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
 
 type Admin{
     id:String
     email:String
     password:String
     token:String
 }

 type Mutation{
     createAdmin(newAdmin:AdminInput!):Admin
     checkAdmin(newAdmin:AdminInput!):Admin
     createUser(userNew:UserInput!):User
     deleteUser(removeUser:delete!):User
     updateUser(editUser:editInput!):User
 }
 
 input UserInput{
    firstName:String!
    lastName:String!
    email:String!
 }
 
 input AdminInput{
    email:String!
    password:String!
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
