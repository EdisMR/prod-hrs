import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveRegistryComponent } from './dialog-registry.component';

describe('DialogRegistryComponent', () => {
  let component: DialogRemoveRegistryComponent;
  let fixture: ComponentFixture<DialogRemoveRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogRemoveRegistryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogRemoveRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
