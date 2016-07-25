// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

//import {ipcRenderer} from 'electron';

// Import Search Component
import Header from '../components/Header';

// Import Details Component
import Commandlets from '../components/Commandlets';

// Import Details Component
import Footer from '../components/Footer';

// Import Details Component
import CmdLet from '../components/CmdLet';

// Import Details Component
import CallInfo from '../components/CallInfo';

const {ipcRenderer} = window.require('electron');

// Component Class
export default class Index extends React.Component {

    constructor(props) {
        super(props);

        const {CmdLets} = require('../../config/CmdLetConfig.json');

        //const {ipcRenderer} = require('electron');

        const titles = Object.keys(CmdLets);//.map(item => item.name);

        //const cmdLetInstances = CmdLets.map((item, i) => <CmdLet key={i} title={item.name} onInfoOpen={this.onInfoOpen.bind(this, item.name)}/>);

        const cmdLetInstances = titles.map((item, i) => <CmdLet key={i} title={item} onInfoOpen={this.onInfoOpen.bind(this, item)}/>);

        this.state = {
            command: 'Hello!',
            isGenerateHidden: true,
            deployment: '',
            list: cmdLetInstances,
            listSelectedTitles: [],
            title: 'IshDeploy Sandbox'
        };
    }


    onInfoOpen(itemTitle)
    {
        this.state.listSelectedTitles.push(itemTitle)

        this.setState({listSelectedTitles: this.state.listSelectedTitles})
    }

    onRemoveSelection(itemTitle)
    {
        let list = this.state.listSelectedTitles;

        let i = list.indexOf(itemTitle);
        if(i > -1) {
            list.splice(i, 1);
        }

        this.setState({listSelectedTitles: list})
    }    

    getTitle()
    {
        return this.state.title;
    }

    onGenerateClick(deploymentName)
    {
        this.setState({
            isGenerateHidden : false
        })
    }

    handleDeploymentChange(deploymentName)
    {
        this.setState({
            deployment: deploymentName
        })
    }

    onInfoClose()
    {
        this.setState({
            isGenerateHidden : true
        })
    }    

    onInfoDownload(psContent)
    {
        ipcRenderer.send('powershell-script-save', psContent);
    }        
  
    render() {
        return (
          <div>
            <CallInfo
                userName="testUser"
                computerName="WIN-BCMCO6U3OI4" 
                onSubmit={this.onInfoClose.bind(this)}
                onSave={this.onInfoDownload.bind(this)}
                isHidden={this.state.isGenerateHidden} deployment={this.state.deployment} list={this.state.listSelectedTitles}/>
            <Header title={this.state.title}/>
            <Commandlets list={this.state.list} listSelected={this.state.listSelectedTitles} onRemoveSelection={this.onRemoveSelection.bind(this)}/>
            <Footer onChange={this.handleDeploymentChange.bind(this)} onGenerate={this.onGenerateClick.bind(this)}/>
          </div>
        );
    }
}