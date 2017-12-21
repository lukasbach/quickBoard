import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManagePeopleComponent } from './modal-manage-people.component';

describe('ModalManagePeopleComponent', () => {
  let component: ModalManagePeopleComponent;
  let fixture: ComponentFixture<ModalManagePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalManagePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManagePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
