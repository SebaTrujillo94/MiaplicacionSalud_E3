import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class FAQPage {}
