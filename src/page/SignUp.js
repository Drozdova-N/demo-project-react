/* eslint-disable no-unused-expressions */
import React from "react";
import SignUpForm from "../components/forms/SignUpForm";

class SignUp extends  React.Component {

   state = {
       newUser:{
           login:'',
           name:'',
           phone:'',
           password:''
       },
       emptyField : false,
       isDuplicate: false
   };

    onSignUp = async (user) => {
        this.setState({
            newUser:user,
            emptyField: (user.login === "" || user.name === "" || user.password === "")
        });

        if(!this.state.emptyField) {
        await fetch('/api/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
            .then(res => this.setState({isDuplicate: !res.ok}))
            .catch(error => console.error(error));
     }
        this.redirect()
    };

    redirect(){
        if (this.state.emptyField || this.state.isDuplicate) {
            return null;
        } else {
            window.location.href = "/signIn";
        }
    };

    render() {
        return  (
            <SignUpForm
            newUser={this.state.newUser}
            onSignUp = {this.onSignUp}
            emptyField ={this.state.emptyField}
            isDuplicate={ this.state.isDuplicate}
            />
        );
    }
}

export default SignUp