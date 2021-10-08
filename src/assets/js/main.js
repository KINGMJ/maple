$(function () {
  //随机显示博客封面
  if (Maple.enableRandomCover) {
    randomSiteCover();
  }

  //点击向下的箭头滚动到文章区域
  $(".indicator").click(function () {
    var scrollTop = $(".site-content").offset().top;
    $("html,body").animate({ scrollTop: scrollTop }, 500);
  });

  //默认滚动到文章列表
  if ($("body").hasClass("paged")) {
    var scrollTop = $(".site-content").offset().top;
    $("html,body").animate({ scrollTop: scrollTop }, 0);
    $(".site-header").removeClass("invisible");
  }

  //标签页面移除最后一个没有内容的标签
  removeNoContentTag();
});

/**
 * 随机生成博客封面
 */
function randomSiteCover() {
  var randomNum = Math.floor(Math.random() * 30 + 1);
  $(".site-header").css(
    "background-image",
    "url(" +
      Maple.blogUrl +
      "/assets/images/30+wallpaper/bg-cover" +
      randomNum +
      ".jpg)"
  );
}

function removeNoContentTag() {
  var child = $(".tag-posts").children();
  child.each(function (index, element) {
    var next = $(element).next();
    var hasNext = !!next && next.is("ul");
    if ($(element).is("span") && !hasNext) {
      $(element).remove();
    }
  });
}
