import { RollsCollection } from './rolls';
import rollSchema from './rolls.graphql';

export default {
  Query: {
    async getRolls( obj, args, context ) {
      //console.log(context);
      return RollsCollection.find({}).fetch();
    },
    async getRoll( obj, { id } ) {
      return RollsCollection.findOne(id);
    }
  },

  Mutation: {
    async createRoll( obj, { device, dice }, context ) {
      return RollsCollection.save({ device, dice });
    }
  }
};
