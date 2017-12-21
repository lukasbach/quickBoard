import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPersonComponent } from './modal-edit-person.component';

describe('ModalEditPersonComponent', () => {
  let component: ModalEditPersonComponent;
  let fixture: ComponentFixture<ModalEditPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
