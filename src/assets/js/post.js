$(function () {
    //代码高亮
    hljs.initHighlightingOnLoad();

    //如果文章没有标题不会初始化toc
    var has_toc = $('.md-preview h1,.md-preview h2,.md-preview h3').length > 0;
    if (has_toc) {
        //显示侧边栏
        $('.navbar-side').removeClass('hidden');
        $('.article-left').addClass('has-side');

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
    }


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
            $('#toc').removeClass('toc-fixed').addClass('toc-absolute').css("top", max_height - $('.md-preview').offset().top);
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

    //点击看大图
    $('.md-preview img').click(function (e) {
        $('#show_image_layer,#img_wrapper').removeClass('hidden');
        var img_src = $(e.target).attr('src');
        $('#img_wrapper img').attr('src', img_src);
        $('body').css('overflow', 'hidden');
    });

    //退出大图模式
    $('#img_wrapper').click(function () {
        $('#show_image_layer,#img_wrapper').addClass('hidden');
        $('#img_wrapper img').attr('src', '');
        $('body').removeAttr('style');
    });
});