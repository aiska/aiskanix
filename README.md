#aiskanix
========

## Welcome to Aiskanix Jquery Plugin.
aiskanix.js is JQuery Plugin n kinetic js to editing image using HTML 5

[Download aiskanix.js](https://github.com/aiska/aiskanix/blob/master/js/jquery.aiskanix.js)

[Download aiskanix.min.js (minified 5kb)](https://github.com/aiska/aiskanix/blob/master/js/jquery.aiskanix.min.js)

## Features
* Fit in Image to canvas
* Rotate image clock wise and counter clock wise
* Change display orientation to potrait and landscape.
* Zoom and scale image.
* Move image

## Future Features
* create collage image.
* add Effect on image.
* create color setting, brightness, contrast, saturation, etc.
* Create Stamp and Text on canvas.

##How to use

### Installation
To use the aiskanix component, include the jQuery library and the kineticjs source file into your HTML document:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="http://www.html5canvastutorials.com/libraries/kinetic-v4.0.1.js"></script>
    <script type="text/javascript" src="js/jquery.aiskanix.js"></script>

[HTML]

    <body>
        <div id="aiskanix_canvas"></div>
    </body>

[Javascript]

    <script type="text/javascript">
        $(function () {
            $('#aiskanix_canvas').aiskanix({ width: 300, height: 450 });
        });
    </script>

### Configuration
    .aiskanix( Method, [Options] )
    
    Method: functions
    Options: An array to configure the properties of aiskanix

### Methods
**show_pic(** *config* **)**<br />
Show picture to canvas.

    $('#aiskanix_canvas').aiskanix('show_pic', { images_url: 'img/1.jpg', draggable: true });

**fit_in()**<br />
fit in image to canvas.

    $('#aiskanix_canvas').aiskanix('fit_in');

**fill_in()**<br />
Fill in image to canvas.

    $('#aiskanix_canvas').aiskanix('fill_in');

**move(** *x, y* **)**<br />
Move image to plus x and plus y by pixel.

    // move left 5 pixel
    $('#aiskanix_canvas').aiskanix('move', -5, 0);
    
    // move right 5 pixel
    $('#aiskanix_canvas').aiskanix('move', 5, 0);
    
    // move up 5 pixel
    $('#aiskanix_canvas').aiskanix('move', 0, -5);
    
    // move down 5 pixel
    $('#aiskanix_canvas').aiskanix('move', 0, 5);

**rotate( *cw* )**<br />
Rotate image 90 degree clock wise or counter clock wise.

    //Rotate image to 90 degree clock wise
    $('#aiskanix_canvas').aiskanix('rotate', true);

    //Rotate image to 90 degree counter clock wise
    $('#aiskanix_canvas').aiskanix('rotate', false);

**rotate_deg( *deg* )**<br />
Rotate image by degree of rotation.

    //Rotate image to 45 degree
    $('#aiskanix_canvas').aiskanix('rotate_deg', [45]);


### Options
***width: null*** **(Required)** <br />type: *number* <br />Width of canvas.<br />default : **null**

***height: null*** **(Required)** <br />type: *number* <br />Height of canvas.<br />default : **null**

***images_url: null*** **(Required)** <br />type: *string* <br />url of images.<br />default : **null**

***x: 0*** <br />type: *number* <br />Horizontal Position of image.<br />default : **0**

***y: 0*** <br />type: *number* <br />Vertical Position of image.<br />default : **0**

***offset: { x: 0, y: 0 }*** <br />type: *object* <br />Offset Position of image.<br />default : **{ x: 0, y: 0 }**

***draggable: true*** <br />type: *bool* <br />image can be draggable.<br />default : **true**

***potrait: true*** <br />type: *bool* <br />image orientation, potrait if true and Landscape if false.<br />default : **true**

***rotation: 0*** <br />type: *int* <br />Rotation anggle (in degree) of image.<br />default : **0**

***scale: 1*** <br />type: *float* <br />Scale of image, default is 1, same as original image size scale.<br />default : **1**

***auto_fill_in: true*** <br />type: *bool* <br />If true, image is automatic Fill in when it draw.<br />default : **true**

***auto_orientation: true*** <br />type: *bool* <br />If true, canvas is automaticly set to default orientation of image.<br />default : **true**


## Authors and Contributors
copyright 2012 by Aiska Hendra
Thanks to all Contributors

### Support or Contact
Having problem with this plugin
please contact me at aiska_hendra@yahoo.com
and we’ll help you sort it out.