//Higher order component (HOC) = A component the renders other component
     //Importance of HOC
//Reuse code
//Render hijacking
//Props manipulation
//Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) =>(
    <div>
      <h1>info</h1>
    <p>This is the info: {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
      <div>
       {props.isAdmin && <p>This is a private message, please dont show</p>}
        <WrappedComponent {...props} />
      </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return(props) => (
        <div>
           {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>login</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

//ReactDOM.render(<AdminInfo isAdmin={true} info='These are the details' />, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info='You are now authenticated' />, document.getElementById('app'))