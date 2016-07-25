// ES6 Component

// Import React
import React from 'react';

export default class Header extends React.Component {

    // Render
    render(){
        return(
            <header className="container">
                <h3>{this.props.title}</h3>
            </header>
        )
    }
}