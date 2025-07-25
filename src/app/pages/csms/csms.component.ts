import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MainComponent } from '../../shared/components/main/main.component';
import { RequestModalComponent } from '../../shared/components/request-modal/request-modal.component';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { section1Component } from '../../shared/components/sections/section1/section1.component';
import { section2Component } from '../../shared/components/sections/section2/section2.component';
import { section3Component } from '../../shared/components/sections/section3/section3.component';
import { section4Component } from '../../shared/components/sections/section4/section4.component';
import { section5Component } from '../../shared/components/sections/section5/section5.component';

@Component({
  selector: 'app-csms',
  standalone: true,
  imports: [
    NavbarComponent,
    section1Component,
    section2Component,
    section3Component,
    section4Component,
    section5Component,
    FooterComponent,
    MainComponent,
    RequestModalComponent,
  ],
  templateUrl: './csms.component.html',
  styleUrls: ['./csms.component.scss'],
})
export class CsmsComponent implements OnInit {
  title = 'csms';
  isRequestModalVisible = false;

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Listen for route parameter changes
    this.route.params.subscribe(params => {
      const langCode = params['lang'];
      if (langCode) {
        this.languageService.setLanguageFromCode(langCode);
      }
    });
  }

  openRequestModal(): void {
    this.isRequestModalVisible = true;
  }
}