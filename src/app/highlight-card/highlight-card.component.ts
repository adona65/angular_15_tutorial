import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highlight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlight-card.component.html',
  styleUrls: ['./highlight-card.component.css']
})
export class HighlightCardComponent {
  @Input()
  title = "Untitled content.";
}
