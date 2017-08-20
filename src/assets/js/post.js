$(document).keydown(function (e) {
    e = e || event;
    if (e.keyCode == 27) // esc键
    {
        exitFullScreen();
        return false;
    }
});

$(function () {
    //代码高亮
    hljs.initHighlightingOnLoad();

    //如果文章没有标题不会显示侧边栏
    var has_toc = $('.md-preview h1,.md-preview h2,.md-preview h3').length > 0;
    if (has_toc) {
        $('.navbar-side').removeClass('hidden');
    }

    //显示或关闭侧边栏
    $('.slide-toc-btn').click(function (e) {
        if ($(e.currentTarget).hasClass('show-toc')) {
            hideSlide(e);
        } else {
            showSlide(e);
        }
        $(e.currentTarget).toggleClass('show-toc');

    });

    //toc滚动设置
    $(window).scroll(function () {
        setTocPosition();
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
        showFullScreenImg(e);
    });

    //退出大图模式
    $('#img_wrapper').click(function () {
        exitFullScreen();
    });

    //为超链接加上target='_blank'属性
    $(document).bind('DOMNodeInserted', function () {
        addBlankTargetForLinks();
    });

    //复制代码
    $('.md-preview pre').hover(function () {
        var div_copy_code = "<a data-toggle='tooltip' data-placement='right' title='点击复制代码' class='copy-code-wrapper' onclick='copyCode(this);'>复制</a>";
        if ($(this).children('.copy-code-wrapper').length <= 0) {
            $(div_copy_code).prependTo($(this));
            var top = $(this).offset().top,
                left = $(this).offset().left + $(this).outerWidth() - $(this).children('.copy-code-wrapper').outerWidth();
            $(this).children('.copy-code-wrapper').offset({
                'top': top,
                'left': left
            });
            $(this).children('.copy-code-wrapper').tooltip();
        }
    }, function () {
        $(this).children('.copy-code-wrapper').remove();
    });

});


function addBlankTargetForLinks() {
    $('.md-preview a[href^="http"]').each(function () {
        $(this).attr('target', '_blank');
    });
}

function showFullScreenImg(e) {
    $('#show_image_layer,#img_wrapper').removeClass('hidden');
    var img_src = $(e.target).attr('src');
    $('#img_wrapper img').attr('src', img_src);
    $('body').css('overflow', 'hidden');
}

function exitFullScreen() {
    if ($('#show_image_layer').hasClass('hidden')) {
        return;
    }
    $('#show_image_layer,#img_wrapper').addClass('hidden');
    $('#img_wrapper img').attr('src', '');
    $('body').removeAttr('style');
}

function copyCode(target) {
    var copy_text = $(target).nextAll('code').text();
    clipboard.copy(copy_text).then(function () {
        $(target).text('已复制');
        $(target).attr('title', "代码已成功复制").tooltip('fixTitle').tooltip('show');
    });
}

// 显示侧边栏
function showSlide(e) {
    $('.navbar-side').css('right', 0);
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
    setTimeout(function () {
        setTocPosition();
    }, 10);
}

//关闭侧边栏
function hideSlide(e) {
    $('.navbar-side').css('right', '-268px');
    $('#toc').empty();
    setTimeout(function () {
        $('.article-left').removeClass('has-side');
    }, 200);
}

//设置toc的位置
function setTocPosition() {
    var max_height = $('.md-preview').offset().top + $('.md-preview').outerHeight() - $('#toc').outerHeight(),
        scroll_top = $(window).scrollTop(),
        header_height = $('header').outerHeight();
    if (scroll_top <= header_height) {
        $('.toc-wrapper').removeClass('position-fixed').addClass('position-absolute').removeAttr('style');
    } else if (scroll_top > header_height && scroll_top <= max_height) {
        $('.toc-wrapper').removeAttr('style');
        $('.toc-wrapper').removeClass('position-absolute').addClass('position-fixed');
    } else {
        $('.toc-wrapper').removeClass('position-fixed')
            .addClass('position-absolute')
            .css("top", max_height - $('.md-preview').offset().top);
    }
}