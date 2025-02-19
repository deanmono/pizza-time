import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MenuComponent,
    OrdersComponent
  ]
})
export class PagesModule { }
