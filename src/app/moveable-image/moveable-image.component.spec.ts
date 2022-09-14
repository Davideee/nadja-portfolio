import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveableImageComponent } from './moveable-image.component';

describe('MoveableImageComponent', () => {
  let component: MoveableImageComponent;
  let fixture: ComponentFixture<MoveableImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveableImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
