import { Component, OnInit } from '@angular/core';
import {ModalService} from '../modal.service';
import {ProjectdataService} from '../../projectdata/projectdata.service';
import {Person} from '../../projectdata/person.model';
declare var $: any;

@Component({
  selector: 'app-modal-edit-person',
  templateUrl: './modal-edit-person.component.html',
  styleUrls: ['./modal-edit-person.component.css']
})
export class ModalEditPersonComponent implements OnInit {
  isCreating: boolean;
  person: Person;

  constructor(public modal: ModalService, public project: ProjectdataService) { }

  ngOnInit() {
    this.person = {name: '', id: null};

    this.modal.openModalEditPerson.subscribe(data => {
      this.isCreating = data.isCreating;
      if (!this.isCreating) {
        this.person = this.project.getPerson(data.id);
      } else {
        this.person = {name: '', id: null};
      }

      $('app-modal-edit-person .modal').modal('show');
    });
  }

  complete() {
    if (!this.isCreating) {
      this.project.editPerson(this.person.id, this.person);
    } else {
      this.project.createPerson(this.person);
    }

    $('app-modal-edit-person .modal').modal('hide');
    $('app-modal-manage-people .modal').modal('show');
  }

}
