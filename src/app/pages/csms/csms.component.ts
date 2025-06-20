import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Section1Component } from '../../shared/components/sections/section1/section1.component';
import { Section2Component } from '../../shared/components/sections/section2/section2.component';
import { Section4Component } from '../../shared/components/sections/section4/section4.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MainComponent } from '../../shared/components/main/main.component';
import { RequestModalComponent } from '../../shared/components/request-modal/request-modal.component';
import { Section3Component } from '../../shared/components/sections/section3/section3.component';

@Component({
  selector: 'app-csms',
  imports: [
    NavbarComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    FooterComponent,
    MainComponent,
    RequestModalComponent,
  ],
  templateUrl: './csms.component.html',
  styleUrl: './csms.component.scss',
})
export class CsmsComponent {
  title = 'csms';
  isRequestModalVisible = false;

  openRequestModal(): void {
    this.isRequestModalVisible = true;
  }
}
