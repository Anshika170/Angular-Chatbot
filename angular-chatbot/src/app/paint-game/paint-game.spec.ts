import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintGame } from './paint-game';

describe('PaintGame', () => {
  let component: PaintGame;
  let fixture: ComponentFixture<PaintGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
