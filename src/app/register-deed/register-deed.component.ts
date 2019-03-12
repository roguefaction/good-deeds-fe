import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Deed} from '../models/deed';
import {HttpResponse} from '@angular/common/http';
import {DeedService} from '../services/deed.service';
import {routerNgProbeToken} from '@angular/router/src/router_module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-deed',
  templateUrl: './register-deed.component.html',
  styleUrls: ['./register-deed.component.css']
})
export class RegisterDeedComponent implements OnInit {

  registerJobForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobService: DeedService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerJobForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.minLength(5), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern('[^\\x00-\\x7F]*[a-zA-Z\\s]*')]],
      date: ['', [Validators.required]],
      maxPeople: ['', [Validators.pattern('^[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      contactPerson: ['', [Validators.required, Validators.pattern('[^\\x00-\\x7F]*[a-zA-Z\\s]*')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+370[0-9]{8}')]],
      description: ['', [Validators.maxLength(500)]],
      // hastags pasidometi del validacijos
      tags: ['', [Validators.maxLength(500), Validators.pattern('(#[a-zA-Z]+,?)+[^,]$')]]
      //  /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g
    });
  }

  submitForm() {

    if (this.registerJobForm.invalid) {
      console.log(this.registerJobForm);
      this.markFormGroupTouched(this.registerJobForm);
      return;
    }
    this.addJob(this.registerJobForm.value);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any> Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  addJob(deed: Deed) {
    this.jobService.addJob(deed).subscribe(
      data => {
        console.log('Succesfully Added deed');
      },
      ErrorResponse => {
        alert(ErrorResponse.error.message);
      },
      () => {
        console.log('Operation complete');
        this.router.navigateByUrl('/good-deeds');
      });

  }


}
