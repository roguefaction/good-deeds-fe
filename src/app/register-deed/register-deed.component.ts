import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Deed} from '../models/deed';
import {HttpResponse} from '@angular/common/http';
import {DeedService} from '../services/deed.service';
import {routerNgProbeToken} from '@angular/router/src/router_module';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register-deed',
  templateUrl: './register-deed.component.html',
  styleUrls: ['./register-deed.component.css']
})
export class RegisterDeedComponent implements OnInit {

  registerDeedForm: FormGroup;
  httpStatus: string;
  deedId: number;
  deedToEdit: Deed;
  isEverythingReady: boolean;

  constructor(private formBuilder: FormBuilder, private deedService: DeedService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(id => {
      this.deedId = id['id'];
    });
  }

  ngOnInit() {
    this.isEverythingReady = false;
    this.createForm();
    if (this.deedId != null) {
      this.getDeedById(this.deedId);
    } else {
      this.isEverythingReady = true;
    }
  }

  createForm() {
    this.registerDeedForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.minLength(5), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern('([^\\x00-\\x7F]*[a-zA-Z\\s]*)*')]],
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

  populateForm(deed: Deed) {
    this.registerDeedForm.patchValue({
      title: deed.title,
      organization: deed.organization,
      city: deed.city,
      date: deed.date,
      maxPeople: deed.maxPeople,
      email: deed.email,
      contactPerson: deed.contactPerson,
      phoneNumber: deed.phoneNumber,
      description: deed.description,
      tags: deed.tags
    });
    this.isEverythingReady = true;
  }

  submitForm() {

    if (this.registerDeedForm.invalid) {
      this.markFormGroupTouched(this.registerDeedForm);
      return;
    }

    if (this.deedId) {
      console.log('deed to edit ' + this.registerDeedForm.value);

      this.editDeed(this.registerDeedForm.value, this.deedId);
    } else {
      this.addDeed(this.registerDeedForm.value);
    }
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any> Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  addDeed(deed: Deed) {
    this.deedService.addDeed(deed).subscribe(
      data => {
        this.deedService.setPageOfDeed(deed.title);
        this.deedService.setDeedToExpand(deed.title);
      },
      ErrorResponse => {
        // alert(ErrorResponse.error.message);
        this.httpStatus = ErrorResponse.error.message;
        alert(ErrorResponse.error.message);
      },
      () => {
        this.router.navigateByUrl('/good-deeds');
      });

  }

  editDeed(deed: Deed, id: number) {
    this.deedService.editDeed(deed, id).subscribe(
      data => {
        console.log('Succesfully Edited deed');
      },
      Error => {
        console.log(HttpResponse.toString());

      },
      () => {
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() =>
          this.router.navigate(['user-profile']));
      });
  }

  getDeedById(id: number) {
    this.deedService.getDeedById(id).subscribe(
      data => {
        console.log('Deed retrieval successful');
        this.deedToEdit = data;
      },
      Error => {
        console.log(Error.error.message);

      },
      () => {
        this.populateForm(this.deedToEdit);
      });
  }


}
