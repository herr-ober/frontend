import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct, Product } from 'src/app/models/IProduct';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent{

  products: Map<string, IProduct> = new Map();
  productsExist: boolean = false;

  private productModalVisible: boolean = false;

  productName: string = "";
  productPrice: number = 0;
  productCategory: string="";


  constructor(private productService: ProductService) { }

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent) {
    let clickedID: String = (e.target as Element).id;
    if (clickedID !== null) {
      if (this.productModalVisible && (clickedID == "product-modal-background")) {
        this.switchProductAddModal();
      }
    }
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.updateProducts().then();
  }

  async submitProducts() {
    if (this.productName) {
      await this.productService.addNewProduct(new Product(this.productName, this.productPrice, this.productCategory))
      .then().catch((res: HttpErrorResponse) => {
        if (res.status == 201) {
          this.switchProductAddModal();
          this.reload();
        } else if (res.status == 401) {
          this.displayError("Keine Berechtigung.")
        } else if (res.status == 409) {
          this.displayError("Die Exercise existiert bereits.")
        } else if (res.status == 500) {
          this.displayError("Ein Serverfehler ist aufgetreten.")
        } else {
          this.displayError("Ein unbekannter Fehler ist aufgetreten.")
        }
      })
    } else {
      this.displayError("Die Exercise muss einen Namen besitzen.")
    }
  }

  async updateProducts() {
    this.products = await this.productService.getAllProductsAsMap()
    this.productsExist = (this.products.size != 0);
  }

  async deleteProducts(id: string) {
    await this.productService.deleteProductById(id)
    this.reload();
  }

  switchProductAddModal() {
    let productModal = document.getElementById("product-modal");
    let productModalError = document.getElementById("product-error-alert");
    this.productName = "";

    if (productModal !== null) {
      if (!this.productModalVisible) {
        productModal!.style.display = "block";
        this.productModalVisible = true;
      } else {
        productModal!.style.display = "none";
        this.productModalVisible = false;
        productModalError!.style.display = "none"
      }
    }
  }

  displayError(msg: string) {
    let loginErrorAlert = document.getElementById("product-error-alert");
    loginErrorAlert!.innerHTML = msg;
    loginErrorAlert!.style.display = "block";
  }
}
