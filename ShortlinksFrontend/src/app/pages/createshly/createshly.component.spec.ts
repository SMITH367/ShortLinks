import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateshlyComponent } from './createshly.component';

describe('CreateshlyComponent', () => {
  let component: CreateshlyComponent;
  let fixture: ComponentFixture<CreateshlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateshlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateshlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
