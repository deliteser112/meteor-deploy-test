import { DiceCollection } from './dice';
import diceSchema from './dice.graphql';

export default {
  Query: {
    async getDice( obj, args, context ) {
      //console.log(context);
      return DiceCollection.find({}).fetch();
    },
    async getDie( obj, { id } ) {
      return DiceCollection.findOne(id);
    }
  },

  Mutation: {
    async createDice( obj, { did, name }, context ) {
      return DiceCollection.save({ did, name });
    }
  }
};
