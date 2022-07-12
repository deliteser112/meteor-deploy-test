import { Mongo } from 'meteor/mongo';

const rollsCollection = Object.assign(new Mongo.Collection('rolls'), {
  save({ device, dice }) {
    const newRollsId = this.insert({
      device,
      dice,
      createdAt: new Date(),
    });

    return this.findOne(newRollsId);
  }
});

export { rollsCollection as RollsCollection }
