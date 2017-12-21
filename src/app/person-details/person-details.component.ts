import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../projectdata/person.model';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  @Input('person') person: Person;
  @Input('readonly') readonly: boolean;
  @Input('showControls') showControls: boolean;

  constructor() { }

  ngOnInit() {
  }

}
