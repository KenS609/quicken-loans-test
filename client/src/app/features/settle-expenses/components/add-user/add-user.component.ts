import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormValidators } from '../../../../shared/services/form-validators.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required, FormValidators.noWhitespaceValidator, FormValidators.nameValidator]);

  constructor() { }

  ngOnInit(): void {
  }

}
