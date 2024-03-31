import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dog, StandalonesService} from "../services/standalones.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-dog-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-view.component.html',
  styleUrls: ['./dog-view.component.css']
})
export class DogViewComponent {
  dog$!: Observable<Dog | undefined>;

  /*
   * Dog's id will be passed as router param. So we need to import ActivatedRoute in order to access it.
   */
  constructor(private standalonesService: StandalonesService, private route: ActivatedRoute) {
    // Set up a subscription to the route param changes to be sure we update the data when navigating between pages.
    this.dog$ = this.route.paramMap.pipe(
      map(params => {
        return this.standalonesService.dogs[Number(params.get('index'))]
      })
    );
  }
}
