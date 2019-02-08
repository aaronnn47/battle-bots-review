import React, { Component } from 'react';

class Bot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  edit() {
    const { bot } = this.props;
    this.setState({
      editing: true
    });
    this.props.setEdit(bot.name, bot.attack, bot.hp);
  }

  updateBot(id) {
    this.props.updateBot(id);

    this.setState({
      editing: false
    });
  }

  render() {
    const { bot, deleteBot } = this.props;
    return (
      <div>
        <h3>{bot.name}</h3>
        <p>Attack: {bot.attack}</p>
        <p>HP: {bot.hp}</p>
        <button onClick={() => deleteBot(bot.id)}>Delete</button>
        {this.state.editing ? (
          <button onClick={() => this.updateBot(bot.id)}>Save</button>
        ) : (
          <button onClick={() => this.edit()}>Upgrade</button>
        )}
      </div>
    );
  }
}

export default Bot;
