import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTableViewComponent } from './reserve-table-view.component';

describe('ReserveTableViewComponent', () => {
  let component: ReserveTableViewComponent;
  let fixture: ComponentFixture<ReserveTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
