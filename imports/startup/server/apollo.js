import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import merge from 'lodash/merge';

import { ActionsCollection } from '../../api/Actions/actions';
import ActionSchema from '../../api/Actions/actions.graphql';
import ActionResolvers from '../../api/Actions/resolvers';

import { DeviceCollection } from '../../api/Devices/devices';
import DeviceSchema from '../../api/Devices/devices.graphql';
import DeviceResolvers from '../../api/Devices/resolvers';

import { DiceCollection } from '../../api/Dice/dice';
import DiceSchema from '../../api/Dice/dice.graphql';
import DiceResolvers from '../../api/Dice/resolvers';

import { RollsCollection } from '../../api/Rolls/rolls';
import RollSchema from '../../api/Rolls/rolls.graphql';
import RollResolvers from '../../api/Rolls/resolvers';

import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';

const typeDefs = [
  UsersSchema,
  ActionSchema,
  DeviceSchema,
  DiceSchema,
  RollSchema
];//Remove when making actual changes, push again and again and again

const resolvers = merge(
  UsersResolvers,
  ActionResolvers,
  DeviceResolvers,
  DiceResolvers,
  RollResolvers
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

export async function startApolloServer() {
  await server.start();
  const app = WebApp.connectHandlers;

  server.applyMiddleware({
    app,
    cors: true
  });
}
