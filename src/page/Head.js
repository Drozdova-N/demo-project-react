import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        marginLeft: '95%',
        fontSize : '9px'
    },
    text: {
        margin: theme.spacing(1),
        marginRight: '90%',
    },
}));

export default ({signOut}) => {
    const classes = useStyles();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{height: '30px'}}>
            <div className="container">
                <Typography className="navbar-brand">REACT APP</Typography>
                <Button variant="outlined" size="small"
                        color="primary"
                        className={classes.root}
                        onClick = {signOut.bind(null)}>
                        signOut
                </Button>
            </div>
        </nav>
);
}
