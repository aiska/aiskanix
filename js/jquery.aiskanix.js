/*!
 * Aiskanix JavaScript Library v 0.0.1
 * http://aiskahendra.wordpress.com/
 *
 * Includes Jquery
 * http://jquery.com/
 *
 * Includes Kinetic JS
 * http://www.kineticjs.com/
 *
 
 * Copyright 2012 by Aiska Hendra and other contributors
 *
 * Date: Thu Oct 25 2012 19:30:00 GMT+7
 */
(function ($) {
    "use strict";
    var methods = {
        init: function (options) {
            var settings = $.extend({
                x: 0,
                y: 0,
                offset: { x: 0, y: 0 },
                width: null,
                height: null,
                images_url: null,
                draggable: true,
                potrait: true,
                rotation: 0,
                scale: 1,
                max_zoom: 0,
                zoom_val: 0,
                edited: false,
                auto_fill_in: true,
                auto_orientation: true,
                stage: null,
                pic: null
            }, options), base = $(this), data = base.data('aiskanix');

            return this.each(function () {
                // If the plugin hasn't been initialized yet
                if (!data) {
                    base.data('aiskanix', settings);

                    // Create Stage
                    methods.create_stage.apply(this);
                }
            });
        },
        create_stage: function () {
            var base = this, data = $(this).data('aiskanix'), layer = new Kinetic.Layer(), group = new Kinetic.Group({ name: 'group', draggable: false });

            // Initialize Stage
            data.stage = new Kinetic.Stage({
                container: this,
                width: data.width,
                height: data.height
            });

            data.offset = { x: (data.width / 2), y: ((data.height / 2) - ((data.height - data.width) / 2)) };
            data.stage.setPosition(data.offset.x, data.offset.y);
            data.stage.setOffset(data.offset.x, data.offset.y);

            layer.add(group);
            data.stage.add(layer);
            $(this).data('aiskanix', data);
            return data.stage;
        },
        show_pic: function (options) {
            var base = this;
            var data = $(this).data('aiskanix');
            data = $.extend(data, options);

            // Jika tidak ada gambar jangan diproses
            if (typeof data.images_url === 'undefined' || data.images_url === null) { return };

            // Get Image
            var img = new Image();
            img.src = data.images_url;
            data.width = (data.width === null) ? img.width : data.width;
            data.height = (data.height === null) ? img.height : data.height;
            data.offset = { x: (img.width / 2), y: (img.height / 2) };

            var pic = new Kinetic.Image({
                name: 'img',
                image: img,
                x: data.x,
                y: data.y,
                offset: data.offset,
                draggable: data.draggable
            });
            pic.on('dragmove', function () {
                data.x = this.attrs.x;
                data.y = this.attrs.y;
                base.data('aiskanix', data);
            });

            data.rotation = 0;
            data.potrait = true;

            var group = data.stage.get(".group")[0];
            if (typeof group === 'undefined' || group === null) {
                //Buat Group
                group = new Kinetic.Group({
                    name: 'layer',
                    draggable: false
                });
            } else {
                group.removeChildren();
            }
            group.add(pic);

            // Ubah Default canvas jika photo landscape
            if (data.auto_orientation) {
                if (pic.attrs.width > pic.attrs.height && !data.edited) {
                    data.rotation = 90;
                    data.potrait = false;
                }
            }

            methods.orientation.apply(this, [data.potrait]);
            methods.rotate_deg.apply(this, [data.rotation]);

            if (data.auto_fill_in) {
                methods.fill_in.apply(this);
            }

            // Draw stage
            data.stage.draw();

            // Update Property
            this.data('aiskanix', data);
        },
        fit_in: function () {
            methods.fit_fill.apply(this, [true]);
        },
        fill_in: function () {
            methods.fit_fill.apply(this, [false]);
        },
        fit_fill: function (fit) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];

            //var imgobj = obj.get(".imageobj")[0];
            if (typeof pic !== 'undefined') {
                var scaleX;
                var scaleY;

                if (data.rotation % 180 === 0) {
                    scaleX = (data.width / pic.attrs.image.width);
                    scaleY = (data.height / pic.attrs.image.height);
                } else {
                    scaleX = (data.width / pic.attrs.image.height);
                    scaleY = (data.height / pic.attrs.image.width);
                }

                if ((scaleX < scaleY && fit) || (scaleX > scaleY && !fit)) {
                    data.scale = scaleX;
                } else {
                    data.scale = scaleY;
                }

                methods.set_center.apply(this);
                methods.set_scale.apply(this, [data.scale]);
            }
        },
        set_scale: function (scale) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];
            if ((data.scale * 2) > data.max_zoom) {
                data.max_zoom = data.scale * 2;
            }

            pic.setScale(data.scale, data.scale);
            pic.getLayer().draw();
            data.zoom_val = parseInt(data.scale / data.max_zoom * 100);
            base.data('aiskanix', data);
        },
        set_scale_persen: function (persen) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];
            methods.set_scale.apply(this, [data.scale]);
        },

        set_center: function (config) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];

            var scale = pic.getScale();
            var width = pic.attrs.width * scale.x;
            var height = pic.attrs.height * scale.y;
            var newX;
            var newY;

            data.x = data.width / 2;
            data.y = data.height / 2;
            pic.setPosition(data.x, data.y);
            pic.getLayer().draw();
            base.data('aiskanix', data);
        },
        move: function (x, y) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];

            if (typeof pic === 'undefined') return;

            if (data.potrait) {
                data.x = pic.attrs.x + x;
                data.y = pic.attrs.y + y;
            } else {
                data.x = pic.attrs.x - y;
                data.y = pic.attrs.y + x;
            }
            pic.setPosition(data.x, data.y);
            pic.getLayer().draw();
            base.data('aiskanix', data);
        },
        rotate: function (cw) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];

            if (typeof pic !== 'undefined' && pic !== null) {
                if (cw) {
                    data.rotation = data.rotation + 90;
                } else {
                    data.rotation = data.rotation - 90;
                }
                methods.rotate_deg.apply(this, [data.rotation]);
            }
        },
        rotate_deg: function (deg) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];

            if (typeof pic !== 'undefined' && pic !== null) {
                data.rotation = deg % 360;
                pic.setRotationDeg(data.rotation);
                pic.getLayer().draw();
                base.data('aiskanix', data);
            }
        },
        orientation: function (potrait) {
            var base = this;
            var data = base.data('aiskanix');
            var pic = data.stage.get('.img')[0];

            if (potrait) {
                data.stage.setSize(data.width, data.height);
                data.stage.setRotationDeg(0);
                data.potrait = true;
            } else {
                data.stage.setSize(data.height, data.width);
                data.stage.setRotationDeg(-90);
                data.potrait = false
            }
            data.stage.draw();
            base.data('aiskanix', data);
        }
    };

    $.fn.aiskanix = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.aiskanix');
        }
    };
})(jQuery);