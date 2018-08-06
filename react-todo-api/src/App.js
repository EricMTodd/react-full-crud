import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieContainer from "./MovieContainer/";
import Login from "./Login/"
import { Route, Switch } from "react-router-dom";
import Header from "./Header"

const My404 = () => {
  return(
    <div>
      You're Lost Buddy
    </div>
  )
}

const App = () => {
  return (
    <main>
    <Header />
      <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/movies" component={ MovieContainer } />
      <Route component={My404} /> 
      </Switch>
    </main>
  )
}

export default App;