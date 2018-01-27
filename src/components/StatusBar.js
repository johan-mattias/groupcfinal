/**
 * Created by danielghandahari on 2018-01-26.
 */
import React, { Component } from 'react'

export class StatusBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalPrice: 0
        }
    }
    render() {
        return(
            <div className="status-flex">
                <input value={this.state.totalPrice} className="sum-status" type="number"/>
                <button className="pay-btn">Pay</button>
            </div>
        )
    }

}