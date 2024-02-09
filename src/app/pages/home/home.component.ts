import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product {
  name: string;
  price: number;
  qty: number;
  additionalDetails: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  products: Product[] = [];

  ngOnInit(): void {
    this.products.push(new Product());
  }

  userDetails = new FormGroup({
    name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required)
  });


  addProduct() {
    this.products.push(new Product());
  }



  generatePDF(txt: string) {
    let docDefinition = {
      content: [
        {
          text: 'ELECTRONIC SHOP',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Products',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.userDetails.value.name,
                bold: true
              },
              { text: this.userDetails.value.address },
              { text: this.userDetails.value.email },
              { text: this.userDetails.value.phone }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        //Tabla
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.products.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        //QR
        {  
          columns: [  
              [{ qr: `${this.userDetails.value.name}`, fit: '50' }],  
              [{ text: 'Signature', alignment: 'right', italics: true }],  
          ]  
        },  
        //Terms and Condition
        {  
          ul: [  
            'Order can be return in max 10 days.',  
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',  
            'This is system generated invoice.',  
          ],  
        }  
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    }
    if (txt === 'Generate')
    {
       pdfMake.createPdf(docDefinition).open();
    }
    else if (txt === 'Download')
    {
       pdfMake.createPdf(docDefinition).download();
    }
  }
}
