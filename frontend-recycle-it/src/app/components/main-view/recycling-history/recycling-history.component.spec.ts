import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingHistoryComponent } from './recycling-history.component';

describe('RecyclingHistoryComponent', () => {
  let component: RecyclingHistoryComponent;
  let fixture: ComponentFixture<RecyclingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecyclingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecyclingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
