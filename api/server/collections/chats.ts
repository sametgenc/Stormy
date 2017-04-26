import { MongoObservable } from 'meteor-rxjs';
import { Chat } from '../models';
import { Messages } from './messages';

export const Chats = new MongoObservable.Collection<Chat>('chats');//MongoDB bağlantısı

//Kullanılmayan iletileri imha edin
Chats.collection.after.remove(function (userId, doc) {
  Messages.collection.remove({ chatId: doc._id });
});
