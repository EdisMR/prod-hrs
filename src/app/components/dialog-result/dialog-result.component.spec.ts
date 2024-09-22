import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResultRegistryComponent } from './dialog-result.component';

describe('DialogRegistryComponent', () => {
  let component: DialogResultRegistryComponent;
  let fixture: ComponentFixture<DialogResultRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogResultRegistryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogResultRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
