import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  categories: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ProductComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.NAME_REGEX)],
      ],
      categoryId: [null, [Validators.required]],
      price: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.NUMBER_REGEX)],
      ],
      description: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response;
    }),
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.GENERIC_ERROR;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.ERROR
        );
      };
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const formData = this.productForm.value;
    const data = {
      name: formData.name,
      category: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };
    this.productService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.GENERIC_ERROR;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.ERROR
        );
      }
    );
  }

  edit() {
    const formData = this.productForm.value;
    const data = {
      id: this.dialogData.data.id,
      name: formData.name,
      category: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };
    this.productService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.GENERIC_ERROR;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.ERROR
        );
      }
    );
  }
}
