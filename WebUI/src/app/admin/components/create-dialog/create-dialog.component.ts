import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { TableService } from '../../../services/http/table.service';
import { MainIngredientService } from '../../../services/http/main-ingredient.service';
import { TypePartyService } from '../../../services/http/type-of-party.service';
import { IMainIngredient } from '../../../models/main-ingredient';
import { ITable } from '../../../models/table';
import { ITypeParty } from '../../../models/type-party';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  name = new FormControl('', [
    Validators.required,
  ]);
  createForm = new FormGroup({
    name: this.name,
  },);
  private tableService: TableService;
  private mainIngredientService: MainIngredientService;
  private typePartyService: TypePartyService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, http: HttpClient, dialog: MatDialog, private router: Router) {
    this.tableService = new TableService(http);
    this.mainIngredientService = new MainIngredientService(http);
    this.typePartyService = new TypePartyService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
  }
  ngOnInit(): void {
    if (this.data.id > 0) {
      if (this.data.for == "ingredient") {
        this.getIngredient();
      } else if (this.data.for == "table") {
        this.getTable();
      } else if (this.data.for == "type-party") {
        this.getTypeParty();
      }
    }
  }
  getTable() {
    this.tableService.getTableInfo(this.data.id).subscribe((table: ITable) => {
      this.createForm.setValue({ name: <string>table.name });
    })
  }
  getTypeParty() {
    this.typePartyService.getTypePartyInfo(this.data.id).subscribe((typeParty: ITypeParty) => {
      this.createForm.setValue({ name: <string>typeParty.name });
    })
  }
  getIngredient() {
    this.mainIngredientService.getById(this.data.id).subscribe((mainIngredient: IMainIngredient) => {
      this.createForm.setValue({ name: <string>mainIngredient.name });
    })
  }
  onSubmit(button: MatButton) {

    if (this.data.id > 0) {
      if (this.data.for == "ingredient") {

      } else if (this.data.for == "table") {

      } else if (this.data.for == "type-party") {

      }
    } else {
      if (this.data.for == "ingredient") {

      } else if (this.data.for == "table") {

      } else if (this.data.for == "type-party") {

      }
    }
    // this.loadingPanel.show();
    // this.userService.createStaff(<IUserSignUp>this.signupForm.value).subscribe((user: IUser | IMessage | any) => {
    //   this.loadingPanel.hide();
    //   if (user.message) {
    //     this.dialogService.show(user.message);
    //   } else {
    //     let message: IMessage = {
    //       message: "New employee is created!",
    //       type_message: "success_dialog"
    //     }
    //     this.dialogService.show(message);
    //   }
    //   button._elementRef.nativeElement.click();
    // });
  }

}
