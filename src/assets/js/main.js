$(function () {
    //随机显示博客封面
    if (Maple.enableRandomCover) {
        randomSiteCover();
    }

    //点击向下的箭头滚动到文章区域
    $('.indicator').click(function () {
        var scrollTop = $('.site-content').offset().top;
        $('html,body').animate({scrollTop: scrollTop}, 500);
    });

    //默认滚动到文章列表
    if ($('body').hasClass('paged')) {
        var scrollTop = $('.site-content').offset().top;
        $('html,body').animate({scrollTop: scrollTop}, 0);
        $('.site-header').removeClass('invisible');
    }

    //标签云
    $.get(
        ghost.url.api('tags', {
            limit: 24,
            include: 'count.posts',
            order: 'count.posts DESC'
        })
    ).done(onSuccess);
});

function onSuccess(data) {
    var html = '';
    $.each(data.tags, function (i, tag) {
        html += "<a href='/tag/" + tag.slug + "'";
        if (tag.feature_image !== null) {
            var backgroundImage = 'background-image:url(' + tag.feature_image + ')';
            html += "style='" + backgroundImage + "'";
        }
        html += "><div class='overlay'><h2>" + tag.name + "</h2><button class='info'>Show</button></div></a>";
    });
    $(html).prependTo($('.footer-content-tags'));

    //标签云页面
    if ($('body').hasClass('page-tag_cloud')) {
        $(html).prependTo($('.tags-container'));
        var tag_count = $('.tags-container a').length;
        $('.tag-post-num .num').text(tag_count);
    }
}

/**
 * 随机生成博客封面
 */
function randomSiteCover() {
    var randomNum = Math.floor(Math.random() * 30 + 1);
    $('.site-header').css('background-image', "url(" + Maple.blogUrl + "/assets/images/30+wallpaper/bg-cover" + randomNum + ".jpg)");
}