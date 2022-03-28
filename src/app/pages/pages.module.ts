import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services';
import { PagesRoutingModule } from './pages-routing.module';
import { DefaultComponent } from './default/default.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { LastVisitedProductsComponent, ProductCardComponent, SidebarComponent } from '../components';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgSelectModule,
        HttpClientModule,
        PagesRoutingModule,
    ],
    declarations: [
        LastVisitedProductsComponent,
        SidebarComponent,
        ProductCardComponent,
        DefaultComponent,
        ProductsComponent,
        MainComponent,
        ProductComponent
    ],
    providers: [
        ProductService
    ]
})
export class PagesModule {

}
