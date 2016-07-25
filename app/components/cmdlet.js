// ES6 Component

// Import React
import React from 'react';

// Create Search component class
export default class Cmdlet extends React.Component{

    handleOpenInfo(event) {
        this.props.onInfoOpen(event);       
    }

    getTitle() {
        return this.props.title;       
    }

    render() {
        return (
            <button key={this.props.key} onClick={this.handleOpenInfo.bind(this)} className="btn btn-default">{this.props.title}</button>
        );
    }
}