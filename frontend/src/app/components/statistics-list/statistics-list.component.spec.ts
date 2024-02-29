import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsListComponent } from './statistics-list.component';

describe('StatisticsListComponent', () => {
  let component: StatisticsListComponent;
  let fixture: ComponentFixture<StatisticsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
