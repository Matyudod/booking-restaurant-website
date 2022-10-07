import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ICart } from 'src/app/models/cart';
import { ICartItem } from 'src/app/models/cart-item';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { IOrder } from '../../../models/order';
import { IFood } from '../../../models/food';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { ICity } from 'src/app/models/city';
import { IDistrict } from 'src/app/models/district';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  private userId: Number | any;
  private userToken: String;
  private foodService: FoodService;
  private userService: UserService;
  private orderService: OrderService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;
  protected foodChecked: Boolean[] = [];
  protected citiesList: ICity[] = [];
  protected districtsList: IDistrict[] = [];
  protected wardsList: IDistrict[] = [];
  address = new FormControl('', [
    Validators.required,
  ]);
  ward = new FormControl('', [
    Validators.required,
  ]);
  district = new FormControl('', [
    Validators.required,
  ]);
  city = new FormControl('', [
    Validators.required,
  ]);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9 ]{10}"),
  ]);
  orderForm = new FormGroup({
    phone: this.phone,
    address: this.address,
    ward: this.ward,
    district: this.district,
    city: this.city,
  },);
  protected foodList: ICart = {
    countAll: 0,
    rows: []
  };
  constructor(http: HttpClient) {
    this.foodService = new FoodService(http);
    this.orderService = new OrderService(http);
    this.publicFileService = new PublicFileService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
  }

  ngOnInit(): void {
    this.userService.getIdByToken(this.userToken).subscribe((userID) => {
      this.userId = userID;
      this.getListOrdering();
      this.getCitiesList();
    })
  }
  getCitiesList() {
    this.publicFileService.getCitiesList().subscribe((citiesList) => {
      this.citiesList = <ICity[]>Object.values(citiesList);
    })
  }
  getListOrdering() {
    this.ticketService.getGetPendingTicket(this.userId).subscribe((ticket) => {
      this.orderService.getListWithTicketId(ticket.id).subscribe((orderingList) => {
        orderingList.rows.forEach((orderingItem: IOrder, index: number) => {
          this.foodService.getById(orderingItem.food_id).subscribe((food) => {
            this.foodList.countAll = orderingList.count;
            let foodItem: ICartItem = {
              quantity: orderingItem.quantity,
              ticket_id: orderingItem.ticket_id,
              food: <IFood>food
            }
            this.foodChecked.push(false);
            this.foodList.rows.push(foodItem);
          });
        });
      });
    });

    console.log(this.orderForm);
  }

  formatNumber(price: Number, quantity: Number) {
    let number = <number>price * <number>quantity;
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
  }

  citySelected(cityCode: Number) {
    this.publicFileService.getDistrictsList(cityCode).subscribe((districtsList) => {
      this.districtsList = <IDistrict[]>Object.values(districtsList);
    })
  }

  districtSelected(districtCode: Number) {
    this.publicFileService.getWardsList(districtCode).subscribe((wardsList) => {
      this.wardsList = <IDistrict[]>Object.values(wardsList);
    })
  }

  onSubmit() {
    console.log(this.orderForm.value);
    let ticket_id = this.foodList.rows[0].ticket_id;
    let ticket = {
      customer_id: this.userId,
      type_party_id: 0,
      table_id: 0,
      received_date: new Date(),
      payment_date: new Date(),
      customer_phone: this.orderForm.value.phone,
      customer_address: this.orderForm.value.address + ", " + this.orderForm.value.ward,
    }
  }

}
