import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserOfferComponent } from './delete-user-offer.component';

describe('DeleteUserOfferComponent', () => {
  let component: DeleteUserOfferComponent;
  let fixture: ComponentFixture<DeleteUserOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
