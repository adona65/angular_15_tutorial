import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighlightCardComponent} from "../highlight-card/highlight-card.component";

@Component({
  selector: 'app-tutorials-home',
  standalone: true,
  imports: [CommonModule, HighlightCardComponent],
  templateUrl: './tutorials-home.component.html',
  styleUrls: ['./tutorials-home.component.css']
})
export class TutorialsHomeComponent {
  title = 'angular_15_tutorial';
}
