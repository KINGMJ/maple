$(function () {
    //点击向下的箭头滚动到文章区域
    $('.scroll-down').click(function () {
        var scrollTop = $('.site-content').offset().top;
        $('body').animate({scrollTop: scrollTop}, 600);
    });

    $('.grid').masonry({
        columnWidth: 'article',
        itemSelector: 'article',
        percentPosition: true
    });

    if ($('body').hasClass('paged')) {
        var scrollTop = $('.site-content').offset().top;
        $('body').animate({scrollTop: scrollTop}, 0);
    }

    $('#toc').toc({
        'selectors': 'h1,h2,h3', //elements to use as headings
        'container': '.md-preview', //element to find all selectors in
        'prefix': 'toc',
        'highlightOffset': 1, //offset to trigger the next headline
        'anchorName': function (i, heading, prefix) { //custom function for anchor name
            return prefix + i;
        }
    });

    //toc设置
    $(window).scroll(function () {
        var max_height = $('.md-preview').offset().top + $('.md-preview').outerHeight();
        var toc_top = $('#toc').offset().top + $('#toc').outerHeight();

        if ($(window).scrollTop() > $('header').outerHeight()) {
            // if (toc_top > max_height) {
            //     $('#toc').removeClass('toc-fixed').addClass('toc-absolute').css("top", max_height - $('#toc').outerHeight());
            // } else {
            //     $('#toc').removeClass('toc-absolute').addClass('toc-fixed').removeAttr("style");
            // }
            $('#toc').removeClass('toc-absolute').addClass('toc-fixed');
        } else {
            $('#toc').removeClass('toc-fixed').addClass('toc-absolute');
        }
    })
});

