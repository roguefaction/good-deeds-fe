import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {ConfirmPasswordValidator} from '../validators/confirm-password.validator';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {error} from 'util';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  httpStatus: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.userRegistrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern('[^\\x00-\\x7F]*[a-zA-Z\\s]*')]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      phone: ['', [Validators.pattern('^\\+370[0-9]{8}')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.{8,}$)(?=.*[A-Z])(?=.*[0-9]).*$')]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: ConfirmPasswordValidator.MatchPassword});
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
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  loginUser(email: string, password: string) {
    this.authenticationService.login(email, password)
      .pipe(first())
      .subscribe(
        data => {
          console.log('welcome, ' + email);
          this.router.navigate(['/home']);
        },
        ErrorMessage => {
          console.log('error happened');
        },
        () => {
          this.authenticationService.performGet();
        });
  }

  addUser(user: User) {
    delete user.confirmPassword;
    this.userService.addUser(user).subscribe(
      data => {
        console.log('user added!');
      },
      error => {
        console.log('error');
      },
      () => {
        console.log('USER ADDING COMPLETE');
        this.loginUser(user.email, user.password);
      }
    );


  }


}
