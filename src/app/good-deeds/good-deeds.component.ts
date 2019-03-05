import { Component, OnInit } from '@angular/core';
import {Job} from '../../models/job';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit {
  jobs: Job[] =  [{
    organisationName: 'SOS Gyvunai',
    jobName: 'pašerti šuniukus',
    place: 'Vilnius',
    aboutJob: 'losfsdf sd fd f  fd s  dfsd fsd f sd   dfsdfsdfsdf f dsf sd f ds f ds f sd fs df ',
    name: 'Petras Petrauskas',
    contacts: '+37065122312'
},
  {
    organisationName: 'Kačiukų rojus',
    jobName: 'paglostyti kačiukus',
    place: 'Vilnius',
    aboutJob: 'losfsdf sd fd f  fd s  dfsd fsd f sd   dfsdfsdfsdf f dsf sd f ds f ds f sd fs df ',
    name: 'Ona Onute',
    contacts: '+37065124423'
  }];
  constructor() { }

  ngOnInit() {
  }

}
