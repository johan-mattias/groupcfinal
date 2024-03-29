/**
 * Created by danielghandahari on 2018-01-26.
 */
import React, { Component } from 'react'

import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'

import payImg from '../images/Swish_Logo_Primary_RGB.png'

import Loader from 'react-loaders'
import 'loaders.css/src/animations/ball-scale-ripple-multiple.scss'

import {isMobile} from 'react-device-detect';



export class StatusBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: props.totalSum === 0 ? 'hidden' : 'NO',
            // state.show is for showing sweetalert
            show: false,
            showLoader: false
        }
    }

    swishAlert = () => {
        setTimeout(() => {
            this.setState({
                showLoader: false,
                show: true
            })
        }, 3000);
    }

    onSwish = () => {
        let totalToStr = this.props.totalSum.toString()
        // safety check to never swish if amount is not greater that 0
        let canSwish = this.props.totalSum > 0 ? 'swish://payment?data=%7B%22version%22%3A1%2C%22payee%22%3A%7B%22value%22%3A%20%221236130983%22%7D%2C%22amount%22%3A%7B%22value%22%3A' + totalToStr +'%7D%2C%22message%22%3A%7B%22value%22%3A%22skrubben.setIsGrateful%28true%29%22%7D%7D' : ''

        if(isMobile) {
            window.location = canSwish
            return
        }
        this.setState({ showLoader: true });
        this.swishAlert();
    }

    render() {


        let hiddenClass = this.props.totalSum === 0 ? 'hidden-bar' : 'shown-bar'

        return(
            <div className={"status-flex " + hiddenClass}>
                <div className="sum-status">
                    <div className="tot-total">Total</div>

                    <div className="tot-amount">
                        <div className="tot-sum">{this.props.totalSum}</div>
                        <div className="tot-sek">kr</div>
                    </div>


                </div>
                <a onClick={this.props.reset} className="reset-btn">Reset</a>
                <a onClick={this.onSwish} className="pay-btn-container">
                    <div className="pay-title">Pay with</div>
                    <img className="pay-img" src={payImg} alt=""/>
                </a>
                <SweetAlert
                    show={this.state.show}
                    title="device.hasSwish() -> False"
                    text="For the non-programmer, make sure you're using a phone/tablet and have Swish installed!"
                    onConfirm={() => this.setState({ show: false })}
                />
                <div className="loader-wrapper">
                    <Loader key={"ball-scale-ripple-multiple"} type={"ball-scale-ripple-multiple"} active={this.state.showLoader}/>
                </div>

            </div>
        )
    }

}