import React, { Component } from "react";


class CreateMovie extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: ""
        }
    }
    updateMovie = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        return (
            <form onSubmit={this.props.addMovie.bind(null, this.state)}>
                <label>
                    Movie:
                    <input type="text" name="title" onChange={this.updateMovie} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" onChange={this.updateMovie} />
                </label>
                <input type="Submit" value="Create Movie" />
            </form>
        )
    }
}


export default CreateMovie;