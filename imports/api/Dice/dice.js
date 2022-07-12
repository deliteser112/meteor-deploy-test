import { Mongo } from 'meteor/mongo';

const diceCollection = Object.assign(new Mongo.Collection('dice'), {
  save({ did, name, image, action }) {
    const newDiceId = this.insert({
      did,
      name,
      image,
      action
    });

    return this.findOne(newDiceId);
  }
});

export { diceCollection as DiceCollection }
