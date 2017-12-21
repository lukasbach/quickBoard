import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../projectdata/task.model';
import {ProjectdataService} from '../projectdata/projectdata.service';
import {SessionService} from '../session/session.service';
import {Session} from '../session/session.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @Input('sectionTitle') sectionTitle: string;
  @Input('sectionId') sectionId: string;

  sessionReflector: Session;
  tasks: Task[];

  constructor(public project: ProjectdataService, public session: SessionService) { }

  ngOnInit() {
    this.tasks = this.project.getTasks(this.session.getCurrentBoard(), this.sectionId);
    this.project.projectChange.subscribe(e => this.tasks = this.project.getTasks(this.session.getCurrentBoard(), this.sectionId));

    this.sessionReflector = this.session.getSession();
    this.session.sessionChange.subscribe(e => {
      this.sessionReflector = this.session.getSession();
      this.tasks = this.project.getTasks(this.session.getCurrentBoard(), this.sectionId);
    });
  }

}
