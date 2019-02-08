import React, { Component } from 'react';
import Bot from './components/Bot';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      bots: [],
      name: '',
      attack: 0,
      hp: 0
    };

    this.deleteBot = this.deleteBot.bind(this);
    this.updateBot = this.updateBot.bind(this);
    this.setEdit = this.setEdit.bind(this);
  }

  handleName(val) {
    this.setState({
      name: val
    });
  }

  handleAttack(val) {
    this.setState({
      attack: val
    });
  }

  handleHp(val) {
    this.setState({
      hp: val
    });
  }

  componentDidMount() {
    axios.get('/api/bots').then(res => {
      console.log(res);
      this.setState({
        bots: res.data
      });
    });
  }

  createBot(name, attack, hp) {
    axios.post('/api/bot', { name, attack, hp }).then(res => {
      this.setState({
        bots: res.data,
        name: '',
        attack: 0,
        hp: 0
      });
    });
  }

  deleteBot(id) {
    axios.delete(`/api/bot/${id}`).then(res => {
      this.setState({
        bots: res.data
      });
    });
  }

  setEdit(name, attack, hp) {
    this.setState({
      name,
      attack,
      hp
    });
  }

  updateBot(id) {
    const { name, attack, hp } = this.state;
    axios.put(`/api/bot/${id}`, { name, attack, hp }).then(res => {
      this.setState({
        bots: res.data,
        name: '',
        attack: 0,
        hp: 0
      });
    });
  }

  render() {
    const { name, attack, hp } = this.state;
    const mappedBots = this.state.bots.map(bot => {
      return (
        <Bot
          key={bot.id}
          bot={bot}
          deleteBot={this.deleteBot}
          updateBot={this.updateBot}
          setEdit={this.setEdit}
        />
      );
    });
    return (
      <div className="App">
        <h1>Battle Bots Builder</h1>
        <input
          type="text"
          placeholder="Enter Bot Name"
          onChange={e => this.handleName(e.target.value)}
          value={this.state.name}
        />
        <input
          type="text"
          placeholder="Attack"
          onChange={e => this.handleAttack(e.target.value)}
          value={this.state.attack}
        />
        <input
          type="text"
          placeholder="HP"
          onChange={e => this.handleHp(e.target.value)}
          value={this.state.hp}
        />
        <button onClick={() => this.createBot(name, attack, hp)}>Build</button>

        {mappedBots}
      </div>
    );
  }
}

export default App;
