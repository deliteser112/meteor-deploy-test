import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { createDice } from './mutations/Dice.gql';

class DiceForm extends Component {
  state = {
    error: null
  }

  submitForm = e => {
    e.preventDefault();

    this.setState({ error: null })

    this.props.createDice({
      variables: {
        did: this.did.value,
        name: this.name.value
      }
    }).catch( error => {
      if(!error) {
        this.props.client.resetStore()
      };
      this.setState({ error: error })
    });
  };

  render() {
    return (
      <div className="form-control">
        <input type="text" className="form-control mb-3" ref={input => (this.did = input)}/>
        <input type="text" className="form-control mb-3" ref={input => (this.name = input)}/>
        <button className="btn btn-primary" onClick={this.submitForm}>Create</button>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

export default graphql(createDice, {
  name: "createDice",
  options: {
    refetchQueries: ["getDice"]
  }
})(DiceForm)
