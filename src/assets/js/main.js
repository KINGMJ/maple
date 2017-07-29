$(function () {
    //瀑布流初始化
    $('.grid').masonry({
        columnWidth: 'article',
        itemSelector: 'article',
        percentPosition: true
    });

    //点击向下的箭头滚动到文章区域
    $('.indicator').click(function () {
        var scrollTop = $('.site-content').offset().top;
        $('body').animate({scrollTop: scrollTop}, 600);
    });

    //默认滚动到文章列表
    if ($('body').hasClass('paged')) {
        var scrollTop = $('.site-content').offset().top;
        $('body').animate({scrollTop: scrollTop}, 0);
        $('.site-header').removeClass('invisible');
    }

    //显示标签的数量
    if ($('body').hasClass('page-tag_cloud')) {
        var tag_count = $('.tags-container a').length;
        $('.tag-post-num .num').text(tag_count);
    }
});