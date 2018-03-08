/**
 * Created by danielghandahari on 2018-01-26.
 */
import React, { Component } from 'react'
import payImg from '../images/Swish_Logo_Primary_RGB.png'

export class StatusBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: props.totalSum === 0 ? 'hidden' : 'NO'
        }
    }

    render() {
        let totalToStr = this.props.totalSum.toString()
        let canSwish = this.props.totalSum > 0 ? 'swish://payment?data=%7B%22version%22%3A1%2C%22payee%22%3A%7B%22value%22%3A%20%22%2B46703382240%22%7D%2C%22amount%22%3A%7B%22value%22%3A' + totalToStr +'%7D%2C%22message%22%3A%7B%22value%22%3A%22skrubben.setIsGrateful%28true%29%22%7D%7D&callbackurl=plick%3A%2F%2F' : ''

        let hiddenClass = this.props.totalSum === 0 ? 'hidden-bar' : 'shown-bar'

        return(
            <div className={"status-flex " + hiddenClass}>
                <div className="sum-status">
                    {/*TODO: flytta funktionalitet from sum-status to tot-amount*/}
                    <div className="tot-total">Total</div>

                    <div className="tot-amount">
                        <div className="tot-sum">{this.props.totalSum}</div>
                        <div className="tot-sek">kr</div>
                    </div>


                </div>
                <a href={canSwish} className="reset-btn">Reset</a>
                <a href={canSwish} className="pay-btn-container">
                    <div className="pay-title">Pay with</div>
                    <img className="pay-img" src={payImg} alt=""/>
                </a>

            </div>
        )
    }

}