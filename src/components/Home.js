/**
 * Created by danielghandahari on 2018-01-24.
 *
 *  Inspired by LevelUpTuts: https://www.youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg
 *
 */
import React, { Component } from 'react'
import { StatusBar } from './StatusBar'
import axios from 'axios'
import scrubitLogo from '../images/logo-thin.png'


export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchField: '',
            totalSum: 0,
            dummyList: [{id: 0, name: "Coca-cola", price: 7}, {id: 1, name: "Haribo", price: 11}, {id: 2, name: "Pepsi", price: 7}, {id: 3, name: "Hockey Pulver", price: 999}, {id: 4, name: "Kaffe",  price: 0}
                , {id: 5, name: "Nocco", price: 33}, {id: 6, name: "Powerking", price: 1337}, {id: 7, name: "Delicatobollar", price: 10}, {id: 8, name: "Kebab", price: 70}, {id: 9, name: "Baklava", price: 50}, {id: 10, name: "Fanta", price: 7}
                , {id: 11, name: "Sprite", price: 7}, {id: 12, name: "Surisar", price: 2}, {id: 13, name: "Remmar", price: 1}, {id: 14, name: "Pärlboll", price: 10}, {id: 15, name: "IT-tröja", price: 100}, {id: 16, name: "IT-kopp", price: 100}, {id: 17, name: "Te", price: 100}],
            itemQuant: [],
            items: [],
            barIsHidden: true
        }

    }


    componentDidMount()
    {
        // http://scrubit.herokuapp.com/api/get-all
        axios.get('/api/get-all')
        .then((response) => {


            response.data.map((data, index) => {

                data.indexId = index

                this.setState({
                    items: this.state.items.concat(data),
                    itemQuant: this.state.itemQuant.concat(0)
                });

            });


        })
        .catch(function (error) {
            console.log(error);
        });

    }

    updateField(e) {
        this.setState({
            searchField: e.target.value.substr(0, 20)
        });
    }


    onMinus = (event, elem) => {

        // not allowing negative amount of items
        if(this.state.itemQuant[elem.indexId] === 0) {
            return
        }

        event.preventDefault()

        const newItemQuantites = this.state.itemQuant
        newItemQuantites[elem.indexId]--

        const newTotSum = this.state.totalSum - elem.price

        this.setState({
            itemQuant: newItemQuantites,
            totalSum: newTotSum
        });

        console.log(newTotSum)
        if(newTotSum === 0) {
            this.setState({
                barIsHidden: true
            });
        }
    }

    onPlus = (event, elem) => {
        event.preventDefault()

        if(this.state.totalSum === 0) {
            this.setState({
                barIsHidden: false
            });
        }

        const newItemQuantites = this.state.itemQuant
        newItemQuantites[elem.indexId]++

        this.setState({
            itemQuant: newItemQuantites,
            totalSum: this.state.totalSum + elem.price
        });
    }

    render() {

/*        if(this.state.items.length === 0 && this.state.itemQuant.length === 0)
            return <div>Loading...</div>*/

        // TODO CHANGE LIST HERE, USE DUMMY LIST DEV MODE
        let itemsFiltered = this.state.items.filter(
            (elem) => {
                return elem.name.toLowerCase().indexOf(
                    this.state.searchField.toLowerCase()) !== -1;
            }
        );


        return(

            <div>
                <div className="fixed-nav">
                    <div className="top-container">
                        <input className="search-bar" type="text"
                               value={this.state.searchField}
                               onChange={this.updateField.bind(this)}
                               placeholder={"e.g. Haribo, Binary search tree..."}
                        />
                        <img id="main-logo" src={scrubitLogo} alt=""/>
                    </div>
                </div>


                <div className="items-list">

                    {
                        itemsFiltered.map((elem) => {
                            return <div key={elem.indexId} className="items-flex">

                                    <div className="items-flex-item item-info-container">
                                        {/*src='https://dummyimage.com/100x100/000/fff.png'*/}
                                        <img src={elem.url} alt=""/>
                                        <li className="item-info">{elem.name}</li>
                                    </div>
                                    <div className="items-flex-item item-price">{elem.price + ' kr'}</div>
                                    <div className="items-flex-item quantity-holder">
                                        <button className="minus-btn" onClick={(event) => { this.onMinus(event, elem)}}>–</button>
                                        <div>{this.state.itemQuant[elem.indexId]}</div>
                                        <button className="plus-btn" onClick={(event) => { this.onPlus(event, elem)}}>+</button>
                                    </div>

                                </div>
                        })
                    }
                </div>
                <StatusBar isHidden={this.state.barIsHidden} totalSum={this.state.totalSum}/>
            </div>

        );
    }
}












