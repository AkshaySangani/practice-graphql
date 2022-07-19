import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { useMutation,useLazyQuery}from '@apollo/client';

const GET_USER = gql`
  {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_USER=gql`
mutation Mutation($removeUser: delete!) {
  deleteUser(removeUser: $removeUser) {
    firstName
  }
}`;

export default function Home() {

  // const {loading,error,data} = useQuery(GET_USER);
  const [loadUsers, { loading, error, data }] = useLazyQuery(GET_USER);
  const [deleteUser] = useMutation(DELETE_USER,{
    refetchQueries:[
      {query: GET_USER},
      'users'
    ]
  });


  const handleCLick=async (book)=>{
    console.log("book",book.id)
    let variables= {
      id:book.id
    };
    await deleteUser({
      variables: {
        removeUser: variables
      }
    })
  };

  useEffect(()=>{
    loadUsers();
  },[deleteUser]);

  console.log("data==>",data)

          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF USERS
                  </h3>
                  <h4><Link to="/create">Add User</Link></h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      { data && data.users.map((book, index) => (
                        <tr key={index}>
                          <td>{book.firstName}</td>
                          <td>{book.lastName}</td>
                          <td>{book.email}</td>
                          <td><Link className="btn btn-primary" to={`/edit/:${book.id}`} >Edit</Link></td>
                          <td><div className="btn btn-primary" onClick={()=>handleCLick(book)} >Delete</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
}

