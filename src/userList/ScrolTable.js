import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'login',  label: 'Login', minWidth: 170},
    { id: 'role',  label: 'Role', minWidth: 170 },
    { id: 'phone',  label: 'Phone', minWidth: 170 },


];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    fullContainer: {
        height: '460px',
    },
    container: {
        height: '300px',
    },


});

export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
   //  props.isOpenRow? classes.container.height = '300px': classes.container.height ='700px';
    return (
        <Paper className={classes.root}>
            <TableContainer className={props.isOpenRow? classes.container: classes.fullContainer}>
                <Table stickyHeader aria-label="sticky table" className="table table-hover">
                    <TableHead className="thead-dark">
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    onClick={props.onSort.bind(null, column.id)}
                                >
                                    {column.label}
                                    {props.sortField === column.id?<small> {props.sort}</small>:null}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role="checkbox"
                                          tabIndex={-1}
                                          key={row.id}
                                          onClick={props.onRowSelect.bind(null, row)}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}