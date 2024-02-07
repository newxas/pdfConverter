import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  userDetails = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });
  

  generatePDF(){

    // let docDefinition = {
    //   header: 'C#Corner PDF Header',  
    //   content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
    // };
    // pdfMake.createPdf(docDefinition).open();  
  }
}
