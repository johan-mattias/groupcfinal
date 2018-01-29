/**
 * Created by danielghandahari on 2018-01-24.
 *
 *  Inspired by LevelUpTuts: https://www.youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg
 *
 */
import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import {Insert} from './Insert';
import { StatusBar } from './StatusBar'


export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchField: '',
            totalSum: 0
        }
    }

    updateField(e) {
        this.setState({
            searchField: e.target.value.substr(0, 20)
        });
    }

    onChangeAmount = (number, value, price) => {
        //TODO: implement logic!
        console.log("-----")
        console.log(number)
        console.log(price)
        console.log(value)
        console.log("-----")

        this.setState({
            totalSum: this.state.totalSum + price
        });

    }

    render() {
        let dummyList = [{name: "Coca-cola", price: 7}, {name: "Haribo", price: 11}, {name: "Pepsi", price: 7}, {name: "Hockey Pulver", price: 999}, {name: "Kaffe",  price: 0}
            , {name: "Nocco", price: 33}, {name: "Powerking", price: 1337}, {name: "Delicatobollar", price: 10}, {name: "Kebab", price: 70}, {name: "Baklava", price: 50}, {name: "Fanta", price: 7}
            , {name: "Sprite", price: 7}, {name: "Surisar", price: 2}, {name: "Remmar", price: 1}, {name: "Pärlboll", price: 10}, {name: "IT-tröja", price: 100}, {name: "IT-kopp"}, {name: "Te"}];
        let dummyListFiltered = dummyList.filter(
            (elem) => {
                return elem.name.toLowerCase().indexOf(
                    this.state.searchField.toLowerCase()) !== -1;
            }
        );
        return(
            <div>
                <input className="search-bar" type="text"
                       value={this.state.searchField}
                       onChange={this.updateField.bind(this)}
                />
                <ul>
                    {
                        dummyListFiltered.map((elem) => {
                            return <div>
                                <NumericInput min={0} onChange={(number, value) => this.onChangeAmount(number, value, elem.price)} mobile/>

                                <li style={{'text-align': 'center', 'list-style': 'none'}}>{elem.name + ": " + elem.price + "kr"}</li>
                                </div>
                        })
                    }
                </ul>
                {/*<Insert/>*/}
                <StatusBar totalSum={this.state.totalSum}/>
            </div>
        );
    }
}