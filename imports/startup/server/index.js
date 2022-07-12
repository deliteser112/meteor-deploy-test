import { Meteor } from 'meteor/meteor';
import { startApolloServer } from './apollo';

try {
  startApolloServer().then();
} catch (e) {
  console.error(e.reason);
}

Meteor.startup(() => {

});
