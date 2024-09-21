import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistryComponent } from './dialog-registry.component';

describe('DialogRegistryComponent', () => {
  let component: DialogRegistryComponent;
  let fixture: ComponentFixture<DialogRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogRegistryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
