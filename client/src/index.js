import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,

} from "@apollo/client";
import {GET_ALL_USER} from "./components/QueryAndmutation";


const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' , cache: new InMemoryCache( {typePolicies: {
    User: {
        fields: {
            firstName: {
                read(firstName) {
                    return firstName.toUpperCase();
                }
            }
        }
    }
}})
});
//The field policy above defines a read function that specifies what the cache returns whenever User.firstName is queried.

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
                <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/edit/:id' element={<Edit/>} />
                <Route path='/create' element={<Create/>} />
                </Routes>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
