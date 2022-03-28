import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "pages",
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
  },
  {
    path: "",
    redirectTo: "/pages/default",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/pages/default" // Error 404 - Page not found
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
