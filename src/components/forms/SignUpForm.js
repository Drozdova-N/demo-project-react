import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


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
        margin:'1em'
    },
}));

export default function SignUpForm(props) {
    const classes = useStyles();

    let newUser = {
        login:props.newUser.login,
        name:props.newUser.name,
        phone:props.newUser.phone,
        password: props.newUser.password,
    };

    const [state, setState] = React.useState(newUser);

    const handleChangeName = event => {
       newUser.name = event.target.value;
       setState(newUser);

    };
    const handleChangeLogin = event => {
       newUser.login = event.target.value;
       setState(newUser);
    };
    const handleChangePassword = event => {
       newUser.password = event.target.value;
       setState(newUser);

    };
    const handleChangePhone = event => {
       newUser.phone = event.target.value;
       setState(newUser);

    };

    return (
        <form className={classes.root} noValidate autoComplete="off" >
            <div className={classes.div}> <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography></div>
            {props.emptyField ?
                <div className={classes.div}>
                    <Typography variant="h10" gutterBottom style={{color:'#2292ff'}}>
                        There are mandatory fields
            </Typography>
                </div>:props.isDuplicate?<Typography variant="h10" gutterBottom style={{color:'#ff0200'}}>
                   The user with such login exists
                </Typography>:null
            }
            <div className={classes.div}>
                {props.emptyField?<small style={{color:'#2292ff'}}>*</small>:null}
                <TextField
                    label="login"
                    id="login"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    onChange={handleChangeLogin}
                />
            </div>
            <div className={classes.div}>
                {props.emptyField?<small style={{color:'#2292ff'}}>*</small>:null}
            <TextField
                label="name"
                id="name"
                defaultValue=""
                variant="outlined"
                size="small"
                onChange={handleChangeName}
            />
        </div>
            <div className={classes.div}>
                <TextField
                    label="phone"
                    id="phone"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    onChange={handleChangePhone}
                />
            </div>
            <div className={classes.div}>
                {props.emptyField?<small style={{color:'#2292ff'}}>*</small>:null}
                <TextField
                    label="password"
                    id="password"
                    defaultValue=""
                    variant="outlined"
                    type="password"
                    size="small"
                    onChange={handleChangePassword}
                />
            </div>
            <div className={classes.div}>
                <Button variant="outlined" color="primary"
                        style={{position: 'absolute' }}
                        onClick={props.onSignUp.bind(null, state)}>
                  SIGN UP
                </Button>
            </div>
        </form>
    );
}
