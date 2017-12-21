import { Component, OnInit } from '@angular/core';
import {ModalService} from '../modal.service';
import {Change} from '../../projectdata/change.model';
import {ProjectdataService} from '../../projectdata/projectdata.service';

declare var $: any;

@Component({
  selector: 'app-modal-activity',
  templateUrl: './modal-activity.component.html',
  styleUrls: ['./modal-activity.component.css']
})
export class ModalActivityComponent implements OnInit {
  changes: Change[];
  header: string;

  constructor(public modal: ModalService, public project: ProjectdataService) { }

  ngOnInit() {
    this.changes = [];
    this.header = 'Activity log';

    this.modal.openModalAcitiviy.subscribe(data => {
      this.changes = [];

      let changes = this.project.getChanges();

      if (data && 'boardId' in data && 'taskId' in data) {
        this.header = 'Activities on task ' + this.project.getTask(data.boardId, data.taskId).name;
        changes = changes.filter(change =>
            ('id' in change.modifiedObjectBefore && change.modifiedObjectBefore.id === data.taskId)
          || 'id' in change.modifiedObjectAfter  && change.modifiedObjectAfter.id === data.taskId);
      } else if (data && 'personId' in data) {
        this.header = 'Activities on person ' + this.project.getPerson(data.personId);
        changes = changes.filter(change => 'id' in change.modifiedObjectBefore && change.modifiedObjectBefore.taskId === data.personId);
      } else {
        this.header = 'Activity log';
      }

      changes.sort((a,b) => (b.date.getTime() - a.date.getTime()));
      //changes.reverse();

      this.changes = changes;

      $('app-modal-activity .modal').modal('show');
      setTimeout(() => $('body').addClass('modal-open'), 1000);
    });
  }

}
