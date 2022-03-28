import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastVisitedProductsComponent } from './last-visited-products.component';

describe('LastVisitedProductsComponent', () => {
  let component: LastVisitedProductsComponent;
  let fixture: ComponentFixture<LastVisitedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastVisitedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastVisitedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
