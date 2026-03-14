import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterGame } from './water-game';

describe('WaterGame', () => {
  let component: WaterGame;
  let fixture: ComponentFixture<WaterGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
