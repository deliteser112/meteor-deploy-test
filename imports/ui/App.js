import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from 'react-apollo';
import { compose } from "recompose";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import ActionForm from "./ActionForm";
import DeviceForm from "./DeviceForm";
import DiceForm from "./DiceForm";
import RollForm from "./RollForm";

import { getActions } from './queries/Actions.gql';
import { getDevices } from './queries/Devices.gql';
import { getDice } from './queries/Dice.gql';
import { getRolls } from './queries/Rolls.gql';
import { getUser } from './queries/User.gql';

function AppWraper(props) {
  const [isLogin, setIsLogin] = useState(true);

  if (
    props.getDevices.loading ||
    props.getActions.loading ||
    props.getDice.loading ||
    props.getRolls.loading ||
    props.getUser.loading
  ) return <h1>Loading</h1>;

  return (
    <div className="container">
      {/* <h1>iDie</h1> */}
      { props.getUser.user._id ? (
        <div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-outline-danger" onClick={() => {
              Meteor.logout();
              props.client.resetStore();
            }}>Logout</button>
          </div>

          {/* devices */}
          <div className="row">
            <h2 className="mt-3">Devices</h2>
            <div className="col-md-5"><DeviceForm /></div>
            <div className="col-md-7">
              <ul className="list-group">
                {props.getDevices.getDevices.map(device => (
                  <li className="list-group-item" key={device._id}>{device.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          {/* dices */}
          <div className="row">
            <h2 className="mt-3">Dice</h2>
            <div className="col-md-5"><DiceForm /></div>
            <div className="col-md-7">
              <ul className="list-group">
                {props.getDice.getDice.map(dice => (
                  <li className="list-group-item" key={dice._id}>{dice.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          {/* actions */}
          <div className="row">
            <h2 className="mt-3">Actions</h2>
            <div className="col-md-5"><ActionForm /></div>
            <div className="col-md-7">
              <ul className="list-group">
                {props.getActions.getActions.map(action => (
                  <li className="list-group-item" key={action._id}>{action.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          {/* rolls */}
          <div className="row">
            <h2 className="mt-3">Rolls</h2>
            <div className="col-md-5"><RollForm /></div>
            <div className="col-md-7">
              <ul className="list-group">
                {props.getRolls.getRolls.map(roll => (
                  <li className="list-group-item" key={roll._id}>{roll.device}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isLogin ? <LoginForm client={props.client} onSetLogin={(loginStatus) => setIsLogin(loginStatus)} /> : <RegisterForm client={props.client} onSetLogin={(loginStatus) => setIsLogin(loginStatus)} />}
        </div>
      )}
    </div>
  )
};

export default compose(
  withApollo,
  graphql(getActions, {
    name: "getActions",
  }),
  graphql(getDevices, {
    name: "getDevices",
  }),
  graphql(getDice, {
    name: "getDice",
  }),
  graphql(getRolls, {
    name: "getRolls",
  }),
  graphql(getUser, {
    name: "getUser",
  }),
)(AppWraper);
