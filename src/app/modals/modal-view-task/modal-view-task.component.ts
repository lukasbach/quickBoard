import { Component, OnInit } from '@angular/core';
import {ModalService} from '../modal.service';
import {ProjectdataService} from '../../projectdata/projectdata.service';
import {SessionService} from '../../session/session.service';
import {Task} from '../../projectdata/task.model';
import {Subtask} from '../../projectdata/subtask.model';

declare var $: any;

@Component({
  selector: 'app-modal-view-task',
  templateUrl: './modal-view-task.component.html',
  styleUrls: ['./modal-view-task.component.css']
})
export class ModalViewTaskComponent implements OnInit {
  task: Task;

  constructor(public modal: ModalService, public project: ProjectdataService, public session: SessionService) { }

  ngOnInit() {
    this.task = {
      id: null,
      name: '',
      subtasks: [],
      images: [],
      comments: [],
      assets: [],
      people: [],
      description: '',
      dateCreated: null,
      category: '',
      dateLastUpdate: null,
      archived: false
    };

    this.modal.openModalViewTask.subscribe(data => {
      this.task = this.project.getTask(data.boardId, data.taskId);
      $('app-modal-view-task .modal').modal('show');
      setTimeout(() => $('body').addClass('modal-open'), 1000);
    });
  }

  toggleSubtask(subtask: Subtask) {
    this.task.subtasks.find(st => st.name === subtask.name).done = !this.task.subtasks.find(st => st.name === subtask.name).done;
    this.project.modifyTask(this.session.getCurrentBoard(), this.task.id, this.task);
  }

  clickEdit() {
    this.modal.openModalEditTask.emit({isCreating: false, boardId: this.session.getCurrentBoard(), taskId: this.task.id});
  }

  viewChanges() {
    this.modal.openModalAcitiviy.emit({boardId: this.session.getCurrentBoard(), taskId: this.task.id});
  }


}
