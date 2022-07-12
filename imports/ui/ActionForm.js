import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import { createAction } from './mutations/Actions.gql';
import { deleteAction } from './mutations/deleteAction.gql';

class ActionForm extends Component {
  state = {
    error: null
  }

  submitForm = e => {
    e.preventDefault();

    this.setState({ error: null })

    this.props.createAction({
      variables: {
        name: this.name.value,
        resolve: this.resolve.value
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
        <input type="text" className="form-control mb-3" ref={input => (this.name = input)}/>
        <input type="text" className="form-control mb-3" ref={input => (this.resolve = input)}/>
        <button className="btn btn-primary" onClick={this.submitForm}>Create</button>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

export default compose(
  graphql(createAction, {
    name: "createAction",
    options: {
      refetchQueries: ["getActions"]
    }
  }),
  graphql(deleteAction, {
    name: "deleteAction",
    options: {
      refetchQueries: ["getActions"]
    }
  })
)(ActionForm)
