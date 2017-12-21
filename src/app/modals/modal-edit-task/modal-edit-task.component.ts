import { Component, OnInit } from '@angular/core';
import {Task} from '../../projectdata/task.model';
import {ModalService} from '../modal.service';
import {ProjectdataService} from '../../projectdata/projectdata.service';
import {Person} from '../../projectdata/person.model';
import {SessionService} from '../../session/session.service';
import {UtilsService} from '../../utils.service';

declare var $: any;

@Component({
  selector: 'app-modal-edit-task',
  templateUrl: './modal-edit-task.component.html',
  styleUrls: ['./modal-edit-task.component.css']
})
export class ModalEditTaskComponent implements OnInit {
  isCreating: boolean;
  task: Task;
  projectPeople: any[];
  subtasks: string;
  categories: string[];

  constructor(public modal: ModalService, public project: ProjectdataService, public session: SessionService, public util: UtilsService) { }

  ngOnInit() {
    this.resetTask();
    this.projectPeople = [];
    this.categories = this.project.getBoard(this.session.getCurrentBoard()).categories;

    this.modal.openModalEditTask.subscribe(data => {
      this.isCreating = data.isCreating;

      this.subtasks = '';

      this.projectPeople = this.project.getPeople().map(p => {
        return {id: p.id, text: p.name};
      });

      if (!this.isCreating) {
        this.task = this.project.getTask(data.boardId, data.taskId);
      } else {
        this.resetTask();
      }

      //$('app-modal-edit-task #taskPeoples').select2({ maximumSelectionSize: 12 });

      $('.modal').modal('hide');
      $('app-modal-edit-task .modal').modal('show');
      $('body').addClass('modal-open');
    });
  }

  resetTask() {
    this.subtasks = '';
    this.task = {
      name: '',
      description: '',
      category: this.project.getBoard(this.session.getCurrentBoard()).categories[0],
      images: [],
      assets: [],
      dateCreated: new Date(),
      dateLastUpdate: new Date(),
      id: null,
      people: [],
      comments: [],
      subtasks: [],
      archived: false
    };
  }

  peopleSelection(selection) {
    //TODO delegate to projectService for proper logging
    this.task.people = [];
    for (let person of selection) {
      this.task.people.push(this.project.getPerson(person.id));
    }
  }

  compileSubtasks() {
    for (let line of this.subtasks.split('\n')) {
      if (line !== '' && line !== ' ' && line !== ':') {
        let split = line.split(':');
        let title = split[0];
        let desc = split.length > 1 ? split[1] : '';
        this.task.subtasks.push({name: title, description: desc, dateCreated: new Date(), dateLastUpdate: new Date(), done: false});
      }
    }
  }

  complete() {
    this.compileSubtasks();
    if (this.isCreating) {
      this.project.createTask(this.session.getCurrentBoard(), this.task);
    } else {
      this.project.modifyTask(this.session.getCurrentBoard(), this.task.id, this.task);
    }
    $('app-modal-edit-task .modal').modal('hide');
  }

}
