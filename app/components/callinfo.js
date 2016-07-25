// ES6 Component

// Import React
import React from 'react';

// Import CodeMirror
import Codemirror from 'react-codemirror';

require('codemirror/mode/powershell/powershell');

export default class CallInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: ''
        };
    }

    getListCommandlets() {
         return this.props.list.map(x => {
            return `
    ${x} -ISHDeployment "${this.props.deployment}"`}).join("\r\n")

    }

     getGeneratedCode(userName, computerName) {
         return `try
{
    $userId = "${this.props.userName}"
    $session = New-PSSession -ComputerName "${this.props.computerName}"
    Import-Module -Name ISHDeploy.12.0.0 -PSSession $session

    ${this.getListCommandlets()}
}
catch
{
}
finally 
{
    Remove-Module -Name ISHDeploy.12.0.0
    Remove-PSSession $session
}
     `;
   }


    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit();
    }    

    updateCode(newCode) 
    {
        this.setState({
            code: newCode
        });
    }

    render(){

        const options = {
            //lineNumbers: true,
            height: "500px",
            mode:  "powershell"
        };

        return(
            <form className={"overlay" + (this.props.isHidden ? " hidden" : "")} onSubmit={this.handleSubmit.bind(this)}>
                <Codemirror value={this.getGeneratedCode()} onChange={this.updateCode} options={options} />
                <button type="submit" className="btn btn-info center-block">Close</button>
            </form>
        )
    }
}