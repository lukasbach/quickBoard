import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardcontrolsComponent } from './boardcontrols.component';

describe('BoardcontrolsComponent', () => {
  let component: BoardcontrolsComponent;
  let fixture: ComponentFixture<BoardcontrolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardcontrolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardcontrolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
