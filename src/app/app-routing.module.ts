import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TutorialsHomeComponent} from "./tutorials-home/tutorials-home.component";
import {StandaloneComponentComponent} from "./standalone-components/standalone-component.component";
import {MiscellaneousComponent} from "./miscellaneous/miscellaneous.component";

const routes: Routes = [
  // Redirect by default to TutorialsHomeComponent component.
  { path: '', pathMatch: 'full', component: TutorialsHomeComponent },
  { path: 'standalone', component: StandaloneComponentComponent },
  /*
   * Here, ":index" refers to a param in the url.
   * Also, the "loadComponent" part allow to lazy load our standalone component. "import()" part is a dynamic import, not
   * a static one (we no more need to add "DogViewComponent" to the list of imports of this class). Thanks to this, the dog
   * view component code is lazy loaded in the browser ==> we may see it in browser's dev tool, inside Network tab. The code
   * is downloaded an executed when we click on the corresponding link. We'll se something like "src_app_standalone-components_dog-view_component_ts.js"
   * in the list of network calls. It means the code load is delayed and only happens when the root is loaded.
   *
   * Thanks to this, the application can load and bootstrap faster because the corresponding route was not part of the main
   * bundle and loads separatly only when needed.
   */
  { path: 'details/:index', loadComponent: () => import('./standalone-components/dog-view.component').then(m => m.DogViewComponent) },
  { path: 'image', loadComponent: () => import('./ng-optimized-image/ng-optimized-image.component').then(m => m.NgOptimizedImageComponent) },
  { path: 'miscellaneous', loadComponent: () => import('./miscellaneous/miscellaneous.component').then(m => m.MiscellaneousComponent) },
  // All other paths redirect to TutorialsHomeComponent component.
  { path: '**', redirectTo: '' },

  /*
   * We also may lazy load many routes at once ( aka building a multi-route application using the new router standalone APIs).
   * This is performed thanks to loadChildren operation (every loaded route must use a standalone component):
   *
      // In the main application:
      export const ROUTES: Route[] = [
        {path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES)},
        // ...
      ];

      // In admin/routes.ts:
      export const ADMIN_ROUTES: Route[] = [
        {path: 'home', component: AdminHomeComponent},
        {path: 'users', component: AdminUsersComponent},
        // ...
      ];
   *
   * Providing services to a subset of routes
   *
      // Main application:
      export const ROUTES: Route[] = {
        // Lazy-load the admin routes.
        {path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES)},
        // ... rest of the routes
      }

      // In admin/routes.ts:
      export const ADMIN_ROUTES: Route[] = [{
        // Note the use of an empty-path route to host providers that are shared among all the child routes.
        path: '',
        pathMatch: 'prefix',
        providers: [
          AdminService,
          {provide: ADMIN_API_KEY, useValue: 12345},
        ],
        children: [
          {path: 'users', component: AdminUsersCmp},
          {path: 'teams', component: AdminTeamsCmp},
        ],
      }];
   *
   * This routes ar provided to lazy application using bootstrapApplication  (watch details in standalone-component.component.ts).
   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
