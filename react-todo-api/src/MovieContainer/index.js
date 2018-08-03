import React, { Component } from "react";
import Movies from "../Movies/";
import CreateMovie from "../CreateMovie/";
import EditMovie from "../EditMovie/";


class MovieContainer extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            showEdit: false,
            editMovieId: null,
            movieToEdit :{
                title: "",
                description: ""
            }
        }
    }

    componentDidMount() {
        // This is where you want to fetch data when you want data to exist at the beginning of your app.
        this.getMovies().then((movies) => {
            this.setState({
                movies: movies.data
            })
        }).catch((err) => {
            console.log(err)
        });
    }

    getMovies = async () => {
        const movies = await fetch("http://localhost:9000/api/v1/movies", {
            credentials: "include",
            method: "GET"
        });
        const parsedMovies = movies.json();
        return parsedMovies
    }

    addMovie = async (movie, e) => {
        e.preventDefault();
        try {
            const createMovie = await fetch("http://localhost:9000/api/v1/movies", {
                method: "post",
                credentials: "include",
                body: JSON.stringify(movie),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const parsedResponse = await createMovie.json();
            // Spread syntax
            // Advisory: console.log(); things for debugging.
            this.setState({movies: [...this.state.movies, parsedResponse.data]})
            console.log(this.state);
        } catch (err) {
            console.log(err);
        }
    }

    deleteMovie = async (id, e) => {
        e.preventDefault();
        console.log("deleteMovie function is being called, this is the id:", id);
        try {
            const deleteMovie = await fetch("http://localhost:9000/api/v1/movies/" + id, {
                credentials: "include",
                method: "DELETE"
            });
            const parsedResponse = await deleteMovie.json();
            this.setState({movies: this.state.movies.filter((movie, i) => {
                return movie._id !== id
            })});
        } catch (err) {
            console.log(err);
        }
    }

    showModal = (id) => {
        // Find method returns the object atht meets the condition. Our movieToEdit variable will contain the movie we want to edit (the actual object).
        const movieToEdit = this.state.movies.find((movie) => {
            movie._id === id
        });
        this.setState({
            showEdit: true,
            editMovieId: id,
            movieToEdit: {movieToEdit}
        });
    }

    closeAndEdit = async (e) => {
        try {
            e.preventDefault();
            const editMovie = await fetch("http://localhost:9000/api/v1/movies/" + this.state.editMovieId ,{
                credentials: "include",
                method: "PUT",
                body: JSON.stringify(this.state.movieToEdit),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const parsedResponse = await editMovie.json();
            const editedMovieArray = this.state.movies.map((movie) => {
                if (movie._id === this.state.editMovieId) {
                    movie.title = parsedResponse.data.title;
                    movie.description = parsedResponse.data.description;
                } else {
                    console.log("Failure to update.");
                }
                return movie
            });
            this.setState({
                movies: editedMovieArray,
                showEdit: false
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleFormChange = (e) => {
        this.setState({
            movieToEdit: {
                 // Spread operator
                ...this.state.movieToEdit,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <div>
                This is the movie container
                <Movies movies={this.state.movies} deleteMovie={this.deleteMovie} showModal={this.showModal} />
                <CreateMovie addMovie={this.addMovie} />
                {this.state.showEdit ? <EditMovie closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} movieToEdit={this.state.movieToEdit} /> : null}
            </div>
        )
    }
}


export default MovieContainer;