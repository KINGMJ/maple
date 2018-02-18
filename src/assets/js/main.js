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

    //标签云
    $.get(
        ghost.url.api('tags', {
            limit: 'all',
            include: 'count.posts',
            order: 'count.posts DESC'
        })
    ).done(onSuccess);
});

function onSuccess(data) {
    console.log(data);
    var html = '';
    $.each(data.tags, function (i, tag) {
        var backgroundImage = 'background-image:url(' + tag.feature_image + ')';
        html += "<a href='/tag/" + tag.slug + "' style='" + backgroundImage + "'>" +
            "<div class='overlay'><h2>" + tag.name + "</h2><button class='info'>Show</button></div></a>";
    });
    $(html).prependTo($('.footer-content-tags'));

    //标签云页面
    if ($('body').hasClass('page-tag_cloud')) {
        $(html).prependTo($('.tags-container'));
        var tag_count = $('.tags-container a').length;
        $('.tag-post-num .num').text(tag_count);
    }


}