import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollGridComponent } from './poll-grid.component';

describe('PollGridComponent', () => {
  let component: PollGridComponent;
  let fixture: ComponentFixture<PollGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
