import { Mongo } from 'meteor/mongo';

const deviceCollection = Object.assign(new Mongo.Collection('devices'), {
  save({ mac, name }) {
    const newDeviceId = this.insert({
      mac,
      name,
    });

    return this.findOne(newDeviceId);
  }
});

export { deviceCollection as DeviceCollection }
