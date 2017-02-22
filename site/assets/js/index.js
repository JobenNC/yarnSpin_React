/*
// Tutorial code
import 'whatwg-fetch'
var React = require('react')
var ReactDOM = require('react-dom')

var Hello = React.createClass ({
    render: function() {
        return (
            <h1>
            Hello, React!
            </h1>
        )
    }
})

ReactDOM.render(<Hello />, document.getElementById('container'))
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import css from './index.css';

console.log("Loaded first")

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
