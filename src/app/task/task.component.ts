import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Task} from '../projectdata/task.model';
import {Session} from '../session/session.model';
import {SessionService} from '../session/session.service';
import {ModalService} from '../modals/modal.service';
import {Subtask} from '../projectdata/subtask.model';
import {ProjectdataService} from '../projectdata/projectdata.service';
import {UtilsService} from '../utils.service';

declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {
  @Input('task') readonly task: Task;
  @Input('readonly') readonly: boolean;
  @Input('showTaskDescriptions') showTaskDescriptions: boolean;
  @Input('showSubtasks') showSubtasks: boolean;
  @Input('showTaskControls') showTaskControls: boolean;

  constructor(public session: SessionService, public modal: ModalService, public project: ProjectdataService, public util: UtilsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  editTask() {
    this.modal.openModalEditTask.emit({isCreating: false, boardId: this.session.getCurrentBoard(), taskId: this.task.id});
  }

  openTask() {
    this.modal.openModalViewTask.emit({boardId: this.session.getCurrentBoard(), taskId: this.task.id});
  }

  toggleSubtask(subtask: Subtask) {
    let newTask = this.util.clone(this.task);
    newTask.subtasks.find(st => st.name === subtask.name).done = !this.task.subtasks.find(st => st.name === subtask.name).done;
    this.project.modifyTask(this.session.getCurrentBoard(), this.task.id, newTask);
  }


}
