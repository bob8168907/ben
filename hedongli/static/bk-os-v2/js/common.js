/*
 * 公共js
 */
appearShow();
// 当前页面头部导航高亮
var pathname = location.pathname;
var activeIndex, _path;
if (pathname.split("/").length == 2) {
    _path = 'index';
} else if (pathname.split("/").length == 3) {
    _path = pathname.split("/")[1];
} else {
    _path = 'else';
}

switch (_path) {
    case 'index':
        activeIndex = 0;
        break;
    case 'product':
        activeIndex = 1;
        break;
    case 'download':
        activeIndex = 2;
        break;
    case 'saas':
        activeIndex = 3;
        break;
    case 'cooperation_partner':
        activeIndex = 4;
        break;
    case 'training_certification':
        activeIndex = 5;
        break;
    default:
        activeIndex = -1;
        break;
}
activeIndex >= 0 ? $(".bk-nav li").eq(activeIndex).find("a").addClass("on") : $(".bk-nav li a").removeClass("on");

function appearShow() {
    $(".bk-fade-animate").each(function() {
        var fold = $(window).height() + $(window).scrollTop();
        if (fold > $(this).offset().top) {
            $(this).trigger("appear");
        }
    });
    // header样式切换
    if ($('header').hasClass('no-banner')) {
        return;
    } else {
        if ($(window).scrollTop() > 0) {
            $('header').addClass('bk-header-static').removeClass('bk-header');
        } else {
            $('header').addClass('bk-header').removeClass('bk-header-static');
        }
    }
}

