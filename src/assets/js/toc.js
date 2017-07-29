/*!
 * toc - jQuery Table of Contents Plugin
 * v0.3.2
 * http://projects.jga.me/toc/
 * copyright Greg Allen 2014
 * MIT License
 */
/*!
 * smooth-scroller - Javascript lib to handle smooth scrolling
 * v0.1.2
 * https://github.com/firstandthird/smooth-scroller
 * copyright First+Third 2014
 * MIT License
 */
//smooth-scroller.js

(function ($) {
    $.fn.smoothScroller = function (options) {
        options = $.extend({}, $.fn.smoothScroller.defaults, options);
        var el = $(this);

        $(options.scrollEl).animate({
            scrollTop: el.offset().top - $(options.scrollEl).offset().top - options.offset
        }, options.speed, options.ease, function () {
            var hash = el.attr('id');

            if (hash.length) {
                if (history.pushState) {
                    history.pushState(null, null, '#' + hash);
                } else {
                    document.location.hash = hash;
                }
            }

            el.trigger('smoothScrollerComplete');
        });

        return this;
    };

    $.fn.smoothScroller.defaults = {
        speed: 400,
        ease: 'swing',
        scrollEl: 'body,html',
        offset: 0
    };

    $('body').on('click', '[data-smoothscroller]', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');

        if (href.indexOf('#') === 0) {
            $(href).smoothScroller();
        }
    });
}(jQuery));

