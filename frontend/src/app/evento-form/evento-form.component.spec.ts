import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoFormComponent } from './evento-form.component';

describe('EventoFormComponent', () => {
  let component: EventoFormComponent;
  let fixture: ComponentFixture<EventoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoFormComponent]
    });
    fixture = TestBed.createComponent(EventoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
