/**
 * Created by danielghandahari on 2018-01-27.
 */
import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';

export class Insert extends Component {

    getNewItem = (e) => {
        axios.get('/').then(function(response) {
            console.log(response);
        });
    }

    insertNewItem = (e) => {
        axios.post('/api/insert',
            querystring.stringify({
                description: 'our test description etc okej aras',
                name: 'Arassss'
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function(response) {
            console.log(response.data);
        });
    }

    render() {
        return(
            <button onClick={this.getNewItem}>DB TEST</button>
        );
    }
}