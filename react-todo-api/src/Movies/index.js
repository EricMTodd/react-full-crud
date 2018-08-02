import React, { Component } from "react";


const MoviesList = (props) => {
    const moviesList = props.movies.map((movie, index) => {
        return (
            <li key={movie._id}>
                <span>{movie.title}</span>
                <small>{movie.description}</small>
                <button onClick={props.deleteMovie.bind(null, movie._id)}>Delete</button>
                <button onClick={props.showModal.bind(null, movie._id)}>Edit</button>
            </li>
        )
    })
    return (
        <div>
            <ul>
                {moviesList}
            </ul>
        </div>
    )
}


export default MoviesList;