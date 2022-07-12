import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { createRoll } from './mutations/Rolls.gql';

class RollForm extends Component {
  state = {
    error: null
  }

  submitForm = e => {
    e.preventDefault();

    this.setState({ error: null })

    this.props.createRoll({
      variables: {
        device: this.device.value,
        dice: this.dice.value
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
        <input type="text" className="form-control" ref={input => (this.device = input)}/>
        <input type="text" className="form-control" ref={input => (this.dice = input)}/>
        <button className="btn btn-primary" onClick={this.submitForm}>Create</button>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

export default graphql(createRoll, {
  name: "createRoll",
  options: {
    refetchQueries: ["getRolls"]
  }
})(RollForm)
