import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HighlightCardComponent} from "../highlight-card/highlight-card.component";

@Component({
  selector: 'app-ng-optimized-image',
  standalone: true,
  // We can use NgOptimizedImage  directly by importing it into standalone components (or into NgModule). NgOptimizedImage
  // is a standalone directive.
  imports: [CommonModule, HighlightCardComponent, NgOptimizedImage],
  templateUrl: './ng-optimized-image.component.html',
  styleUrls: ['./ng-optimized-image.component.css']
})
export class NgOptimizedImageComponent {
  /*
   * The NgOptimizedImage directive makes it easy to adopt performance best practices for loading images (more details about
   * those enhancements and best practices at https://angular.io/guide/image-directive). To use it we must :
   * - 1) Import it (see upward)
   * - 2) Optionally set up an image loader. If we use a loader with a CDN (content delivery network), it enables powerful
   *      performance features of NgOptimizedImage, including automatic srcsets for our images. More details at :
   *      https://angular.io/guide/image-directive#configuring-an-image-loader-for-ngoptimizedimage
   * - 3) Enable the directive: inside template we replace image's src attribute with ngSrc:
   *      <img ngSrc="cat.jpg" width="400" height="200" priority>
   * - 4) Mark images as priority : Always mark the LCP image on your page as priority to prioritize its loading. Marking
   *      an image as priority applies the following optimizations:
   *        ¤ Sets fetchpriority=high (hints: https://web.dev/articles/fetch-priority?hl=fr)
   *        ¤ Sets loading=eager (details: https://web.dev/articles/browser-level-image-lazy-loading?hl=fr)
   *        ¤ Automatically generates a preload link element if rendering on the server.
   * - 5) Include Height and Width. It's a mandatory step for image to be loaded. We may either
   *        ¤ Define height and width : <img ngSrc="cat.jpg" width="400" height="200">
   *        ¤ Use "fill" mode : <img ngSrc="cat.jpg" fill>. Use this in cas we want our image fill a containing element.
   *          /!\ Beware - important note : For the "fill" image to render properly, its parent element must be styled
   *              with position: "relative", position: "fixed", or position: "absolute".
   *          We this filling mode, we also may use :
   *          * object-fit : https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   *          * object-position : https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
   *
   *      For responsive images (images which we've styled to grow and shrink relative to the viewport), the width and
   *      height attributes should be the intrinsic size of the image file. For responsive images it's also important to
   *      set a value for sizes: https://angular.io/guide/image-directive#responsive-images.
   */

  /*
   * Using placeholders
   *
   * NgOptimizedImage can provide an automatic low-resolution placeholder for our image, as long as we're using a CDN or
   * image host which provides automatic image resizing. This placeholder will be applied while our image loads. We just
   * need to add placeholder attribute:
   *
      <img ngSrc="cat.jpg" width="400" height="200" placeholder>
   *
   * /!\ Beware: If no image loader is provided, no placeholder image can be generated and an error will be thrown.
   * More details: https://angular.io/guide/image-directive#automatic-placeholders
   *
   * Data URL placeholders
   *
   * We can also specify a placeholder using a base64 data URL without an image loader. The data url format is
   * data:image/[imagetype];[data], with:
   * - [imagetype] is the image format (as png)
   * - [data] is a base64 encoding of the image.
   *
   * More details: https://angular.io/guide/image-directive#data-url-placeholders
   */

  /*
   * Performance Features
   *
   * Finally, we'll note that NgOptimizedImage includes a number of features designed to improve loading performance in
   * our app. These features are described here: https://angular.io/guide/image-directive#performance-features.
   */
}
