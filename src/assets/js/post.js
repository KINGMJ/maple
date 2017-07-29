$(function () {
    //初始化toc
    $('#toc').toc({
        'selectors': 'h1,h2,h3', //elements to use as headings
        'container': '.md-preview', //element to find all selectors in
        'prefix': 'toc',
        'highlightOffset': 1, //offset to trigger the next headline
        'anchorName': function (i, heading, prefix) { //custom function for anchor name
            return prefix + i;
        }
    });

    //toc滚动设置
    $(window).scroll(function () {
        var max_height = $('.md-preview').offset().top + $('.md-preview').outerHeight() - $('#toc').outerHeight(),
            scroll_top = $(window).scrollTop(),
            header_height = $('header').outerHeight();
        if (scroll_top <= header_height) {
            $('#toc').removeClass('toc-fixed').addClass('toc-absolute').removeAttr('style');
        } else if (scroll_top > header_height && scroll_top <= max_height) {
            $('#toc').removeClass('toc-absolute').addClass('toc-fixed').removeAttr('style');
        } else {
            $('#toc').removeClass('toc-fixed').addClass('toc-absolute').css("top", max_height);
        }
    });

    //回到顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 300) {
            $('#back_to_top').fadeIn(300);
        } else {
            $('#back_to_top').fadeOut(300);
        }
    });
    $('#back_to_top').click(function () {
        $('html,body').animate({scrollTop: '0px'}, 600);
        return false;
    });
});