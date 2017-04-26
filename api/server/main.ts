import { Meteor } from 'meteor/meteor';
import { Chats } from './collections/chats';
import { Messages } from './collections/messages';
import * as moment from 'moment';
import { MessageType, Picture } from './models';
import { Accounts } from 'meteor/accounts-base';
import { Users } from './collections/users';

Meteor.startup(() => {
  if (Meteor.settings) {
    Object.assign(Accounts._options, Meteor.settings['accounts-phone']);
    SMS.twilio = Meteor.settings['twilio'];//Verification kontrolünü burada SMS.twilio ile sağlıyoruz
  }
  
  if (Users.collection.find().count() > 0) {
    return;
  }

  let picture = importPictureFromUrl({
    name: 'man1.jpg',
    url: 'https://randomuser.me/api/portraits/men/17.jpg'
  });
 
  Accounts.createUserWithPhone({
    phone: '+972540000001',
    profile: {
      name: 'Ahmet Genç',
      pictureId: picture._id
    }
  });
 
  picture = importPictureFromUrl({
    name: 'woman1.jpg',
    url: 'https://randomuser.me/api/portraits/women/57.jpg'
  });
 
  Accounts.createUserWithPhone({
    phone: '+972540000002',
    profile: {
      name: 'Burak Kurt',
      pictureId: picture._id
    }
  });
 
  picture = importPictureFromUrl({
    name: 'woman2.jpg',
    url: 'https://randomuser.me/api/portraits/women/68.jpg'
  });
 
  Accounts.createUserWithPhone({
    phone: '+972540000003',
    profile: {
      name: 'Berkecan Kurt',
      pictureId: picture._id
    }
  });
 
  picture = importPictureFromUrl({
    name: 'woman3.jpg',
    url: 'https://randomuser.me/api/portraits/women/2.jpg'
  });
 
  Accounts.createUserWithPhone({
    phone: '+972540000004',
    profile: {
      name: 'Mehmet Genç',
      pictureId: picture._id
    }
  });
 
  picture = importPictureFromUrl({
    name: 'deneme1.jpg',
    url: 'https://randomuser.me/api/portraits/lego/6.jpg'
  });
 
  Accounts.createUserWithPhone({
    phone: '+972540000005',
    profile: {
      name: 'Deneme1',
      pictureId: picture._id
    }
  });
});
 //Burada denemeler için Url den fotoğraf seçtiğimizden bu fonksiyonuz yazdık
function importPictureFromUrl(options: { name: string, url: string }): Picture {
  const description = { name: options.name };
 
  return Meteor.call('ufsImportURL', options.url, description, 'pictures');
}