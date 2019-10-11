import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticatonGuard } from '../app/core/guards/authenticaton.guard';
import { MainLayoutComponent } from "./shared/layout/app-layouts/main-layout.component";
import { AuthLayoutComponent } from "./shared/layout/app-layouts/auth-layout.component";

const routes: Routes = [
  { path: "",
  redirectTo: "auth/login",
  pathMatch: "full"},
  {
    path: "",
    component: MainLayoutComponent,
    data: { pageTitle: "Home" },
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        loadChildren: "./features/home/home.module#HomeModule",
        data: { pageTitle: "Home" }
      },
      {
        path: "master",
        loadChildren: "./features/master/master.module#MasterModule",
        data: { pageTitle: "master" },
        canActivate: [AuthenticatonGuard]
       
      },
      {
        path: "transaction",
        loadChildren: "./features/transaction/transaction.module#TransactionModule",
        data: { pageTitle: "transaction" },
        canActivate: [AuthenticatonGuard]
      },
      {
        path: "setting",
        loadChildren: "./features/setting/setting.module#SettingModule",
        data: { pageTitle: "setting" },
         canActivate: [AuthenticatonGuard]
      },
    ]
  },

  {
    path: "auth",
    component: AuthLayoutComponent,
    loadChildren: "./features/auth/auth.module#AuthModule"
  },
  { path: "**", redirectTo: "miscellaneous/error404" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
