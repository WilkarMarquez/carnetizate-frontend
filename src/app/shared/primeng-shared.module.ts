import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from "primeng/badge";
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CheckboxModule} from 'primeng/checkbox';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    CardModule,
    RadioButtonModule,
    TableModule,
    PanelModule,
    ProgressSpinnerModule,
    TooltipModule,
    DialogModule,
    DividerModule,
    AccordionModule,
    BadgeModule,
    SelectButtonModule,
    DataViewModule,
    InputTextModule,
    DropdownModule,
    PanelMenuModule,
    ConfirmDialogModule,
    ImageModule,
    OverlayPanelModule,
    InputTextareaModule,
    KeyFilterModule,
    CheckboxModule,
    InputNumberModule,
    MessagesModule,
    TagModule
  ]
})
export class PrimengSharedModule { }  