import { Component, OnInit } from '@angular/core';
import {ProjectdataService} from '../projectdata/projectdata.service';
import {SessionService} from '../session/session.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  categories: string[];

  constructor(public project: ProjectdataService, public session: SessionService) { }

  ngOnInit() {
    this.categories = this.project.getBoard(this.session.getCurrentBoard()).categories;

    this.project.projectChange.subscribe(e => this.categories = this.project.getBoard(this.session.getCurrentBoard()).categories);
    this.session.sessionChange.subscribe(e => this.categories = this.project.getBoard(this.session.getCurrentBoard()).categories);
  }

}
