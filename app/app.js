// ES6 Component
// Import React and ReactDOM

import React from 'react';
import ReactDOM from 'react-dom';

// Import Details Component
import Index from './containers/Index';

// Component Class
class App extends React.Component {

    // render method is most important
    // render method returns JSX template
    render() {
        return (
          <Index />
        );
    }
}

// Render to ID content in the DOM
ReactDOM.render(
    <App/ > ,
    document.getElementById('content')
);