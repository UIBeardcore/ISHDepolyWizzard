// ES6 Component

// Import React
import React from 'react';

// Import CodeMirror
import Codemirror from 'react-codemirror';

require('codemirror/mode/powershell/powershell');

export default class PSEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: this.props.value
        };
    }

    // UGLY UGLY UGLY CODE!
    // VERY UGLY
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.value !== this.state.code) {
            this.setState({ code: nextProps.value });
        }
    }    

    updateCode(newCode) 
    {  
        this.setState({
            code: newCode
        });

        this.props.onChange(this.state.code)
    }

    render(){

        const options = {
            //lineNumbers: true,
            height: "500px",
            mode:  "powershell"
        };
        
        return(
            <Codemirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
        )
    }
}