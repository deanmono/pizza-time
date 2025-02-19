import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiGroup, TuiAppearance, TuiButton, TuiTitle, TuiTextfield, TuiDialogService} from '@taiga-ui/core';
import {TuiBlock, TuiInputNumber, TuiRadio, TuiConfirmData, TuiFieldErrorPipe} from '@taiga-ui/kit';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {TUI_CONFIRM} from '@taiga-ui/kit';
import { OrderService } from '../../shared/services/order.service';
import { Pizza, Order } from '../../shared/models/order.model';
import { NgFor, NgIf } from '@angular/common';
import {RouterLink} from '@angular/router';

type PizzaFormGroup = FormGroup<{
  Crust: FormControl<Pizza['Crust'] | null>;
  Flavor: FormControl<Pizza['Flavor'] | null>;
  Size: FormControl<Pizza['Size'] | null>;
  Table_No: FormControl<Pizza['Table_No'] | null>;
}>;

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    TitleCasePipe,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    ReactiveFormsModule,
    TuiBlock,
    TuiGroup,
    TuiRadio,
    TuiTextfield,
    RouterLink,
    TuiFieldErrorPipe,
    NgFor,
    NgIf
  ],
})
export class MenuComponent {
  private readonly dialogs = inject(TuiDialogService);
  orderSuccess = false;
  btnDisabled = false;

  readonly crustOptions: Pizza['Crust'][] = ['thin', 'newyorkstyle', 'neapolitan'];
  readonly flavorOptions: Pizza['Flavor'][] = ['marinara', 'white', 'bbq', 'pineapple'];
  readonly sizeOptions: Pizza['Size'][] = ['small', 'medium', 'large'];
  readonly tableNumbers = [1, 2, 3, 4, 5, 6];

  // Custom validator for table number range
  private tableNumberValidator(control: FormControl<number | null>): {[key: string]: any} | null {
    const tableNo = control.value;
    if (tableNo === null || tableNo < 1 || tableNo > 6) {
      return { 'invalidTable': true };
    }
    return null;
  }

  menuForm: PizzaFormGroup = new FormGroup({
    Crust: new FormControl<Pizza['Crust'] | null>(null, {
      validators: [Validators.required],
      nonNullable: false,
    }),
    Flavor: new FormControl<Pizza['Flavor'] | null>(null, {
      validators: [Validators.required],
      nonNullable: false,
    }),
    Size: new FormControl<Pizza['Size'] | null>(null, {
      validators: [Validators.required],
      nonNullable: false,
    }),
    Table_No: new FormControl<Pizza['Table_No'] | null>(null, {
      validators: [Validators.required, this.tableNumberValidator.bind(this)],
      nonNullable: false,
    })
  });

  // Getter methods for form controls with proper typing
  get Crust() { return this.menuForm.get('Crust') as FormControl<Pizza['Crust'] | null>; }
  get Flavor() { return this.menuForm.get('Flavor') as FormControl<Pizza['Flavor'] | null>; }
  get Size() { return this.menuForm.get('Size') as FormControl<Pizza['Size'] | null>; }
  get Table_No() { return this.menuForm.get('Table_No') as FormControl<Pizza['Table_No'] | null>; }

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  // Validation error messages
  getErrorMessage(controlName: keyof Pizza): string[] {
    const control = this.menuForm.get(controlName);
    if (!control) return [];

    const errors: string[] = [];
    if (control.hasError('required')) {
      errors.push('This field is required');
    }
    if (control.hasError('invalidTable')) {
      errors.push('Please select a valid table number (1-6)');
    }
    return errors;
  }

  // Form submission with validation
  onSubmit(): void {
    if (this.menuForm.invalid) {
      Object.keys(this.menuForm.controls).forEach(key => {
        const control = this.menuForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const formValue = this.menuForm.value;

    // Type guard to ensure all required fields are present
    if (!formValue.Crust || !formValue.Flavor || !formValue.Size || !formValue.Table_No) {
      this.displayError();
      return;
    }

    const pizza: Pizza = {
      Crust: formValue.Crust,
      Flavor: formValue.Flavor,
      Size: formValue.Size,
      Table_No: formValue.Table_No
    };

    this.orderService.createOrder(pizza).subscribe({
      next: () => {
        this.orderSuccess = true;
      },
      error: (resp: any) => {
        console.error('error', resp.error);
        this.displayError();
      },
      complete: () => {
        this.confirmOrder();
        this.menuForm.reset();
        this.orderSuccess = false;
      }
    });
  }

  private confirmOrder() {
    this.dialogs
      .open(
        '<div>Order Placed!</div>',
        {label: 'Order Success', size: 's'},
      )
      .subscribe({
        complete: () => {}
      });
  }

  private displayError() {
    this.orderSuccess = false;
    this.dialogs
      .open(
        '<div>Sorry! There was an issue with your order!</div>',
        {label: 'Oops!', size: 's'},
      ).subscribe({
      complete: () => {}
    });
  }
}
