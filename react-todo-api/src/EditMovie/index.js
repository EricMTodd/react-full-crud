import React, { Component } from "react";


const EditMovie = (props) => {
    return (
        <div>
            <h4>Edit Movie</h4>
            <form onSubmit={props.closeAndEdit}>
                <label>
                    Edit Movie Title:
                    <input type="text" name="title" onChange={props.handleFormChange} value={props.movieToEdit.title} />
                </label>
                <label>
                    Edit Movie Description:
                    <input type="text" name="description" onChange={props.handleFormChange} value={props.movieToEdit.description} />
                </label>
                <input type="submit" value="Edit Movie" />
            </form>
        </div>
    )
};


export default EditMovie;