import { Mongo } from 'meteor/mongo';

const actionsCollection = Object.assign(new Mongo.Collection('actions'), {
  save({ name, resolve }) {
    const newActionsId = this.insert({
      name,
      resolve
    });

    return this.findOne(newActionsId);
  },
  delete({ id }) {
    const removedAction = this.findOne(newActionsId);

    this.remove({ id });

    return removedAction;
  }
});

export { actionsCollection as ActionsCollection }
