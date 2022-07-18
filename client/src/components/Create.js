import React, {Component} from 'react';
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import {Link} from 'react-router-dom';

const CREATE_USER = gql`
    mutation CreateUser(
        $firstName: String!
        $lastName:String!
        $email: String!){ 
        createUser(
            firstName:$firstName
            lastName:$lastName
            email:$email)
    }
`;

class Create extends Component {

    render() {
        let firstName, lastName, email;
        return (
            <Mutation mutation={CREATE_USER} onCompleted={() => this.props.history.push('/')}>
                {(createUser, {loading, error}) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    ADD USER
                                </h3>
                            </div>
                            <div className="panel-body">
                                <h4><Link to="/" className="btn btn-primary">User List</Link></h4>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    createUser({
                                        variables: {
                                            firstName: firstName.value,
                                            lastName: lastName.value,
                                            email: email.value
                                        }
                                    });
                                    firstName.value = "";
                                    lastName.value = "";
                                    email.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="isbn">firstName:</label>
                                        <input type="text" className="form-control" name="firstName" ref={node => {
                                            firstName = node;
                                        }} placeholder="firstName"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">lastName:</label>
                                        <input type="text" className="form-control" name="lastName" ref={node => {
                                            lastName = node;
                                        }} placeholder="lastName"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="author">email:</label>
                                        <input type="text" className="form-control" name="email" ref={node => {
                                            email = node;
                                        }} placeholder="email"/>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default Create;
