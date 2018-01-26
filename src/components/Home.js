/**
 * Created by danielghandahari on 2018-01-24.
 *
 *  Inspired by LevelUpTuts: https://www.youtube.com/channel/UCyU5wkjgQYGRB0hIHMwm2Sg
 *
 */
import React, { Component } from 'react';

export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchField: ''
        }
    }

    updateField(e) {
        this.setState({
            searchField: e.target.value.substr(0, 20)
        });
    }

    render() {
        let dummyList = [{name: "Coca-cola"}, {name: "Haribo"}, {name: "Pepsi"}, {name: "Hockey Pulver"}, {name: "Kaffe"}
            , {name: "Nocco"}, {name: "Powerking"}, {name: "Delicatobollar"}, {name: "Kebab"}, {name: "Baklava"}, {name: "Fanta"}
            , {name: "Sprite"}, {name: "Surisar"}, {name: "Remmar"}, {name: "Pärlboll"}, {name: "IT-tröja"}, {name: "IT-kopp"}, {name: "Te"}];
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
                            return <li style={{'text-align': 'center', 'list-style': 'none'}}>{elem.name}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}