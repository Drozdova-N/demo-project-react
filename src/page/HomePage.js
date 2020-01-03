import React, {Component} from 'react';

import _ from 'lodash';

import Loader from "../components/loader/Loader";
import DetailRowView from "../components/userList/DetailRowView";
import ScrollTableUsers from "../components/userList/ScrolTable"
import Head from "./Head";
import '../App.css';
import LoggedIn from "../util/LoggedIn";

class HomePage extends Component{


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            sort: 'asc',  // 'desc'
            sortField: 'id',
            row: null,
            isOpenRow: false,
            token:LoggedIn.getCookie("Auth-token"),
            isErrorUpdate: false
        };
        this._isMounted = false;
    };
    onSort = (sortField)=> {
        const cloneData = this.state.users.concat();
        const sortType = this.state.sort === 'asc' ? 'desc': 'asc';
        const orderUserList = _.orderBy(cloneData, sortField, sortType);

        this.setState({
            users : orderUserList,
            sort: sortType,
            sortField: sortField
        })
    };

    onRowSelect= (item) => {
        this.setState({row: item, isOpenRow: true})
    };

    onCloseSelectRow = () =>{
        this.setState({row: null, isOpenRow: false })
    };

    async componentDidMount() {
        this._isMounted = true;
        const url = '/api/users';
        const headers = new Headers({
            'authentication': this.state.token
        });
        const options = {
            headers,
            credentials: "include"
        };
        await fetch(url, options)
            .then(res => res.json())
            .then(users => {
                if (this._isMounted){
                    this.setState({
                        users: _.orderBy(users, this.state.sortField, this.state.sort),
                        isLoading: false
                    });
                }
            });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    signOut = async () => {
        await fetch('/api/signOut', {
            headers: {'authentication': this.state.token}
        })
            .then(response => response.ok ? this.setState({token: null}) : null)
            .catch(error => console.error(error));
        LoggedIn.deleteCookie("Auth-token");
        window.location.href='/signIn';
    };

    onUpdateUser= async (updateUser) => {
        let user = {
            login: updateUser.login,
            name: updateUser.name,
            phone: updateUser.phone,
        };

        let url = "/api/users/" + updateUser.id + "/update";
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                // 'authentication': this.state.token
            },
            body:JSON.stringify(user)
        })
            .then(res => res.ok?res.json():this.setState({isErrorUpdate:true}))
            .then(user => {
                if (user !== undefined){
                    this.setState(state => ({
                        users: state.users.map(element => element.id === user.id ? {...user} : element)
                    }));

                    this.setState({row: updateUser, isErrorUpdate: false});
                }
            })
            .catch(error => console.error(error));


    };

    render() {
        return (
            <div className="App">
                <Head signOut={this.signOut}/>
                {
                    this.state.isLoading?
                        <Loader/>
                        : this.state.users.length !== 0? <ScrollTableUsers list = {this.state.users}
                                                                           onSort = {this.onSort}
                                                                           sortField = {this.state.sortField}
                                                                           sort = {this.state.sort}
                                                                           onRowSelect = {this.onRowSelect}
                                                                           isOpenRow = {this.state.isOpenRow}
                        /> : <h1>user not found</h1>
                }

                {
                    this.state.row ? <DetailRowView
                        user={this.state.row}
                        onCloseSelectRow={this.onCloseSelectRow}
                        onUpdateUser={this.onUpdateUser}
                        isErrorUpdate={this.state.isErrorUpdate}
                    /> : null
                }
            </div>
        );
    }
}

export default HomePage;