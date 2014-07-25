angular-progress-arc
====================

An [AngularJS](https://angularjs.org/) directive for displaying a circular progress meter.

<p align="center"><img src="http://mathewbyrne.github.io/angular-progress-arc/img/arcs.png" /></p>

[Demo](http://mathewbyrne.github.io/angular-progress-arc/)

Features
========

- Displays a circular progress meter.
- Utilises SVG for rendering.
- Adjustable dimensions, color and thickness.
- No additional dependencies outside of AngularJS.

Installation
============

This module can be installed using bower:

```shell
bower install angular-progress-arc --save
```

Otherwise, simply add the `angular-progress-arc.min.js` file to your project. 
    
Usage
=====

Include the script in your application and include the `angular-progress-arc` module as a dependency in your application module.

```javascript
angular.module('myApp', ['angular-progress-arc']);
```

Add a `progress-arc` element to your application as required.

```html
<progress-arc
    size="{integer}"
    stroke="{string}"
    stroke-width="{integer}"
    complete="{expression}"
    counter-clockwise="{string}"
    background="{string}">
</progress-arc>
```

Attributes
----------

- `size` defines the pixel width and height for the svg element.  This defaults to __200__.
- `stroke` defines the color of the progress arc. This should be a valid [stroke property](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes#Stroke) for an SVG circle element.  This defaults to __black__. 
- `stroke-width` defines the width of the progress arc line in pixels. This should be a value between 1 and `size` / 2. This defaults to __20__.
- `complete` is an expression that should evaluate to a float value between 0.0 and 1.0; where 0.0 is an empty progress arc, and 1.0 is a full ring.
- `counter-clockwise` is a boolean value that will render the progress arc in a counter-clockwise direction.
- `background` defines the color of the ring background. If not defined, no background is rendered. 

Styling
=======

As well as using attributes of the directive element, a progress arc can be styled using CSS. 

```css
// Use a more complex selector in your application to avoid styling other SVG elements.
circle {
    stroke: rgba(0, 0, 0, 0.1);
    stroke-linecap: round;
}
```

The `stroke-dashoffset` property is used to render the position of the progress arc, so adding a transition for this property will result in smoother transitions between progress values.

```css
circle {
    transition: stroke-dashoffset 0.1s linear;
}
```

If you use CSS for styling, avoid setting the following properties that are used to calculate the progress arc position:
- `stroke-width`
- `stroke-dasharray`
- `stroke-dashoffset`

Defaults
========

This module provides a service for configuring application-wide defaults for `progress-arc` directives.  To change default values, inject the `progressArcDefaultsProvider` into your module's config method:

```javascript
myApp.config(['progressArcDefaultsProvider', function (progressArcDefaultsProvider) {
    progressArcDefaultsProvider
        .setDefault('background', '#aaa')
        .setDefault('size', 300);
});
```

The values you can configure this way are `size`, `strokeWidth`, `stroke` and `background`.

License
=======

angular-progress-arc is licensed under the MIT license. See LICENSE for details.
