import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';
import { TableRowReorderEvent } from 'primeng/table';
import { Table } from 'primeng/table';
@Component({
  selector: 'table-rowspan-grouping-demo',
  templateUrl: 'table-rowspan-grouping-demo.html',
})
export class TableRowspanGroupingDemo implements OnInit {
  @ViewChild('dt') table: Table;
  customers!: Customer[];
  selectedCustomers: Customer[] = [];
  constructor(
    private customerService: CustomerService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });
  }

  calculateCustomerTotal(name: string) {
    let total = 0;

    if (this.customers) {
      for (let customer of this.customers) {
        if (customer.representative?.name === name) {
          total++;
        }
      }
    }

    return total;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  }

  // onRowReorder(event: TableRowReorderEvent) {
  //     if (!this.selectedCustomers || this.selectedCustomers.length === 0) return;

  //     // if (this.customers[event.dragIndex].representative.name !== this.customers[event.dropIndex].representative.name) {
  //     //     return;
  //     // }

  //     let reorderedList: any[] = [];
  //     this.customers.forEach(item => {
  //         if (this.selectedCustomers.indexOf(item) === -1) {
  //             reorderedList.push(item);
  //         }
  //     });

  //     reorderedList.splice(event.dropIndex, 0, ...this.selectedCustomers);

  //     this.customers = reorderedList;

  //     this.selectedCustomers = [];
  //     console.log(this.customers);
  // }

  // onRowReorder(event: TableRowReorderEvent) {
  //     if (!this.selectedCustomers || this.selectedCustomers.length === 0) return;

  //     const draggedItems = [...this.selectedCustomers];

  //     this.customers = this.customers.filter(item => this.selectedCustomers.indexOf(item) === -1);

  //     if (this.customers[event.dropIndex] && this.customers[event.dropIndex].representative.name !== draggedItems[0].representative.name) {
  //         draggedItems.forEach(item => item.representative.name = this.customers[event.dropIndex].representative.name);
  //     }

  //     this.customers.splice(event.dropIndex, 0, ...draggedItems);

  //     this.selectedCustomers = [];

  //     console.log(this.customers);
  // }

  onRowReorder(event: TableRowReorderEvent) {
    //     // const draggedRepName = this.customers[event.dragIndex].representative.name;
    //     // const draggedGroup = this.customers.filter(cust => cust.representative.name === draggedRepName);

    //     // let dragStartIndex = this.customers.findIndex(cust => cust.representative.name === draggedRepName);

    //     // let dropIndex = event.dropIndex;
    //     // if (event.dropIndex > dragStartIndex) {
    //     //     dropIndex = dropIndex - draggedGroup.length + 1;
    //     // }

    //     // this.customers.splice(dragStartIndex, draggedGroup.length);

    //     // this.customers.splice(dropIndex, 0, ...draggedGroup);

    //     // this.selectedCustomers = [];
    //     // console.log(this.customers);
    let temp = [...this.customers];
    console.log(temp);
    this.customers[0] = temp[1];
    this.customers[1] = temp[0];
    this.customers = [...this.customers];
    this.cdRef.detectChanges();
    console.log(this.customers);
  }
}
