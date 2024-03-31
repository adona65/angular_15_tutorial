import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dog} from "../services/standalones.service";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-dogs-list-cards',
  standalone: true,
  /*
   * Concerning RouterModule : as standalone component explicitly imports its template dependencies, we need to add this
   * RouterModule to the list of component imports.
   *
   * This allows us to focus on one of tje major benefits of standalone components : simplified lazy loading. This new
   * functionality in Angular router enables fine-grained lazy loading and code splitting on a component level. To demonstrate
   * it, we will lazy load the details view component : more details in "app-routing.module.ts".
   */
  imports: [CommonModule, RouterModule],
  templateUrl: './dogs-list-cards.component.html',
  styleUrls: ['./dogs-list-cards.component.css']
})
export class DogsListCardsComponent {

  @Input() dog!: Dog;
  @Input() index!: Number;
}
