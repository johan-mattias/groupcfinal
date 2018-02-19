/**
 * Created by danielghandahari on 2018-01-26.
 */
import React, { Component } from 'react'

export class StatusBar extends Component {

    render() {
        return(
            <div className="status-flex">
                <div className="sum-status">{this.props.totalSum} kr</div>
                <button className="pay-btn">Pay</button>
            </div>
        )
    }

}