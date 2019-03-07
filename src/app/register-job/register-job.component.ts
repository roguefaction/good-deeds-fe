import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Job} from "../../models/job";
import {HttpResponse} from "@angular/common/http";
import {JobService} from "../services/job.service";

@Component({
  selector: 'app-register-job',
  templateUrl: './register-job.component.html',
  styleUrls: ['./register-job.component.css']
})
export class RegisterJobComponent implements OnInit {

  registerJobForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerJobForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organisation: ['', [Validators.minLength(5), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z ]+$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      contactPerson: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+370[0-9]{8}')]],
      description: ['', [Validators.maxLength(500)]],
      // hastags pasidometi del validacijos
      tags: ['', [Validators.maxLength(500), Validators.pattern('(#[a-zA-Z]+,?)+[^,]$')]]
    });
  }



  submitForm() {

    if (this.registerJobForm.invalid) {
      console.log(this.registerJobForm);
      alert('Please fix the form!');
      return;
    }
    this.addJob(this.registerJobForm.value);
  }

  addJob(job: Job) {
    this.jobService.addJob(job).subscribe(
      data => {
        alert('Succesfully Added job');
      },
      Error => {
        alert(HttpResponse.toString());
      },
      () => {
        console.log('Operation complete');
      });
  }


}
