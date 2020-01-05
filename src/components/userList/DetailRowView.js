import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    div: {
        width: '90%',
        position:'center',


    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default function DetailRow(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(props.user);

    let updateUser = {
        id : user.id,
        login: user.login,
        name: user.name,
        role: user.role,
        phone: user.phone
    };
    React.useEffect( () => {
        setUser(props.user);
    }, [props]);

    const handleChange = event =>{
        switch (event.target.id) {
            case "login":
               updateUser.login = event.target.value;
               setUser(updateUser);
                break;
            case "name":
                updateUser.name = event.target.value;
                setUser(updateUser);
                break;
            case "role":
                updateUser.role = event.target.value;
                setUser(updateUser);
                break;
            case "phone":
                updateUser.phone = event.target.value;
                setUser(updateUser);
                break;
            default : console.log("id component not found");
            break;
        }
    };

    return (
        <div className="alert alert-secondary" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.onCloseSelectRow.bind(null)}>
                <span aria-hidden="true">&times;</span>
            </button>
        <form className={classes.root} noValidate autoComplete="off">
            {props.isErrorUpdate?<small style={{color:'#FF0115'}}>user is not updated</small>:null}
            <div>
                <TextField
                    label="login"
                    id="login"
                    value={user.login}
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    InputProps={props.userRole==='ADMIN'? {readOnly: false}:{readOnly: true}}
                />
                <TextField
                    label="name"
                    id="name"
                    value={user.name}
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    InputProps={props.userRole==='ADMIN'? {readOnly: false}:{readOnly: true}}
                />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="uncontrolled-native">Role</InputLabel>
                    <NativeSelect
                        id="role"
                        name="role"
                        value={user.role}
                        onChange={props.userRole==='ADMIN'?handleChange:null}
                        className={classes.selectEmpty}>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </NativeSelect>
                </FormControl>
                <TextField
                    label="phone"
                    id="phone"
                    value={user.phone}
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    InputProps={props.userRole==='ADMIN'? {readOnly: false}:{readOnly: true}}
                />
            </div>
            {props.userRole==='ADMIN'?
                <Button variant="outlined" color="primary" onClick={props.onUpdateUser.bind(null, user)}>
                    Update
            </Button>
                :null
            }
        </form>
        </div>
    );
}


