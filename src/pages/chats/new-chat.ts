import { Component, OnInit } from '@angular/core';
import { Chats, Users, Pictures } from 'api/collections';
import { User } from 'api/models';
import { AlertController, ViewController } from 'ionic-angular';
import { MeteorObservable } from 'meteor-rxjs';
import { _ } from 'meteor/underscore';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
 
@Component({
  selector: 'new-chat',
  templateUrl: 'new-chat.html'
})

export class NewChatComponent implements OnInit {
  searchPattern: BehaviorSubject<any>;
  senderId: string;
  users: Observable<User[]>;
  usersSubscription: Subscription;
 
  constructor(
    private alertCtrl: AlertController,
    private viewCtrl: ViewController
  ) {
    this.senderId = Meteor.userId();
    this.searchPattern = new BehaviorSubject(undefined);
  }
 
  ngOnInit() {
    this.observeSearchBar();
  }
 
  updateSubscription(newValue) {
    this.searchPattern.next(newValue);
  }
 
  observeSearchBar(): void {
    this.searchPattern.asObservable()
    // Arama çubuğunun spam edilmesini önler
      .debounce(() => Observable.timer(1000))
      .forEach(() => {
        if (this.usersSubscription) {
          this.usersSubscription.unsubscribe();
        }
        this.usersSubscription = this.subscribeUsers();
      });
  }
 
  addChat(user): void {
    MeteorObservable.call('addChat', user._id).subscribe({
      next: () => {
        this.viewCtrl.dismiss();
      },
      error: (e: Error) => {
        this.viewCtrl.dismiss().then(() => {
          this.handleError(e);
        });
      }
    });
  }

  subscribeUsers(): Subscription {
    // Arama modeliyle eşleşen tüm kullanıcıları getir
    const subscription = MeteorObservable.subscribe('users', this.searchPattern.getValue());
    const autorun = MeteorObservable.autorun();
 
    return Observable.merge(subscription, autorun).subscribe(() => {
      this.users = this.findUsers();
    });
  }
 
  loadUsers(): void {
    // Arama modeliyle eşleşen tüm kullanıcıları getir
    const subscription = MeteorObservable.subscribe('users');
    const autorun = MeteorObservable.autorun();
 
    Observable.merge(subscription, autorun).subscribe(() => {
      this.users = this.findUsers();
    });
  }
 
  findUsers(): Observable<User[]> {
    // Chat'e ait tümünü bul
    return Chats.find({
      memberIds: this.senderId
    }, {
      fields: {
        memberIds: 1
      }
    })
    // Hiçbir sohbet bulunmaması durumunda merge-map i boş bir diziyle çağır
    .startWith([])
    .mergeMap((chats) => {
      // Get all userIDs who we're chatting with
      const receiverIds = _.chain(chats)
        .pluck('memberIds')
        .flatten()
        .concat(this.senderId)
        .value();

      return Users.find({
        _id: { $nin: receiverIds }
      })
      // Hiçbir kullanıcı bulunmaması durumunda map i boş bir diziyle çağır
      .startWith([]);
    });
  }
 
  handleError(e: Error): void {
    console.error(e);
 
    const alert = this.alertCtrl.create({
      buttons: ['OK'],
      message: e.message,
      title: 'Oops!'
    });
 
    alert.present();
  }
  
  getPic(pictureId): string {
    return Pictures.getPictureUrl(pictureId);
  }
}