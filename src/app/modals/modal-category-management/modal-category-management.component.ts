import { Component, OnInit } from '@angular/core';
import {ModalService} from '../modal.service';
import {ProjectdataService} from '../../projectdata/projectdata.service';
import {SessionService} from '../../session/session.service';

declare var $: any;

@Component({
  selector: 'app-modal-category-management',
  templateUrl: './modal-category-management.component.html',
  styleUrls: ['./modal-category-management.component.css']
})
export class ModalCategoryManagementComponent implements OnInit {
  private categories: {name: string, taskcount: number}[];
  private selectedCategory: string;
  private newCategoryName: string;
  private isCreating: boolean;

  constructor(public modal: ModalService, public project: ProjectdataService, public session: SessionService) { }

  ngOnInit() {
    this.modal.openModalCategoryManagement.subscribe(data => {
      this.categories = [];
      this.project.getBoard(this.session.getCurrentBoard()).categories.forEach(cat => {
       this.categories.push({
         name: cat,
         taskcount: this.project.getTasks(this.session.getCurrentBoard(), cat).length
       });
      });

      $('app-modal-category-management .modal').modal('show');
    });
  }

  createCategory() {
    this.isCreating = true;
    this.selectedCategory = '';
    this.newCategoryName = '';
  }

  selectForEdit(categoryName: string) {
    this.selectedCategory = categoryName;
    this.newCategoryName = categoryName;
    this.isCreating = false;
  }

  submitEdit() {
    if (this.isCreating) {
      this.project.createCategory(this.session.getCurrentBoard(), this.newCategoryName);
      this.categories.push({name: this.newCategoryName, taskcount: 0});
    } else {
      this.project.renameCategory(this.session.getCurrentBoard(), this.selectedCategory, this.newCategoryName);
      this.categories.forEach(cat => cat.name = cat.name === this.selectedCategory ? this.newCategoryName : cat.name);
    }
    this.selectedCategory = null;
    this.newCategoryName = '';
  }

  clearEntries() {
    if (confirm(`Do you really want to remove all entries from ${this.selectedCategory}?`)) {
      this.project.getTasks(this.session.getCurrentBoard(), this.selectedCategory).forEach(task =>
        this.project.removeTask(this.session.getCurrentBoard(), task.id));
    }
  }

  removeCategory() {
    if (confirm(`Do you really want to remove the category ${this.selectedCategory} with all its tasks?`)) {
      this.project.removeCategory(this.session.getCurrentBoard(), this.selectedCategory);
    }
  }

  abortEdit() {
    this.selectedCategory = null;
  }

}
