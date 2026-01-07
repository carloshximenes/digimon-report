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

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {
  form!: FormGroup;
  step: number = 1;

  constructor(private _fb: FormBuilder, private _router: Router, private _store: TournamentStore) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      participants: [0, Validators.compose([Validators.required, Validators.min(1)])],
      store: ['', Validators.required],
      top8: this._fb.array([]),
    });

    this.createTop8();
  }

  get top8(): FormArray {
    return this.form.get('top8') as FormArray;
  }

  createTop8() {
    const top8Array = this.form.get('top8') as FormArray;

    for (let i = 1; i <= 8; i++) {
      top8Array.push(
        this._fb.group({
          position: [i, Validators.required], // Only position is pre‑filled
          player: [''],
          deck: [''],
          colors: [''],
          cards: [''],
        })
      );
    }
  }

  onSubmit() {
    // if (this.form.invalid) return;
    this.form.markAllAsTouched();
    this.form.get('id')?.patchValue('deu certo');
    this._store.setTop8(this.form.value);
    this._router.navigate(['/result']);
  }
}
