import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoryManagementComponent } from './modal-category-management.component';

describe('ModalCategoryManagementComponent', () => {
  let component: ModalCategoryManagementComponent;
  let fixture: ComponentFixture<ModalCategoryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCategoryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
