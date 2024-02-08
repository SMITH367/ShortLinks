import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortedURLComponent } from './shorted-url.component';

describe('ShortedURLComponent', () => {
  let component: ShortedURLComponent;
  let fixture: ComponentFixture<ShortedURLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortedURLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortedURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
