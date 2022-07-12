import { ActionsCollection } from './actions';
import actionSchema from './actions.graphql';

export default {
  Query: {
    async getActions( obj, args, context ) {
      //console.log(context);
      return ActionsCollection.find({}).fetch();
    },
    async getAction( obj, { id } ) {
      return ActionsCollection.findOne(id);
    }
  },

  Mutation: {
    async createAction( obj, { name, resolve }, context ) {
      return ActionsCollection.save({ name, resolve });
    },
    async deleteAction( obj, { id }, context ) {
      return ActionsCollection.delete({ id });
    }
  }
};
