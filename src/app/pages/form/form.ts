import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentStore } from '../../store/tournament.store';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocompleteModule,
  type MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {
  form!: FormGroup;
  step: number = 1;
  colors = ['red', 'blue', 'yellow', 'green', 'black', 'purple', 'white'];

  constructor(private _fb: FormBuilder, private _router: Router, private _store: TournamentStore) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      id: [''],
      type: [{ value: 'Torneio Semanal', disabled: true }, Validators.required],
      date: ['', Validators.required],
      participants: [null, Validators.compose([Validators.required, Validators.min(1)])],
      store: ['', Validators.required],
      top8: this._fb.array([]),
    });

    this.createTop8();
  }

  createTop8() {
    const top8Array = this.form.get('top8') as FormArray;

    for (let i = 1; i <= 8; i++) {
      const item = this._fb.group({
        position: [i, Validators.required], // Only position is pre‑filled
        player: [''],
        deck: [''],
        colors: [[]],
        cards: [[]],
      });

      top8Array.push(item);
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.form.get('id')?.patchValue(uuidv4());
    this._store.setTop8(this.form.getRawValue());
    this._router.navigate(['/result']);
  }

  // Helper to access the Top 8 FormArray
  get top8(): FormArray {
    return this.form.get('top8') as FormArray;
  }

  // Helper to get the specific 'cards' FormControl for a row index
  // This helps clean up the HTML and ensures type safety
  getCardsControl(index: number): FormControl {
    return this.top8.at(index).get('cards') as FormControl;
  }

  getColorsControl(index: number): FormControl {
    return this.top8.at(index).get('colors') as FormControl;
  }

  addCard(event: MatChipInputEvent, index: number): void {
    const value = (event.value || '').trim();
    const control = this.getCardsControl(index); // Get specific control for this row

    // Limit to 3 cards (logic moved here or handled in HTML)
    if (value && control.value.length < 3) {
      // Direct update: [...oldValues, newValue]
      control.setValue([...control.value, value]);
    }

    // Clear input
    event.chipInput!.clear();
  }

  removeCard(keyword: string, index: number): void {
    const control = this.getCardsControl(index);

    // Direct update: filter out the removed keyword
    control.setValue(control.value.filter((k: string) => k !== keyword));
  }

  selectedColor(event: MatAutocompleteSelectedEvent, index: number): void {
    const value = event.option.viewValue;
    const control = this.getColorsControl(index); // Get specific control for this row

    if (control.value.length < 3) {
      control.setValue([...control.value, value]);
    }
  }

  addColor(event: MatChipInputEvent, index: number): void {
    const value = (event.value || '').trim();
    const control = this.getColorsControl(index); // Get specific control for this row

    if (!this.colors.find((color) => color == value)) {
      event.chipInput!.clear();
      return;
    }
    // Limit to 3 cards (logic moved here or handled in HTML)
    if (value && control.value.length < 3) {
      // Direct update: [...oldValues, newValue]
      control.setValue([...control.value, value]);
    }

    // Clear input
    event.chipInput!.clear();
  }

  removeColor(keyword: string, index: number): void {
    const control = this.getColorsControl(index);

    // Direct update: filter out the removed keyword
    control.setValue(control.value.filter((k: string) => k !== keyword));
  }

  public availableColors(i: number) {
    return this.colors.filter((col) => !this.getColorsControl(i).value.includes(col));
  }
}
