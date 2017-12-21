import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardcontrolsComponent } from './boardcontrols/boardcontrols.component';
import { SectionsComponent } from './sections/sections.component';
import { SectionComponent } from './section/section.component';
import { TaskComponent } from './task/task.component';
import { ModalManagePeopleComponent } from './modals/modal-manage-people/modal-manage-people.component';
import {ModalService} from './modals/modal.service';
import {ProjectdataService} from './projectdata/projectdata.service';
import { ModalEditPersonComponent } from './modals/modal-edit-person/modal-edit-person.component';
import { ModalEditTaskComponent } from './modals/modal-edit-task/modal-edit-task.component';
import {SelectComponent, SelectModule} from 'ng2-select';
import {SessionService} from './session/session.service';
import { ModalContainerComponent } from './modals/modal-container/modal-container.component';
import { FormGroupComponent } from './forms/form-group/form-group.component';
import { ModalViewTaskComponent } from './modals/modal-view-task/modal-view-task.component';
import { ModalActivityComponent } from './modals/modal-activity/modal-activity.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import {UtilsService} from './utils.service';
import { ModalCategoryManagementComponent } from './modals/modal-category-management/modal-category-management.component';
import { ModalThemeComponent } from './modals/modal-theme/modal-theme.component';
import { ModalQuickBoxComponent } from './modals/modal-quick-box/modal-quick-box.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardcontrolsComponent,
    SectionsComponent,
    SectionComponent,
    TaskComponent,
    ModalManagePeopleComponent,
    ModalEditPersonComponent,
    ModalEditTaskComponent,
    ModalContainerComponent,
    FormGroupComponent,
    ModalViewTaskComponent,
    ModalActivityComponent,
    PersonDetailsComponent,
    ModalCategoryManagementComponent,
    ModalThemeComponent,
    ModalQuickBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectModule
  ],
  providers: [
    ModalService,
    ProjectdataService,
    SessionService,
    UtilsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
