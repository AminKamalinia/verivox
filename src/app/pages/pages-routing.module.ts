import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            { path: "", redirectTo: "default", pathMatch: "full" },
            { path: "default", component: DefaultComponent },
			{ path: "products", component: ProductsComponent },
			{ path: "products/:searchTerm", component: ProductsComponent },
			{ path: "products/:provider", component: ProductsComponent },
			{ path: "products/:searchTerm/:provider", component: ProductsComponent },
			{ path: "product", component: ProductComponent },
			{ path: "product/:id", component: ProductComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {

}
