import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../../../../../navigation/i18n/en';
import { locale as german } from '../../../../../navigation/i18n/de';
import { locale as russian } from '../../../../../navigation/i18n/ru';
import { User } from 'app/main/models/user.model';
import { UsersService } from 'app/main/apps/users/users.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const DD_MM_YYYY_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
};

@Component({
  selector: 'app-car-business',
  templateUrl: './car-business.component.html',
  styleUrls: ['./car-business.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DD_MM_YYYY_FORMAT
    }
  ]
})
export class CarBusinessComponent implements OnInit {

  @Input() carBusinessForm: FormGroup;
  
  users: User[] = [];
  
  constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private usersService: UsersService) { 
    this._fuseTranslationLoaderService.loadTranslations(english, german, russian);

  }

  ngOnInit() {
    this.usersService.getUsers()
      .then(users => {
        this.users = users;
      })
      .catch();
  }

  userCompare(user1: User, user2: User) {
    return user1 && user2 && user1.id == user2.id;
  }
}