(function ($) {
    var verboseIdCache = {};
    $.fn.toc = function (options) {
        var self = this;
        var opts = $.extend({}, jQuery.fn.toc.defaults, options);

        var container = $(opts.container);
        var headings = $(opts.selectors, container);
        var headingOffsets = [];
        var activeClassName = opts.activeClass;

        var scrollTo = function (e, callback) {
            if (opts.smoothScrolling && typeof opts.smoothScrolling === 'function') {
                e.preventDefault();
                var elScrollTo = $(e.target).attr('href');

                opts.smoothScrolling(elScrollTo, opts, callback);
            }
            $('li', self).removeClass(activeClassName);
            $(e.target).parent().addClass(activeClassName);
        };

        //highlight on scroll
        var timeout;
        var prev_top;  //上一次滚动的距离，用来判断滚动的方向
        var highlightOnScroll = function (e) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                if ($('li', self).length == 0) return;
                var top = $(window).scrollTop(),
                    highlighted, closest = Number.MAX_VALUE, index = 0;
                var scroll_direction;
                //判断滚动的方向
                if (top > prev_top) {
                    scroll_direction = 'down';
                } else {
                    scroll_direction = 'up';
                }
                prev_top = top;

                //判断当前滚动到那个元素
                if (top < headingOffsets[0]) {
                    index = 0;
                } else if (top >= headingOffsets[headingOffsets.length - 1]) {
                    index = headingOffsets.length - 1;
                } else {
                    for (var i = 0, c = headingOffsets.length; i < c; i++) {
                        // var currentClosest = Math.abs(headingOffsets[i] - top);
                        if (top < headingOffsets[i]) {
                            index = i - 1;
                            break;
                            // closest = currentClosest;
                        }
                    }
                }
                $('li', self).removeClass(activeClassName);
                highlighted = $('li:eq(' + index + ')', self).addClass(activeClassName).removeClass('hidden');

                var current_li_class = $('.toc-active')[0].className.split(' ')[0];
                var current_h_title = current_li_class.charAt(current_li_class.length - 1);
                var next_li = $('.toc-active').nextAll();
                var prev_li = $('.toc-active').prevAll();

                if (scroll_direction == 'down') {
                    //当前li之前的下一级
                    var prev_low_level_li = $('.toc-active').prevAll('.toc-h' + (parseInt(current_h_title) + 1));
                    $(prev_low_level_li).addClass('hidden');
                    $.each(next_li, function (i, n) {
                        var li_class = n.className.split(' ')[0];
                        var h_title = li_class.charAt(li_class.length - 1);
                        if (h_title < current_h_title) {
                            return false;
                        }
                        if (h_title == current_h_title) {
                            $(n).removeClass('hidden');
                            return true;
                        }
                    });
                    $.each(prev_li, function (i, n) {
                        var li_class = n.className.split(' ')[0];
                        var h_title = li_class.charAt(li_class.length - 1);
                        if (h_title < current_h_title) {
                            var prev_hidden_li = $(n).prevAll('.toc-h' + (parseInt(current_h_title)));
                            prev_hidden_li.addClass('hidden');
                            $(n).removeClass('hidden');
                            return false;
                        }
                        if (h_title == current_h_title) {
                            $(n).removeClass('hidden');
                            return true;
                        }
                    });
                    $('li:eq(0)', self).removeClass('hidden');
                } else {
                    //当前li之后的下一级
                    var next_low_level_li = $('.toc-active').nextAll('.toc-h' + (parseInt(current_h_title) + 1));
                    $(next_low_level_li).addClass('hidden');
                    $.each(prev_li, function (i, n) {
                        var li_class = n.className.split(' ')[0];
                        var h_title = li_class.charAt(li_class.length - 1);
                        if (h_title < current_h_title) {
                            $(n).removeClass('hidden');
                            return false;
                        }
                        if (h_title == current_h_title) {
                            $(n).removeClass('hidden');
                            return true;
                        }
                    });
                    $.each(next_li, function (i, n) {
                        var li_class = n.className.split(' ')[0];
                        var h_title = li_class.charAt(li_class.length - 1);
                        if (h_title < current_h_title) {
                            $(n).nextAll('.toc-h' + (parseInt(current_h_title))).addClass('hidden');
                            return false;
                        }
                        if (h_title == current_h_title) {
                            $(n).removeClass('hidden');
                            return true;
                        }
                    });

                }
                opts.onHighlight(highlighted);
            }, 50);
        };
        if (opts.highlightOnScroll) {
            $(window).bind('scroll', highlightOnScroll);
            highlightOnScroll();
        }
        if (headings.length == 0) return;
        var prev_li_int = parseInt(headings[0].localName.replace('h', ''));   //上一个li
        return this.each(function () {
            //build TOC
            var el = $(this);
            var ul = $(opts.listType);

            headings.each(function (i, heading) {
                var $h = $(heading);
                headingOffsets.push($h.offset().top - opts.highlightOffset);

                var anchorName = opts.anchorName(i, heading, opts.prefix);

                var h_title = parseInt(heading.localName.replace('h', ''));
                //add anchor
                if (heading.id !== anchorName) {
                    var anchor = $('<span/>').attr('id', anchorName).insertBefore($h);
                }

                //build TOC item
                var a = $('<a/>')
                    .text(opts.headerText(i, heading, $h))
                    .attr('href', '#' + anchorName)
                    .bind('click', function (e) {
                        $(window).unbind('scroll', highlightOnScroll);
                        scrollTo(e, function () {
                            $(window).bind('scroll', highlightOnScroll);
                        });
                        el.trigger('selected', $(this).attr('href'));
                    });

                var li = $('<li/>')
                    .addClass(opts.itemClass(i, heading, $h, opts.prefix))
                    .append(a);
                if (h_title > prev_li_int) {
                    li.addClass('hidden');
                } else {
                    prev_li_int = h_title;

                }
                ul.append(li);
            });
            el.html(ul);
        });
    };


    jQuery.fn.toc.defaults = {
        container: 'body',
        listType: '<ul/>',
        selectors: 'h1,h2,h3',
        smoothScrolling: function (target, options, callback) {
            $(target).smoothScroller({
                offset: options.scrollToOffset
            }).on('smoothScrollerComplete', function () {
                callback();
            });
        },
        scrollToOffset: 0,
        prefix: 'toc',
        activeClass: 'toc-active',
        onHighlight: function () {
        },
        highlightOnScroll: true,
        highlightOffset: 100,
        anchorName: function (i, heading, prefix) {
            if (heading.id.length) {
                return heading.id;
            }

            var candidateId = $(heading).text().replace(/[^a-z0-9]/ig, ' ').replace(/\s+/g, '-').toLowerCase();
            if (verboseIdCache[candidateId]) {
                var j = 2;

                while (verboseIdCache[candidateId + j]) {
                    j++;
                }
                candidateId = candidateId + '-' + j;

            }
            verboseIdCache[candidateId] = true;

            return prefix + '-' + candidateId;
        },
        headerText: function (i, heading, $heading) {
            return $heading.text();
        },
        itemClass: function (i, heading, $heading, prefix) {
            return prefix + '-' + $heading[0].tagName.toLowerCase();
        }
    };

})(jQuery);
