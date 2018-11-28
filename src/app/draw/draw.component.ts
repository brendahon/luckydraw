import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from '../data.service';
import { User } from "./User";

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  drawForm: FormGroup;
  submitted = false;
  success = false;
  user: User;
  message = "";

  constructor(private data: DataService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.drawForm = this.formBuilder.group({
      name: [''],
      email: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    this.data.getRandomUser().subscribe((data: User) => {
      this.user = data;

      console.log("user retrieved: " + this.user);

      if(!this.user) {
        this.drawForm.controls.name.setValue("");
        this.drawForm.controls.email.setValue("");
        this.message = "No user is drawn!";
        console.log("draw message for null user: " + this.message);
      }
      else if(this.user.draw) {
        this.drawForm.controls.name.setValue(this.user.name);
        this.drawForm.controls.email.setValue(this.user.email);
        this.message = "Congratulations!";
        this.success = true;
      } else {
        this.drawForm.controls.name.setValue("");
        this.drawForm.controls.email.setValue("");
        this.message = "No user is drawn!";
      }

      console.log("draw message: " + this.message);
    });

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide(); 
    }, 3000);

  }

}
