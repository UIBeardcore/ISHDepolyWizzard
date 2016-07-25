// ES6 Component

// Import React
import React from 'react';

// Create Search component class
export default class Commandlets extends React.Component{

    handleClick(title) {
        this.props.onRemoveSelection(title);        
    }

     render() {

        const liStyle = {
            margin: "10px"
        }

        const li2Style = {
            margin: "3px"
        }

        const subButtonStyle = {
            bottom: "60px",
            width: "100%",
            position: "absolute"
        }    

        return (
            <div className="container-fluid">
                <div className="row">
                    <ul className="list-unstyled">
                        {this.props.list.map((listValue, i) => 
                            <li key={i} style={liStyle}>{listValue}</li>
                        )}
                    </ul>   
                </div>
                <div className="row bg-success" style={subButtonStyle}>
                    <ul className="list-inline col-md">
                        {this.props.listSelected.map((title, i) => 
                            <li key={i} style={li2Style}><button onClick={this.handleClick.bind(this, title)} className="btn btn-default btn-xs">{title}</button></li>
                        )}
                    </ul> 
                </div>
            </div>
        );
    }
}