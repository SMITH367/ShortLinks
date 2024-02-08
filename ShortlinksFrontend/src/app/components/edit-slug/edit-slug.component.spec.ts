import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlugComponent } from './edit-slug.component';

describe('EditSlugComponent', () => {
  let component: EditSlugComponent;
  let fixture: ComponentFixture<EditSlugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSlugComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
