import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
    root: {
       width: '100%',
       padding: '2em',
       position: 'relative',
       marginLeft: '40%',
       marginTop: '4%',
       marginRight: '20%',

},
    div: {
        marginBottom: '1em',
        margin:'1em',

    },
    button: {
        marginRight: '1em'

}
}));

export default function SignInForm(props) {
    const classes = useStyles();

    let authorization = {
        login:props.authorization.login,
        password:props.authorization.password,
    };

    const [state, setState]= React.useState(authorization);

    const handleChangeLogin = event =>{
        authorization.login = event.target.value;
        setState(authorization);
    };

    const handleChangePassword = event =>{
        authorization.password = event.target.value;
        setState(authorization);
    };


    return (
        <form className={classes.root} noValidate autoComplete="off">
                    <div className={classes.div}> <Typography variant="h4" gutterBottom>
                        Sign In
                    </Typography></div>
            {
                props.isError?<div className={classes.div}> <Typography variant="h10" gutterBottom style={{color:'#FF0115'}}>
                    login or password entered is not correct, try again
                </Typography></div>: null
            }
                    <div className={classes.div}>
                        {
                            props.isError?<TextField
                                error
                                label="login"
                                id="login"
                                variant="outlined"
                                onChange={handleChangeLogin}
                            />:
                                <TextField
                                label="login"
                                id="login"
                                variant="outlined"
                                onChange={handleChangeLogin}
                            />
                        }
                    </div>
                    <div className={classes.div}>
                        {
                            props.isError?<TextField
                                error
                                label="password"
                                id="password"
                                variant="outlined"
                                type="password"
                                onChange={handleChangePassword}
                                />:
                                <TextField
                                label="password"
                                id="password"
                                variant="outlined"
                                type="password"
                                onChange={handleChangePassword}
                            />
                        }

                    </div>
                <div className={classes.div}>
                    <Button className={classes.button} variant="outlined" color="primary"  onClick={props.onSignIn.bind(null, state)} >
                        SIGN IN</Button>

                    <Link to='/signUp'> <Button className={classes.button} variant="outlined" color="primary">
                      SIGN UP
                    </Button></Link>

                </div>
                </form>
    );
}
