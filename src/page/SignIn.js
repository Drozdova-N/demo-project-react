import React from 'react';
import SignInForm from "../components/forms/SignInForm";
class SignIn extends  React.Component {


    constructor(props) {
        super(props);
        this.state = {
            auth: {
                login: null,
                password: null
            },
            isError: false
        };
    };

    onSignIn = async (authorization) => {
        this.setState({auth: authorization});
        await fetch('/api/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(authorization)
        })
            .then(res => res.ok?res.json():this.setState({isError:true}))
            .then(token=> {
                if(token!==null) {document.cookie = "Auth-token="+token.value;
               window.location.href="/home";
                }
            })
            .catch(error => console.error(error));
    };

    render() {
        return  (
          <SignInForm
              authorization={this.state.auth}
              onSignIn = {this.onSignIn}
              isError={this.state.isError}/>
      );
    }
}
export default SignIn
