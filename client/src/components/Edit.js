import React, { useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {GET_USER, EDIT_USER} from "./QueryAndmutation";
import {useQuery, useMutation} from '@apollo/client';

const Edit = () => {
    const navigate=useNavigate();
    const [field, setField] = useState({
        firstName:'',
        lastName: '',
        email: '',
    });

    const {loading, data} = useQuery(GET_USER, {
        variables: {userId: window.location.pathname.split(":")[1]},
    });
    const [updateUser,{error}] = useMutation(EDIT_USER);

    return (
            <div className="container">
            {!data || loading ?"loading...":
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-lastName">
                            EDIT USER
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/" className="btn btn-primary">User List</Link></h4>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            let variables = {
                                id: data.user.id,
                                firstName: field.firstName || data.user.firstName,
                                lastName: field.lastName|| data.user.lastName,
                                email: field.email|| data.user.email,
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
                                       defaultValue={data.user.firstName} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">lastName:</label>
                                <input type="text" className="form-control" name="lastName" placeholder="lastName"
                                       onChange={(e) => setField({...field, lastName: e.target.value})}
                                       defaultValue={data.user.lastName } required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">email:</label>
                                <input type="email" className="form-control" name="email" placeholder="email"
                                       onChange={(e) => setField({...field, email: e.target.value})}
                                       defaultValue={data.user.email} required/>
                            </div>
                            <button type="submit" className="btn btn-success" >Submit</button>
                        </form>
                            {error && `Error! ${error.message}`}
                    </div>
                </div>
            }
            </div>

    );

};

export default Edit;

