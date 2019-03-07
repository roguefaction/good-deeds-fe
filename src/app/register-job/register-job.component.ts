import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Job} from '../models/job';
import {HttpResponse} from '@angular/common/http';
import {JobService} from '../services/job.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-register-job',
  templateUrl: './register-job.component.html',
  styleUrls: ['./register-job.component.css']
})
export class RegisterJobComponent implements OnInit {

  registerJobForm: FormGroup;
  jobId: number;
  job: Observable<Job>;

  constructor(private formBuilder: FormBuilder, private jobService: JobService, private route: ActivatedRoute) {
    this.route.params.subscribe(id => this.jobId);
  }

  ngOnInit() {
    if (this.jobService.getJobById(this.jobId) != null) {
      this.job = this.jobService.getJobById(this.jobId);

    } else {
      this.createForm();
    }

  }

  createForm() {
    this.registerJobForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.minLength(5), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z ]+$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      contactPerson: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+370[0-9]{8}')]],
      description: ['', [Validators.maxLength(500)]],
      // hastags pasidometi del validacijos
      tags: ['', [Validators.maxLength(500), Validators.pattern('(#[a-zA-Z]+,?)+[^,]$')]]
    });
  }


  submitFormIfRegister() {

    if (this.registerJobForm.invalid) {
      console.log(this.registerJobForm);
      alert('Please fix the form!');
      return;
    }
    this.addJob(this.registerJobForm.value);
  }

  submitFormIfEdit() {

    if (this.registerJobForm.invalid) {
      console.log(this.registerJobForm);
      alert('Please fix the form!');
      return;
    }
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
      });
  }

  editJob(job: Job, id: number) {
    this.jobService.editJob(job, id).subscribe(
      data => {
        console.log('Succesfully Edited job');
      },
      Error => {
        console.log(HttpResponse.toString());

      },
      () => {
      });
  }


}
