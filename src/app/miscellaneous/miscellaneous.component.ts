import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HighlightCardComponent} from "../highlight-card/highlight-card.component";

@Component({
  selector: 'app-miscellaneous',
  standalone: true,
  imports: [CommonModule,HighlightCardComponent, NgOptimizedImage],
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent {

}
