/**
 * Created by danielghandahari on 2018-01-26.
 */
import React, { Component } from 'react'

export class StatusBar extends Component {

    render() {
        return(
            <div className="status-flex">
                <div className="sum-status">{this.props.totalSum} kr</div>
                <a href="swish://payment?data=%7B%22version%22%3A1%2C%22payee%22%3A%7B%22value%22%3A%20%22%2B46703382240%22%7D%2C%22amount%22%3A%7B%22value%22%3A200%7D%2C%22message%22%3A%7B%22value%22%3A%22ChristianAaaaaaalex%22%7D%7D&callbackurl=plick%3A%2F%2F" className="pay-btn">Pay</a>
            </div>
        )
    }

}