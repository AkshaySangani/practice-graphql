import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import {GET_ALL_USER, DELETE_USER} from "./components/QueryAndmutation";
import {useMutation, useLazyQuery} from '@apollo/client';


export default function Home() {

    // const {loading,error,data} = useQuery(GET_USER);
    const [loadUsers, {loading, error, data}] = useLazyQuery(GET_ALL_USER);
    // const [deleteUser] = useMutation(DELETE_USER, {
    //     refetchQueries: [
    //         {query: GET_ALL_USER},
    //         'users'
    //     ]
    // });
    const [deleteUser] = useMutation(DELETE_USER, {
        update(cache, {data: {deleteUser}}) {
            const {users} = cache.readQuery({query: GET_ALL_USER});
            cache.writeQuery({
                query: GET_ALL_USER,
                data: {users: users.filter(user => user.id !== deleteUser.id)}
            });
        }
    });

    const handleClick = async (user) => {
        let variables = {
            id: user.id
        };
        await deleteUser({
            variables: {
                removeUser: variables
            }
        })
    };

    useEffect(() => {
        loadUsers();
    }, [deleteUser]);

    console.log("data==>", data);
    return (
        <div className="container">
            {(!data || loading) ? "Loading...":
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
                        {data && data.users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td><Link className="btn btn-primary" to={`/edit/:${user.id}`}>Edit</Link></td>
                                <td>
                                    <div className="btn btn-primary" onClick={() => handleClick(user)}>Delete</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
            {error && `Error! ${error.message}`}
        </div>
    )
        ;
}

