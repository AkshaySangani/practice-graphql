import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {GET_USER, EDIT_USER} from "./QueryAndmutation";
import {useQuery, useMutation} from '@apollo/client';

const Edit = () => {
    const navigate=useNavigate();
    const [field, setField] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const {loading, error, data} = useQuery(GET_USER, {
        variables: {userId: window.location.pathname.split(":")[1]},
    });
    const [updateUser] = useMutation(EDIT_USER);

    return (
        <>
            {!loading &&
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-lastName">
                            EDIT BOOK
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            let variables = {
                                id: data.user.id,
                                firstName: field.firstName,
                                lastName: field.lastName,
                                email: field.email
                            };
                            await updateUser({
                                variables: {
                                    editUser: variables
                                }
                            });
                            setField({});
                            navigate("/");
                        }}>
                            <div className="form-group">
                                <label htmlFor="firstName">firstName:</label>
                                <input type="text" className="form-control" name="firstName" placeholder="firstName"
                                       onChange={(e) => setField({...field, firstName: e.target.value})}
                                       defaultValue={data.user.firstName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">lastName:</label>
                                <input type="text" className="form-control" name="lastName" placeholder="lastName"
                                       onChange={(e) => setField({...field, lastName: e.target.value})}
                                       defaultValue={data.user.lastName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">email:</label>
                                <input type="email" className="form-control" name="email" placeholder="email"
                                       onChange={(e) => setField({...field, email: e.target.value})}
                                       defaultValue={data.user.email}/>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                            {error && error.graphQLErrors.map(({ message }) => (
                                console.log(message)
                            ))}
                        </form>
                    </div>
                </div>
            </div>
            }
        </>
    );

}

export default Edit;