function verfy_param(param, val, thisobject) { //手机号输入验证
    var flag;
    switch (param) {
        case 'phone':
            var pattern = /^1\d{10}$/;
            if (!pattern.test(val)) {
                flag = false;
                thisobject.closest('div').addClass('warning');
            } else {
                flag = true;
                thisobject.closest('div').removeClass('warning')
            }
            break;
        case 'confirm':
            var pattern = /^\d{6}$/;
            if (!pattern.test(val)) {
                flag = false;
            } else {
                flag = true;
            }
            break;
    }
    return flag;
}
var set = null;
var getedCode;
var phoneNum;
var idCodeTrue = false;
$(function() {
    // 导航工作台
    $('.workbench').click(function(event) {
        $(this).siblings('.workbench-list').show();
    });
    // 导航用户名点击
    $('.logged-in').click(function(event) {
        $(this).siblings('.logged-in-list').show();
    });
    // 关闭信息填写弹窗
    $(document).on("click", ".pops-close", function(event) {
        $('.bk-information').fadeOut();
        $('body').css({
            height: 'auto',
            overflow: 'auto'
        })
    });
    //  $('.login-button').click(function(event) {
    //     $('.login-pops').show();
    // });
    $('.login-pops .close').click(function(event) {
        $('.login-pops').hide();
    });
    $('.login-pops-button a').click(function(event) {
        $(this).addClass('active').siblings('a').removeClass('active');
        $(this).closest('div').siblings('div').hide();
        $(this).closest('div').siblings('div').eq($(this).index()).show();
    });
    // 验证参数

    $('.bk-information .user-name').blur(function(event) { //姓名失去焦点验证
        if ($.trim($(this).val()).length < 2) {
            $(this).closest('div').addClass('warning');
        } else {
            $(this).closest('div').removeClass('warning');
        }
    });
    $(".validation_phone").blur(function(event) { //手机号输入验证
        var phone = $.trim($(this).val());
        var thisObject = $(this)
        if (!verfy_param('phone', phone, thisObject)) {
            return false;
        }
    });
    $('.bk-information .email').blur(function(event) { //邮箱输入验证
        var szReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (szReg.test($.trim($(this).val()))) {
            $(this).closest('div').removeClass('warning');
        } else {
            $(this).closest('div').addClass('warning');
        }
    });
    $(".bk-information .verification-code,.bk-information .enterprise-name").blur(function(event) {
        if ($.trim($(this).val()) == "") { //验证码，企业名称不为空
            $(this).closest('div').addClass('warning');
        } else {
            $(this).closest('div').removeClass('warning');
        };
    });
    $('.bk-information .select_industry,.bk-information .select_company,.bk-information .select_position').change(function(event) {
        if ($(this).val() == "") {
            $(this).closest('div').addClass('warning');
        } else {
            $(this).closest('div').removeClass('warning');
        }
    });

    // bk-Tab切换
    $(".bk-paging").on("click", "a", function() {
        $(this).addClass("on").siblings().removeClass("on");
    });
    // 通用bk-new-tab  Tab切换
    $(".bk-new-tab").on("click", "li", function() {
        var _this = $(this);
        var curIndex = _this.index();
        if (_this.hasClass("bk-not-allowed")) {
            return;
        } else {
            _this.addClass("on").siblings().removeClass("on");
            $(".bk-tab-main").children().eq(curIndex).removeClass('hide').siblings().addClass('hide');
        }
    });

    //完善详细验证提交

    $(document).on('click', '.bk-information .submit', function(event) {
        var pattern = /^1[34578]\d{9}$/;
        if (!pattern.test($(".bk-information .user-telephone").val())) {
            showWarning('0', '请输入正确的手机号！');
            return false;
        }

        if (!idCodeTrue) {
            showWarning('0', '请先验证手机号！');
            return false;
        }

        var anum = 0;
        if ($.trim($('.bk-information .user-name').val()).length < 2) { //输入姓名(至少两位)
            $('.bk-information .user-name').closest('div').addClass('warning');
        } else {
            $('.bk-information .user-name').closest('div').removeClass('warning');
            anum = anum + 1;
        }
        var szReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (szReg.test($.trim($('.bk-information .email').val()))) { //验证邮箱
            $('.bk-information .email').closest('div').removeClass('warning');
            anum = anum + 1;
        } else {
            $('.bk-information .email').closest('div').addClass('warning');
        }
        $('.bk-information .empty-validation').each(function(index, el) {
            if ($.trim($(this).val()) == "") { //不为空
                $(this).closest('div').addClass('warning');
            } else {
                $(this).closest('div').removeClass('warning');
                anum = anum + 1;
            };
        });
        if ($('.bk-information .checkbox').children('input').is(':checked')) {
            anum = anum + 1;
        } else {
            showWarning('0', '请先阅读并同意《蓝鲸智云软件许可及服务协议》');
            return false;
        }
        if (anum < $('.bk-information .form-content').length - 1) {
            return false;
        }
        $.ajax({
            method: "post",
            dataType: "json",
            url: site_url + 'personinfo/modify/',
            data: {
                "qq": $(".bk-information .user-qq").val(),
                "name": $(".bk-information .user-name").val(),
                "telephone": $(".bk-information .user-telephone").val(),
                "email": $(".bk-information .user-mail").val(),
                "industry": $(".bk-information .select_industry").val(),
                "scale_company": $(".bk-information .select_company").val(),
                "position": $(".bk-information .select_position").val(),
                "name_company": $(".bk-information .enterprise-name").val(),
                "site_company": $(".bk-information .company-website").val()
            },
            success: function(result) {
                $(".bk-information").fadeOut();
            },
            error: function(result) {
                console.log(result)
            }
        });

    });

    // 跳过完善个人信息
    $(document).on('click', '.bk-information .skip', function(event) {
        $(".bk-information").fadeOut();
        $('body').css({
            height: 'auto',
            overflow: 'auto'
        })
    });

    $(document).on('click', '.getCode', function() {
        var _this = $(this);
        phoneNum = $.trim(_this.prev().val());
        if (/^1[34578]\d{9}$/.test(phoneNum)) {
            // 更换手机号时手机号相同
            if (_this.prev().hasClass("new_phone") && phoneNum == $(".old_number").val()) {
                _this.parent().addClass("warning");
                return;
            } else {
                _this.parent().removeClass("warning");
            }
            // 手机号验证通过-发送验证码-同步请求
            // ajax-start
            getCode(phoneNum);
            // ajax-end
            _this.toggleClass('grayBtn change_verification');
            var secondNum = 60;
            var btnInterval = setInterval(function() {
                if (secondNum > 0) {
                    secondNum--;
                    _this.text(secondNum + 's后重新获取');
                } else {
                    _this.text('获取验证码').toggleClass('grayBtn change_verification');
                    clearInterval(btnInterval);
                }
            }, 1000);
        } else {
            showWarning('0', '请输入正确的手机号码！')
        }

    });

    // 验证码输入验证
    $(document).on("keyup", ".verification-code", function() {
        var pNum = $(this).parents(".form-group").prev().find("input").val();
        var pattern = /^1\d{10}$/;
        if (!pattern.test(pNum)) {
            return;
        }
        var _thisVal = $(this).val();
        var _this = $(this);
        if (_thisVal.length == 6) {
            $.ajax({
                method: "post",
                success: function(result) {
                    if (result.result) {
                        idCodeTrue = true;
                        $('.grayBtn').prev().attr('disabled', 'disabled');
                    } else {
                        // 验证失败
                        if (_this.hasClass("alert-code")) {
                            $(".warning-bar").addClass("warning-bar-alert");
                        } else {
                            $(".warning-bar").removeClass("warning-bar-alert");
                        }
                        idCodeTrue = false;
                        showWarning('-1', '验证码输入错误！');
                    }
                },
                dataType: "json",
                url: site_url + 'send_sms/clouds/verify/',
                data: {
                    "id": getedCode,
                    "telephone": phoneNum,
                    "content": _thisVal
                },
                async: false,
                error: function(result) {
                    console.log(result)
                }
            });
        }
    });
    //完善详细验证提交end

    // 滚至可见区域渐现
    $(window).bind("scroll", function(event) {
        appearShow();
    });

    $(".bk-fade-animate").on("appear", function() {
        $(this).addClass('appear');
    });

    // 下载提示弹窗关闭
    $('.download-pops .close').click(function(event) {
        $('.download-pops').fadeOut();
        clearInterval(set);
    });

});
//关键字标红
function showKeyWords(key) {
    $(".result-list li").each(function() {
        var _thisTitle = $(this).find('h3');
        var _thisContent = $(this).find('p');
        replaceKey(_thisTitle);
        replaceKey(_thisContent);
    });

    function replaceKey(item) {
        var _thisWords = '/(' + key + ')/i';
        var doneStr = item.text().replace(eval(_thisWords), '<span class="red-key-word">$1</span>')
        item.html(doneStr)
    }
}

