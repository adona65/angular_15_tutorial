import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StandalonesService} from "../services/standalones.service";
import {HighlightCardComponent} from "../highlight-card/highlight-card.component";
import {DogsListCardsComponent} from "./dogs-list-cards.component";
import {RouterModule} from "@angular/router";

/*
 * Angular's new Standalone Components allows to write angular components, directives and pipers without an associated ng
 * module. Standalone components are self-contained and directly manage their template dependencies. We may focus less on
 * ng modules and more on components, which are becoming the central concept in Angular.
 *
 * What are the benefits of this approach ?
 * - It reduces the friction of creating a new component => less code to write, and less existing files to modify.
 * - Less things to learn => the learning curve is easier to manage.
 * - The self-contained components can be packaged, reused and lazy loaded on their own.
 *
 * Creating a new Standalone Component
 *
 * Standalone Components may be created thanks to ng cli using the regular command ng generate command + "--standalone" option :
 *
      ng generate component StandalonComponent --flat --standalone
 *
 */
@Component({
  selector: 'app-standalon-component',
  // Here we'll note the new Component decorator's  property "standalone". Set to true, our component is now a Standalone component.
  // Thanks to it, our Component doesn't require declaration in any ng module.
  standalone: true,
  /*
   * Here is another property : imports. It's array contains :
   * - CommonModule : allow our component to use ngIf, ngFor and other control flow directives.
   * - HighlightCardComponent : Another standalone component, used to display subject of the page. As a standalone component
   *   is not referenced in ngModule, we need import it here in order to use it in our StandaloneComponentComponent's class
   *   and template.
   * - And so on with others (standalone or not) components.
   *
   * Thus, standalone components explicitly manage their own dependencies.
   *
   */
  imports: [CommonModule, HighlightCardComponent, DogsListCardsComponent],
  templateUrl: './standalone-component.component.html',
  styleUrls: ['./standalone-component.component.css']
})
export class StandaloneComponentComponent {

  // We add classical Angular's Service to get MOC  data to display.
  constructor(readonly standalonesService: StandalonesService) {}

  /*
   * Finally, we will note an application may be bootstrapped without NgModule  by using a standalone component as the application's
   * root component. This is done using the bootstrapApplication API in main.ts file:
   *
      import {bootstrapApplication} from '@angular/platform-browser';
      import {MyCustomComponent} from './app/my.custom.component';

      bootstrapApplication(MyCustomComponent);
   *
   * Configuring dependency injection
   *
   * Dependency injection and providing configuration values or services may also be done when bootstrapping standalone application :
   *
      bootstrapApplication(MyCustomComponent, {
        providers: [
          {provide: BACKEND_URL, useValue: 'https://my.custom.url/api'},
          {provide: PhotosService, useClass: PhotosService}, // Used for DI injection among modules of the application.
          // ...
        ]
      });
   *
   * The standalone bootstrap operation is based on explicitly configuring a list of Providers for dependency injection. In Angular,
   * provide-prefixed functions can be used to configure different systems without needing to import NgModules. For example,
   * provideRouter is used in place of RouterModule.forRoot to configure the router:
   *
       bootstrapApplication(PhotoAppComponent, {
          providers: [
            {provide: BACKEND_URL, useValue: 'https://my.custom.url/api'},
            provideRouter([// app routes //]),
          // ...
        ]
      });
   *
   * Finally, if a third party library only offers an NgModule API for its DI configuration, you can use the importProvidersFrom
   * utility to still use it with bootstrapApplication and other standalone contexts:
   *
      import {LibraryModule} from 'ngmodule-based-library';

      bootstrapApplication(PhotoAppComponent, {
        providers: [
          {provide: BACKEND_URL, useValue: 'https://my.custom.url/api'},
          importProvidersFrom(
            LibraryModule.forRoot()
          ),
        ]
      });
   *
   *
   * Dependency injection and injectors hierarchy
   *
   * Making NgModules optional will require new ways of configuring "module" injectors with application-wide providers.
   * The new bootstrap API gives us back the means of configuring “module injectors” without using NgModules. In this sense,
   * the “module” part of the name is no longer relevant, and we’ve decided to introduce a new term: “environment injectors”.
   * Environment injectors can be configured using one of the following:
   * - @NgModule.providers (in applications bootstrapping through an NgModule);
   * - @Injectable({provideIn: "..."})(in both the NgModule-based and the “standalone” applications);
   * - providers option in the bootstrapApplication call (in fully “standalone” applications);
   * - providers field in a Route configuration.
   *
   * Angular v14 introduces a new TypeScript type EnvironmentInjector to represent this new naming. The accompanying createEnvironmentInjector
   * API makes it possible to create environment injectors programmatically:
   *
      import {createEnvironmentInjector} from '@angular/core';

      const parentInjector = … // existing environment injector
      const childInjector = createEnvironmentInjector([{provide: PhotosService, useClass: CustomPhotosService}], parentInjector);
   *
   * Environment injectors have one additional capability: they can execute initialization logic when an environment injector gets
   * created (similar to the NgModule constructors that get executed when a module injector is created):
   *
      import {createEnvironmentInjector, ENVIRONMENT_INITIALIZER} from '@angular/core';

      createEnvironmentInjector([
        {provide: PhotosService, useClass: CustomPhotosService},
        {provide: ENVIRONMENT_INITIALIZER, useValue: () => {
                console.log("This function runs when this EnvironmentInjector gets created");
        }}
      ])
   *
   */
}
