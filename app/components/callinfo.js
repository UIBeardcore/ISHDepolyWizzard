// ES6 Component

// Import React
import React from 'react';

// Import CodeMirror
import PSEditor from './pseditor';

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

     getGeneratedCode() {
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

    handleSave(event) {
        event.preventDefault();

        this.props.onSave(this.state.code);
    }        

    updateCode(newCode) 
    {
        this.setState({
            code: newCode
        });
    }


    // UGLY UGLY UGLY CODE!
    // VERY UGLY
    componentWillReceiveProps(nextProps) {
        this.setState({
            code: this.getGeneratedCode()
        });
    }        

    render(){
        //const generatedCode = this.getGeneratedCode();
        return(
            <form className={"overlay" + (this.props.isHidden ? " hidden" : "")} onSubmit={this.handleSubmit.bind(this)}>
                <PSEditor value={this.state.code} onChange={this.updateCode.bind(this)} />
                <button type="submit" className="btn btn-info center-block pull-left">Close</button>
                <button type="button" className="btn btn-success center-block pull-right" onClick={this.handleSave.bind(this)}>Save</button>
            </form>
        )
    }
}