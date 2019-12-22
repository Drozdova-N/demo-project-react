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

    const [state, setState] = React.useState({
        role : undefined,
        propsOld : props
    });

    function getRole() {
        if(state.propsOld!== props){
            setState({
                role: props.user.role,
                propsOld: props
            })};
        return state.role;
    };
    const handleChange = event => {
        setState({
            role: event.target.value,
            propsOld: props
        });
    };

    return (
        <div className="alert alert-secondary" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.onCloseSelectRow.bind(null)}>
                <span aria-hidden="true">&times;</span>
            </button>
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    label="login"
                    id="login"
                    value={props.user.login}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    label="name"
                    id="name"
                    value={props.user.name}
                    variant="outlined"
                    size="small"
                />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="uncontrolled-native">Role</InputLabel>
                    <NativeSelect
                        value={getRole()}
                        onChange={handleChange}
                        name="role"
                        className={classes.selectEmpty}>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </NativeSelect>
                </FormControl>
                <TextField
                    label="phone"
                    id="phone"
                    value={props.user.phone}
                    variant="outlined"
                    size="small"
                />
            </div>
            <Button variant="outlined" color="primary">
                Update
            </Button>
        </form>
        </div>
    );
}


