import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-water-game',
  imports: [RouterLink,CommonModule],
  templateUrl: './water-game.html',
  styleUrl: './water-game.css',
})
export class WaterGame implements OnInit {
  capacities = [5, 4, 3];
  glasses = [0, 0, 0];
  goal = [0, 0, 0];
  selectedGlass: number | null = null;
  description = '';
  puzzles = [
    { capacities: [5, 4, 3], initial: [5, 0, 0], goal: [1, 4, 0], description: 'Get exactly 4 liters in the 4-liter jug!' },
    { capacities: [4, 3, 2], initial: [0, 3, 0], goal: [4, 0, 2], description: 'Get exactly 2 liters in the 2-liter jugs!' },
    { capacities: [7, 6, 5], initial: [7, 0, 0], goal: [0, 4, 3], description: 'Get exactly 4 liters in the 4-liter jug and 3 liters in the 3-liter jug!' },
    { capacities: [9, 4, 3], initial: [9, 0, 0], goal: [5, 4, 0], description: 'Get exactly 4 liters in the 4-liter jug!' }
  ];

  ngOnInit() {
    this.loadRandomPuzzle();
  }

  loadRandomPuzzle() {
    const puzzle = this.puzzles[Math.floor(Math.random() * this.puzzles.length)];
    this.capacities = puzzle.capacities;
    this.glasses = [...puzzle.initial];
    this.goal = puzzle.goal;
    this.description = puzzle.description;
    this.selectedGlass = null;
  }

  selectGlass(index: number) {
    if (this.selectedGlass === null) {
      this.selectedGlass = index;
    } else if (this.selectedGlass === index) {
      this.selectedGlass = null;
    } else {
      // pour from selected to this
      const from = this.selectedGlass;
      const to = index;
      const amount = Math.min(this.glasses[from], this.capacities[to] - this.glasses[to]);
      this.glasses[from] -= amount;
      this.glasses[to] += amount;
      this.selectedGlass = null;
      this.checkWin();
    }
  }

  checkWin() {
    if (this.glasses.every((level, i) => level === this.goal[i])) {
      setTimeout(() => alert('Congratulations! You solved the puzzle: ' + this.description), 500);
    }
  }

  reset() {
    this.loadRandomPuzzle();
  }
}
