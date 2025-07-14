import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourAddress } from './your-address';

describe('YourAddress', () => {
  let component: YourAddress;
  let fixture: ComponentFixture<YourAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourAddress],
    }).compileComponents();

    fixture = TestBed.createComponent(YourAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
