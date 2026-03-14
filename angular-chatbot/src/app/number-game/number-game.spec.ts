import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberGame } from './number-game';

describe('NumberGame', () => {
  let component: NumberGame;
  let fixture: ComponentFixture<NumberGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
