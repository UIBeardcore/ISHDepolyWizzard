// ES6 Component

// Import React
import React from 'react';

export default class Footer extends React.Component {

    constructor(props) {
     super(props);

    }

    handleClick(event) {
        this.props.onClick(event);        
    }

    handleDeploymentChange(event) {

        let deployment = event.target.value.trim();
        if (!deployment) {
            return;
        }

        this.props.onChange(deployment); 
    }    

    handleSubmit(event) {
        event.preventDefault();
      
        this.props.onGenerate();
    }    

    render(){
        return(
            <footer className="container-fluid" onSubmit={this.handleSubmit.bind(this)} >
                <form className="row">
                    <div className="col-xs-5">
                        <input onChange={this.handleDeploymentChange.bind(this)} type="text" className="form-control pull-right" placeholder="ISHDeployment Name"/>
                    </div>
                    <div className="col-xs-5">
                        <button type="submit" className="btn btn-primary pull-left">Generate</button>
                    </div>
                </form>
            </footer>            
        )
    }
}