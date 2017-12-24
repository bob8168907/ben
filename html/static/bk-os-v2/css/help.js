// 帮助-视频-类别切换
$(".video-category-list").on("click", "a", function() {
    $(this).addClass("on").siblings().removeClass("on");
    var _thisIndex = $(this).index();
    $(".help-course-video ul").eq(_thisIndex).removeClass("hide").siblings("ul").addClass("hide");
});

// 点赞
$(".bk-item-like i").click(function() {
    if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        var vid = $(this).parents(".else-item-info").siblings("a").attr("vid");
        var curLikes = parseInt($(this).next().text());
        $(this).next().text(curLikes + 1);
        likeAdd(vid);
    }
});

// 浏览量累加
$(".help-course-video").on("click", ".video-list li>a", function() {
    var vid = $(this).attr("vid");
    var curPageviews = $(this).parent().find(".bk-item-views").text();
    $(this).parent().find(".bk-item-views").text(parseInt(curPageviews) + 1);
    pageviewsAdd(vid, curPageviews);
});
//产品简介
var titleRight = $('.detail-title-right').text();
$('.help-nav-list li ').each(function() {
    var titleLeft = $(this).find('a').text();
    console.log(titleLeft == titleRight)
    if (titleLeft == titleRight) {
        $(this).find('a').addClass("active");
    }
});
//控制导航显示隐藏
$('.bk-nav').find('.help-con').hover(function() {
    // debugger
    $(this).find('.helplist').stop().fadeToggle(500);
})
//目录监听滚动条的计算
function listWidth() {
    // debugger
    var top = $(document).scrollTop();
    if (top > 180) {
        var left = parseInt($('.detail-title-right').offset().left);
        var w = parseInt($('.detail-title-right').width());
        // console.log(left);
        $('#toc').css({
            'position': 'fixed',
            'top': 112,
            'left': left + w + 43 + 'px'
        })
    } else {
        $('#toc').css({
            'position': 'absolute',
            'top': 82,
            'left': '105%'
        })
    }
}
//监听返回顶部按钮
function returnTop () {
    var left = parseInt($('.detail-title-right').offset().left);
    var w = parseInt($('.detail-title-right').width());
    var sunBottomHeight = $(document).height()-$(window).scrollTop();
    var countHeight = sunBottomHeight-1220;
    console.log(countHeight)
    console.log(sunBottomHeight);
  
    if(sunBottomHeight<1220){
      $('#return_top').css({
            'left': left + w + 43 + 'px',
            'position': 'fixed',
            'margin-bottom':-countHeight,
            'bottom': 0,
            'cursor': 'pointer'
        });
    }else{
       $('#return_top').css({
            'left': left + w + 43 + 'px',
            'position': 'fixed',
            'margin-bottom':55,
            'bottom': 0,
            'cursor': 'pointer'
        }); 
    }

};
//点击返回顶部
$('.right-help-detail').on('click','#return_top',function(){
    $('html,body').animate({
        scrollTop: 0+ "px"
    },300);
})

$(function() {
    returnTop ();
    $(window).scroll(function() {
        listWidth();
        returnTop ();
    });
    $(window).resize(function() {
        returnTop ();
        listWidth();
    });
});
//更多的显示隐藏
var MAX_SHOW_LI = 5;
$('.doc-category-item .item-list').each(function() {
    var _length = $(this).find('li').length;
    if (_length > MAX_SHOW_LI) {
        for (var i = _length; i > MAX_SHOW_LI; i--) {
            $(this).find('li')[i - 1].remove();
        }
        $(this).parent().find('.more-title').show()
    } else {
        $(this).parent().find('.more-title').hide()
    }
})
// 复制链接
var t;
$(".get-link").stop(true).hover(function() {
    var _this = $(this).find("a");
    _this.show();
}, function() {
    $(this).find("a").hide();
})

$(".get-link a").on("copy", function(e) {
    var linkPanel = $(this);
    var _thisLink = linkPanel.attr("vlink");
    e.clipboardData.clearData(); //清除之前设置的内容
    e.clipboardData.setData("text/plain", _thisLink);
    e.preventDefault();
})

// 浏览量累加函数
function pageviewsAdd(vid, curPageviews) {
    $.ajax({
        url: site_url + 'activity/video/visit/',
        type: 'POST',
        data: {
            'video_id': vid
        },
        dataType: 'json',
        success: function(data) {
            if (data.result == 'True') {
                // var doneObj = eval('$(".video-list li>a[vid='+vid+']")');
                // 当前视频浏览量显示+1
                // doneObj.siblings(".else-item-info").find(".bk-item-views").text(parseInt(curPageviews)+1)
            }
        }
    })
}

// 点赞函数
function likeAdd(vid) {
    $.ajax({
        url: site_url + 'activity/video/like/',
        type: 'POST',
        data: {
            'video_id': vid
        },
        dataType: 'json',
        success: function(data) {
            //
        }
    })
}



// 文章目录js
(function($) {
    var toc = $('#toc');
    // toc config
    toc.toc({
        content: ".markdown-body",
        headings: "h2,h3"
    });
    $('#toc').children('li').children('div').children('li').children('div').css('margin-left', '5px')
    // $('#toc').children('li').children('div').css('display','none')
    //  $('#toc').children('li').hover(function(){
    //    // $(this).children('div').css('display','block')
    //    $(this).children('div').stop().toggle(1000);
    //    // $(this).children('div').stop(true,true); 
    //  })
    //  $('#toc').children('li').each(function(){
    //     $(this).hover(function(){
    //             $(this).children('li').children('div').show();
    //         },function(){
    //             $(this).children('li').children('div').hide();
    //     })
    // });

}(jQuery));


$(function() {
    $("#toc").find('#mCSB_1_container').children('li').css('border-left', '2px solid #e6e6e6');
    // 滚动条MINIMAL-DARK效果
   
})

//主要修定位不准确BUG
if (window.location.hash.indexOf('#') >= 0) {
    $('html,body').animate({
            scrollTop: ($(window.location.hash).offset().top - 70) + "px"
        },
        300);
};
$('#toc a[href^=#][href!=#]').click(function() {
    var target = document.getElementById(this.hash.slice(1));
    if (!target) return;
    var targetOffset = $(target).offset().top - 70;
    $('html,body').animate({
            scrollTop: targetOffset
        },
        300);
    return false;
});