// 提示框显示函数(code=0  警告 ; code=1 成功 ; code=-1 失败  )
function showWarning(code, words) {
    console.log(words)
    switch (code) {
        case '-1':
            $(".warning-bar").removeClass("success").removeClass("notice").addClass("fail");
            break;
        case '0':
            $(".warning-bar").removeClass("success").removeClass("fail").addClass("notice");
            break;
        case '1':
            $(".warning-bar").removeClass("fail").removeClass("notice").addClass("success");
            break;
        default:
            break;
    }
    $(".warn-text").text(words);
    $(".warning-bar").addClass('bar-on');
    setTimeout(function() {
        $(".warning-bar").removeClass('bar-on');
    }, 3000);
}

function getCode(phoneNum) {
    $.ajax({
        method: "post",
        dataType: "json",
        url: site_url + 'send_sms/clouds/send/',
        data: {
            "telephone": phoneNum
        },
        async: false,
        success: function(result) {
            getedCode = result.data.id;
            console.log(result);
        },
        error: function(result) {
            console.log(result)
        }
    });
}
// 下载前验证是否完善信息
function download_check() {
    showPanel();
    $(document.body).css("overflow-y", "hidden");
    // var time = 5;
    // $(".download-pops-btn p").text(time+"秒后自动关闭");
    // $('.download-pops').fadeIn();
    // set = setInterval(function(){
    //     time--;
    //     $('.download-pops .download-pops-btn p').text(time +'秒后自动关闭');
    //     if( time == 0 ){
    //         $('.download-pops').fadeOut();
    //         clearInterval(set);
    //     }
    // },1000);
}

//下载证书格式验证
function checkMac(mac) {
    var newMac = mac;
    if (mac.charAt(mac.length - 1) == ";") {
        newMac = mac.substring(0, mac.length - 1)
    }
    var macGroup = newMac.split(';');
    var checkFlag = true;
    if (macGroup.length > 3) {
        checkFlag = false;
    } else {
        var res = /^[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
        $.each(macGroup, function(index, value) {
            if (!res.test(value) || value.split(":").length > 6) {
                checkFlag = false;
            }
        });
    }
    return checkFlag;
}

// 判断对象是否是学生
function isStudentOrNot() {
    if ($(".select_industry").val() == "student") {
        $(".select_company").val("0").attr("disabled", "disabled");
        $(".select_position").val("student").attr("disabled", "disabled");
        $(".enterprise-name").attr("placeholder", "输入学校名称").parent().prev().text("学校名称");
    } else {
        $(".select_company").val("").removeAttr("disabled");
        $(".select_position").val("").removeAttr("disabled");
        $(".enterprise-name").attr("placeholder", "输入企业名称").parent().prev().text("企业名称");
    }
}
// 检测必填项是否有为空
function checkMustItem() {
    var checkFlag = true;
    $(".must-item").each(function() {
        if ($(this).val() == '') {
            checkFlag = false;
        }
    });
    return checkFlag;
}

$('.not-allowed').removeAttr('href');
$('.bk-nav').find('.help-con').hover(function() {
    var a = $('.bk-nav-list').parent().siblings().children('a');
    if (a.hasClass('on')) {
        a.addClass('help-hover')
    }
}, function() {
    var a = $('.bk-nav-list').parent().siblings().children('a');
    if (a.hasClass('help-hover')) {
        a.removeClass('help-hover')
    }
});