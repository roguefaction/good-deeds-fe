import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import { ConfirmPasswordValidator } from '../validators/confirm-password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  httpStatus: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.userRegistrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern('[^\\x00-\\x7F]*[a-zA-Z\\s]*')]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+370[0-9]{8}')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.{8,}$)(?=.*[A-Z])(?=.*[0-9]).*$')]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: ConfirmPasswordValidator.MatchPassword });
  }


  submitForm() {
    if (this.userRegistrationForm.invalid) {
      console.log(this.userRegistrationForm);
      this.markFormGroupTouched(this.userRegistrationForm);
      return;
    }
    this.addUser(this.userRegistrationForm.value);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any> Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  addUser(user: User) {
    this.userService.addUser(user).subscribe(
      data => {
        console.log('user added!');
      },
      ErrorResponse => {
        this.httpStatus = ErrorResponse.error.message;
        alert(ErrorResponse.error.message);
      },
      () => {
        console.log('USER ADDING COMPLETE');
        // TODO add login route after adding user
      }
    );
  }


}
