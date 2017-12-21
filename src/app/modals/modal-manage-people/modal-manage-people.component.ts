import { Component, OnInit } from '@angular/core';
import {ProjectdataService} from '../../projectdata/projectdata.service';
import {Person} from '../../projectdata/person.model';
import {ModalService} from '../modal.service';
declare var $: any;

@Component({
  selector: 'app-modal-manage-people',
  templateUrl: './modal-manage-people.component.html',
  styleUrls: ['./modal-manage-people.component.css']
})
export class ModalManagePeopleComponent implements OnInit {

  people: Person[];

  constructor(public project: ProjectdataService, public modal: ModalService) { }

  ngOnInit() {
    this.modal.openModalManagePeople.subscribe(data => $('app-modal-manage-people .modal').modal('show'));

    this.people = this.project.getPeople();
  }

  editPerson(personId: string) {
    $('app-modal-manage-people .modal').modal('hide');
    this.modal.openModalEditPerson.emit({isCreating: false, id: personId});
  }

  addPerson() {
    $('app-modal-manage-people .modal').modal('hide');
    this.modal.openModalEditPerson.emit({isCreating: true, id: null});
  }

}
