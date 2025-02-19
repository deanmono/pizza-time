import { Component } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import {TuiRepeatTimes} from '@taiga-ui/cdk';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  imports: [
    TuiAppearance,
    TuiAvatar,
    TuiButton,
    TuiCardLarge,
    TuiCell,
    TuiHeader,
    TuiRepeatTimes,
    TuiTitle,
    FormsModule,
    NgFor,
    NgIf
  ],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  searchTerm: string = '';

  constructor(
    private orderService: OrderService
  ) {}

  public ngOnInit() : void
  {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      }
    });
  }

  cancelOrder(orderId: any): void {
    this.orderService.deleteOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter((order: Order) => order.Order_ID !== orderId);
      }
    });
  }

  get filteredOrders(): Order[] {
    return this.orders.filter((order: Order) =>
      order.Order_ID.toString().includes(this.searchTerm) ||
      order.Flavor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.Crust.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.Size.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.Table_No.toString().includes(this.searchTerm)
    );
  }
 }
