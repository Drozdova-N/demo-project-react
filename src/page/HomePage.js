import React, {Component} from 'react';

import _ from 'lodash';

import Loader from "../loader/Loader";
import '../App.css';
import DetailRowView from "../userList/DetailRowView";
import StickyHeadTable from "../userList/ScrolTable"
import Head from "./Head";


class HomePage extends Component{
    state = {
        users:[],
        isLoading: true,
        sort: 'asc',  // 'desc'
        sortField: 'id',
        row: null,
        isOpenRow : false
    }

    onSort = (sortField)=> {
        const cloneData = this.state.users.concat();
        const sortType = this.state.sort === 'asc' ? 'desc': 'asc';
        const orderUserList = _.orderBy(cloneData, sortField, sortType);

        this.setState({
            users : orderUserList,
            sort: sortType,
            sortField: sortField
        })
    }

    onRowSelect= (item) => {
        this.setState({row: item, isOpenRow: true})
    }

    onCloseSelectRow = () =>{
        this.setState({row: null, isOpenRow: false })
    }

    componentDidMount() {
        const url = '/api/users';
        const headers = new Headers({
            'authentication': '7axipa9DJF'
        });
        const options = {
            headers,
            credentials:"include"
        };
        fetch(url, options)
            .then(res => res.json())
            .then(users => this.setState({
                users: _.orderBy(users, this.state.sortField, this.state.sort),
                isLoading: false} ));
    };

    signOut = () => {
        fetch('/api/signOut')
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className="App">
                <Head signOut={this.signOut}/>
                {
                    this.state.isLoading?
                        <Loader/>
                        : this.state.users.length !== 0? <StickyHeadTable list = {this.state.users}
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
                    /> : null
                }
            </div>
        );
    }
}

export default HomePage;