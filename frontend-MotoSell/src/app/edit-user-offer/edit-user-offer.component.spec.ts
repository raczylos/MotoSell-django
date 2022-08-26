import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserOfferComponent } from './edit-user-offer.component';

describe('EditUserOfferComponent', () => {
  let component: EditUserOfferComponent;
  let fixture: ComponentFixture<EditUserOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
