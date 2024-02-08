import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSlugComponent } from './delete-slug.component';

describe('DeleteSlugComponent', () => {
  let component: DeleteSlugComponent;
  let fixture: ComponentFixture<DeleteSlugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSlugComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
