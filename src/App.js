import React, { Component } from 'react';
import { getEnemies } from './services/getEnemies';
import getTroops from './services/getTroops';
import postTroop from './services/postTroops';
import patchMinions from './services/patchMinions';
import deleteArmy from './services/deleteArmy';
import './styles/App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      armiesArray: [],
      defensesArray: [],
      newRecruit: ''
    }
    this.seeEnemies = this.seeEnemies.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  componentDidMount() {
    this.callTroops();
  }

  seeEnemies() {
   getEnemies().then(res => {
     this.setState({
       armiesArray: res
     })
   })
  }

  callTroops() {
    getTroops().then(res => {
      this.setState({
        defensesArray: res
      })
    })
  }

  recruitTroop(event, recruit) {
    event.preventDefault();
    if (recruit) {
      postTroop(recruit).then(res => {
        this.callTroops();
        this.setState({
          newRecruit: ''
        })
      })
     
    }
    
  }


  transformMinion(armyShortName, minionId) {
    patchMinions(armyShortName, minionId).then(res => {
      this.seeEnemies()
    })
  }

  slayLeader(shortname, id) {
    deleteArmy(shortname, id).then(res=> {
      this.seeEnemies()
    })
  }

  handleInput(e) {
    this.setState({
      newRecruit: e.target.value
    })
  }


  render() {

    const troops = this.state.defensesArray.map((troop, troopIndex) => {
      return (
        <li key={troopIndex} className="troop"> { troop.recruit } </li>
      )
    })

    const armies = this.state.armiesArray.map((army, armyIndex) => {
      return (
        <ul className='army' key={armyIndex}>
          <h3>Enemy Army #{army.id}: {army.name}</h3>
          <div 
          onClick={() => this.slayLeader(army.shortname, army.id)}
          className='leader'>{ army.leader }</div>
          <ul className='minions'>
            {
              army.minions.map((minion, minionIndex) => {
                return (
                  <li 
                  onClick={() => this.transformMinion(army.shortname, minion.id)}
                  className='minion' 
                  key={minionIndex}>{ minion.type }</li>
                )
              })
            }
          </ul> 
        </ul> 
      )
    })

    const message = this.state && this.state.armiesArray.length < 1 ? "ALL CLEAR" : "";

    return (
      <div className="App">

        {/* Main Defenses */}
        <div className="App-header">
          <h1>Enemies at our gate!</h1>
          <h2>Prepare our defenses!</h2>
          <div className="defenses">
            <div 
            onClick={this.seeEnemies}
            className="defense" id="sentry">Sentry<span className="instructions">Click here to see approaching enemies!</span></div>
            <div className="defense" id="captain">Captain<span className="instructions">Fill out Request Form below to recruit new troop!</span></div>
            <div className="defense" id="wizard">Wizard<span className="instructions">Click directly on a minion to cast a spell!</span></div>
            <div className="defense" id="ballista">Ballista<span className="instructions">Blast enemy leader to disperse army!</span></div>
          </div>
        </div>


        {/* Reinforcements */}
        <div className="reinforcements">
          <form type="submit">
            New Recruit Request Form:
            <input
            onChange={this.handleInput}
              value={this.state.newRecruit}
             id="paperwork" placeholder="Please indicate requested recruit"/>
            <button
            onClick={(e) => this.recruitTroop(e, this.state.newRecruit)}
              >Enlist!</button>
          </form>

          <div id="wall">
            <span></span><span id="gate"></span><span></span>
          </div>
        </div>

        <ul className="troops">
           { troops }
        </ul>

        <h1 id="message">{message}</h1>

        {/* Enemy Armies */}
        <div className="enemies">
          { armies }
        </div>
      </div>
    );
  }
}

export default App;
