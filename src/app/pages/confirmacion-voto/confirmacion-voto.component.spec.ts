import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionVotoComponent } from './confirmacion-voto.component';

describe('ConfirmacionVotoComponent', () => {
  let component: ConfirmacionVotoComponent;
  let fixture: ComponentFixture<ConfirmacionVotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionVotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmacionVotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
