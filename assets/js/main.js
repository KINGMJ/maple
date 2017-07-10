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
});

