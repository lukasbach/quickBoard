import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {
  @Input('inputid') public inputid: string;
  @Input('title') public title: string;
  @Input('description') public description: string;

  constructor() { }

  ngOnInit() {
  }

}
