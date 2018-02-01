/**
 * Created by danielghandahari on 2018-01-24.
 *
 *  Inspired by LevelUpTuts: https://www.youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg
 *
 */
import React, { Component } from 'react';
import { StatusBar } from './StatusBar'


export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchField: '',
            totalSum: 0,
            dummyList: [{id: 0, name: "Coca-cola", price: 7}, {id: 1, name: "Haribo", price: 11}, {id: 2, name: "Pepsi", price: 7}, {id: 3, name: "Hockey Pulver", price: 999}, {id: 4, name: "Kaffe",  price: 0}
                , {id: 5, name: "Nocco", price: 33}, {id: 6, name: "Powerking", price: 1337}, {id: 7, name: "Delicatobollar", price: 10}, {id: 8, name: "Kebab", price: 70}, {id: 9, name: "Baklava", price: 50}, {id: 10, name: "Fanta", price: 7}
                , {id: 11, name: "Sprite", price: 7}, {id: 12, name: "Surisar", price: 2}, {id: 13, name: "Remmar", price: 1}, {id: 14, name: "Pärlboll", price: 10}, {id: 15, name: "IT-tröja", price: 100}, {id: 16, name: "IT-kopp", price: 100}, {id: 17, name: "Te", price: 100}],
            itemQuant: []
        }

    }

    componentDidMount()
    {
        this.setState({
            itemQuant: Array.from(new Array(this.state.dummyList.length),() => 0)
        });
    }

    updateField(e) {
        this.setState({
            searchField: e.target.value.substr(0, 20)
        });
    }


    onMinus = (event, elem) => {

        // not allowing negative amount of items
        if(this.state.itemQuant[elem.id] === 0) {
            return
        }

        event.preventDefault()

        const newItemQuantites = this.state.itemQuant
        newItemQuantites[elem.id]--

        this.setState({
            itemQuant: newItemQuantites,
            totalSum: this.state.totalSum - elem.price
        });
    }

    onPlus = (event, elem) => {
        event.preventDefault()

        const newItemQuantites = this.state.itemQuant
        newItemQuantites[elem.id]++

        this.setState({
            itemQuant: newItemQuantites,
            totalSum: this.state.totalSum + elem.price
        });
    }

    render() {

        let dummyListFiltered = this.state.dummyList.filter(
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
                       placeholder={"e.g. Coca-cola, Haribo, Binary search tree, Pärlboll"}
                />
                <ul>

                    {
                        dummyListFiltered.map((elem) => {
                            return <div className="items-flex">

                                    <div className="items-flex-item item-info-container">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png" alt=""/>
                                        <li className="item-info">{elem.name + ": " + elem.price + "kr"}</li>
                                    </div>
                                    <div className="items-flex-item quantity-holder">
                                        <button onClick={(event) => { this.onMinus(event, elem)}}>-</button>
                                        <input type="number" value={this.state.itemQuant[elem.id]}/>
                                        <button onClick={(event) => { this.onPlus(event, elem)}}>+</button>
                                    </div>

                                </div>
                        })
                    }
                </ul>
                <StatusBar totalSum={this.state.totalSum}/>
            </div>
        );
    }
}