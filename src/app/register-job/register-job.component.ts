import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Job} from '../models/job';
import {HttpResponse} from '@angular/common/http';
import {JobService} from '../services/job.service';
import {routerNgProbeToken} from '@angular/router/src/router_module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-job',
  templateUrl: './register-job.component.html',
  styleUrls: ['./register-job.component.css']
})
export class RegisterJobComponent implements OnInit {

  registerJobForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobService: JobService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerJobForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.minLength(5), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      contactPerson: ['', [Validators.required]],
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
    } else {
      this.router.navigate(['good-deeds']);
      window.location.reload();

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

  addJob(job: Job) {
    this.jobService.addJob(job).subscribe(
      data => {
        console.log('Succesfully Added job');
      },
      Error => {
        console.log(HttpResponse.toString());

      },
      () => {
        console.log('Operation complete');
      });


  }


}
