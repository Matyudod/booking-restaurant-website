import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IFoodList } from 'src/app/models/food-list';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { IMessage } from 'src/app/models/message';
import { IPagination } from 'src/app/models/pagination';
import { FoodService } from 'src/app/services/http/food.service';
import { MainIngredientDetailService } from 'src/app/services/http/main-ingredient-detail.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { FoodDialogSevice } from 'src/app/services/loading/food_dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  protected listFoods: IFoodList | IMessage | any;
  protected foodDetail: IMainIngredientDetail[] | any;
  private foodService: FoodService;
  private userService: UserService;
  private mainIngredientDetailService: MainIngredientDetailService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  private foodDialogSevice: FoodDialogSevice;
  private userToken: String;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.foodService = new FoodService(http);
    this.userService = new UserService(http);
    this.mainIngredientDetailService = new MainIngredientDetailService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
    this.foodDialogSevice = new FoodDialogSevice(dialog);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
  }

  ngOnInit(): void {
    this.getFoodList();
  }


  loadPageData(page: any) {
    this.getFoodList(page?.pageIndex + 1);
  }
  selectItem(food: any) {
    this.mainIngredientDetailService.getList(food.id).subscribe((data) => {
      this.foodDetail = data;
      this.userService.getIdByToken(this.userToken).subscribe((userID) => {
        this.foodDialogSevice.show(food, this.foodDetail, parseInt(userID.toString()))
      })
    });
  }

  getFoodList(page: number = 1) {
    this.loadingPanel.show();
    let pagination: IPagination = {
      size: 12,
      page: page,
      field: null,
      is_reverse_sort: null
    }
    this.foodService.getList(pagination).subscribe((listFoods: IFoodList | IMessage | any) => {
      this.loadingPanel.hide();
      if (listFoods?.rows) {
        this.listFoods = listFoods;
      } else {
        this.dialogService.show(listFoods?.message);
      }
    });
  }
  formatNumber(number: number) {
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
  }

}
