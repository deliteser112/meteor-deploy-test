import { DeviceCollection } from './devices';
import deviceSchema from './devices.graphql';

export default {
  Query: {
    async getDevices( obj, args, context ) {
      return DeviceCollection.find({}).fetch();
    },
    async getDevice( obj, { id } ) {
      return DeviceCollection.findOne(id);
    }
  },

  Mutation: {
    async createDevice( obj, { mac, name }, context ) {
      console.log(mac, name);
      return DeviceCollection.save({ mac, name });
    }
  }
};
