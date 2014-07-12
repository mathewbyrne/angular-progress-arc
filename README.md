angular-progress-arc
====================

An [AngularJS](https://angularjs.org/) directive for displaying a circular progress meter.

Features
========

- Displays a circular progress meter.
- Utilises SVG for rendering.
- Adjustable dimensions, color and thickness.
- No additional dependencies outside of AngularJS.

Installation
============

    bower install angular-progress-arc
    
Usage
=====

Include the script in your application and include the `angular-progress-arc` module as a dependency in your application module.

    angular.module('myApp', ['angular-progress-arc']);

Add a `progress-arc` element to your application as required.

    <progress-arc
        width="{integer}"
        height="{integer}"
        stroke="{string}"
        stroke-width="{integer}"
        progress="{expression}">
    </progress-arc>

Attributes
----------

- `width` and `height` define the pixel width and height for the svg element.  This will default to 200 × 200.
- `stroke` defines the color of the progress arc. This should be a valid [stroke property](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes#Stroke) for an SVG path element.  If not specified it will default to __black__. 
- `stroke-width` defines the width of the progress arc line in pixels. This should be a value between 1 and half the minimum of `width` and `height`.
- `progress` is an expression that should evaluate to a float value between 0.0 and 1.0; where 0.0 is an empty progress arc, and 1.0 is a full ring.

Styling
=======

As well as using attributes of the directive element, a progress arc can be styled using CSS.

    // Use a more complex selector in your application to avoid styling other SVG elements.
    path {
        stroke: rgba(0, 0, 0, 0.1);
        stroke-linecap: round;
    }

If you use CSS for styling, try to avoid setting a `stroke-width` property since this is used to calculate the position of the arc inside the SVG element.

License
=======

angular-progress-arc is licensed under the MIT license. See LICENSE for details.
