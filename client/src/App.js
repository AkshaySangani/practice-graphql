import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Mutation from "react-apollo/Mutation";

const GET_BOOKS = gql`
  {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id:$id) {
      id
    }
  }
`;

class App extends Component {

  deleteUser = (e) => {
    console.log("enter",e)
      return (
          <Mutation mutation={DELETE_USER} key={e.id} onCompleted={() => this.props.history.push('/')}>
            {({loading, error}) => (
                console.log('data-->', {loading, error})
            )}
          </Mutation>
      )
  }

  render() {

    return (
      <Query pollInterval={500} query={GET_BOOKS}>
        {({ loading, error, data }) => {
          console.log('data',data)
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

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
                      {data.users.map((book, index) => (
                        <tr key={index}>
                          <td>{book.firstName}</td>
                          <td>{book.lastName}</td>
                          <td>{book.email}</td>
                          <td><div className="btn btn-primary" onClick={()=>this.deleteUser(book)}>Delete</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
