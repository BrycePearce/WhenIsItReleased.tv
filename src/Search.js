import React from 'react';
import { render } from 'react-dom';
//import our list
import ResultList from './ResultList';
import Logo from './static/logo.png'
import Key from './Key';
import { Router, Route, Link } from 'react-router'

//Add in our components
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.focus = this.focus.bind(this); //or this
        this.state = {
            //initialize (it is initialized to an empty array because things that depend on this.state.myList expect it to be an array)
            myList: []
        }
    }

    focus() {
        //focus the input specified in the onclick={this.focus}
        this.textInput.focus();
    }

    //need to add query
    searchResults() {
        console.log("you hit searchResults, your query = " + this.textInput.value);
        var input = this.textInput.value;
        var empty = [];
        //don't query the first few characters (api limits to 40 characters per 10sec)
        if (input.length > 2) {
            var posterQuery = 'http://api.themoviedb.org/3/search/movie?query=';

            //do our api call for the list of results
            fetch(posterQuery + input + `&api_key=${Key}` + '&append_to_response=images')
                .then((response) => {
                    response.json().then((json) => {
                        //set the state variable 'myList' to the 'results' array of our data
                        //when React sees the state change it will call 'render()' again and redraw things that need to be changed based on the new data
                        //document.body.style.background = "https://image.tmdb.org/t/p/w500" + json.results[0].poster_path;
                        this.setState({ myList: json.results })
                    });
                });
        } if (this.textInput.value == '') {
            this.setState({ myList: empty });
        }
    }

    render() {
        return (
            <div id="container">
                <h1>Pick a movie any movie</h1>
                <div id="movie-searchBox">
                    <input
                        type="text"
                        placeholder="Enter a movie"
                        ref={(input) => { this.textInput = input; } }
                        onChange={this.searchResults.bind(this)} /> {/*query results onChange in input*/}
                </div>
                <img id="poster" />
                <div id="date" /> 
                <div id="description"> </div>
                <div className="result-list"> <ResultList list={this.state.myList} /> </div>
            </div>
        )
    }
}
export default Search;