var browserFacts = {
    width: 0,
    height: 0,
    is_mobile: false,
    is_old_msie: false
}
$(".nav-back").bind("click", function(){
    history.back();
});
function showLoadingDialog(){
    $("#BgDiv1").css({ display: "block", height: $(document).height() });
    var yscroll = document.documentElement.scrollTop;
    var screenx=$(window).width();
    var screeny=$(window).height();
    $(".DialogDiv").css("display", "block");
    $(".DialogDiv").css("top",yscroll+"px");
    var DialogDiv_width=$(".DialogDiv").width();
    var DialogDiv_height=$(".DialogDiv").height();
    $(".DialogDiv").css("left",(screenx/2-DialogDiv_width/2)+"px")
    $(".DialogDiv").css("top",(screeny/2-DialogDiv_height/2)+"px")
    $("body").css("overflow","hidden");
}

function hideLoadingDialog(){
    $(".DialogDiv").css("display", "none");
}

if (bowser.ios || bowser.android || bowser.blackberry || bowser.firefoxos) {
    browserFacts.is_mobile = true;
    document.body.classList.add('device-mobile');
} else {
    document.body.classList.add('device-desktop');
}
if (bowser.msie) {
    document.body.classList.add('device-ie');
}
if (bowser.msie && bowser.version <= 10) {
    browserFacts.is_old_msie = true;
    document.body.classList.add('device-ie-old');
}

var swiperShadow = browserFacts.is_mobile ? false : true;
var swiperGutter = browserFacts.is_mobile ? -20 : -80;

// get browser window size
function updateWindowSize(){
    browserFacts.width = $(window).width();
    browserFacts.height = $(window).height();
};

//init home swiper
var swiperConfig = {
    shadow: function() {
        return browserFacts.is_mobile ? false : true;
    },
    gutter: function() {
        return browserFacts.is_mobile ? -24 : -60;
    },
    gutter: function() {
        return browserFacts.is_mobile ? -24 : -60;
    }
}

var swiper = new Swiper('.swiper-home', {
    pagination: '.swiper-pagination',
    effect: 'coverflow',
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    hashnav: true,
    mousewheelControl: true,
// mousewheelForceToAxis: true,
    slideToClickedSlide: true,
    paginationClickable: true,
// loop: true,
// loopedSlides: 100,
    coverflow: {
        rotate: 0,
        stretch: swiperConfig.gutter(),
        depth: 20,
        modifier: 1,
        slideShadows : swiperConfig.shadow()
    }
});

//init single page swiper
var swiper = new Swiper('.swiper-single', {
    pagination: '.swiper-pagination',
    // effect: 'coverflow',
    loop: true,
    autoplay:3000,
    autoplayDisableOnInteraction:false,
    loopedSlides: 100,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    paginationClickable: true
});

//page first loads
$(document).ready(function() {
    updateWindowSize();
});

//browser changes size
$(window).resize(function() {
    updateWindowSize();
});

var data = {};

(function toggleModelSelect() {
    if (browserFacts.is_mobile) {
        var link = $(".select-model-popup");
        var modelSelect = $(".model-select");
        var backdrop = $(".model-select-backdrop");
        link.on("click", function(){
            event.preventDefault();
            modelSelect.stop().toggle();
            backdrop.stop().toggle();
            if($(this).text() === "¥99 立即预订")
            {
                $(this).text("返 回").removeClass("btn-alt");
            }else{
                $(this).text("¥99 立即预订").addClass("btn-alt");
            }
        });

        backdrop.on("click", function() {
            modelSelect.hide();
            backdrop.hide();
            link.text("¥99 立即预订").addClass("btn-alt");
        });
    }
})();

/*
 * 城市选择：
 * 功能点
 * 1,选择后显示当前并获取对应值
 * 2,将获取到的数据存储到本地磁盘*/
var $citySel = $(".citySel");
var $deaultCity = $(".deault-city");
$citySel.change(function()
{
    $.ajax({
        type   :   'post',
        data   :   'city='+$citySel.val(),
        url    :   '/mall/site/city-change',
        success :  function(res){
            var result = $.parseJSON(res);
            if(result.code == 0){
                $deaultCity.text(result.city);
            }else{
                alert(result.message);
            }
        }
    });
    //$.cookie("city",$(this).val(), {path:'/'});
    //
    ////将用户选择的位置动态附加到对应位置
    //$(".location_city").text($.cookie("city")).data("city",$.cookie("city"));
    //$deaultCity.text($.cookie("city"));
    //$(this).find("option[value='"+ $.cookie("city") +"']").attr("selected",true);
});


//if (!$.cookie("city"))
//{
//    $.cookie("city",$citySel.val());
//}
//
//
//$(".location_city").text($.cookie("city")).data("city",$.cookie("city"));
//$deaultCity.text($.cookie("city"));
//$citySel.find("option[value='"+ $.cookie("city") +"']").attr("selected",true);


/*
 * 产品详情页点击提交按钮
 * 1，如果用户没有登录，跳转到登录页登录
 * 2,否则跳转到支付页面*/

var $buyBtn = $("#buyBtn");

$buyBtn.click(function(){

    product_id = $(this).data("product");
    if($.cookie("MOBILE") != "null" && $.cookie("MOBILE") != undefined)
    {
        window.location.href = "/mall/confirm-" + product_id+".html";
    }else{
        window.location.href = "/mall/site/login.html";
    }
});


/*
 * 判断用户是否登录*/
/*
 * 判断是否有cookie*/
var $myMobile = $("#my_mobile");
var $buyPersonInfo = $(".buyPersonInfo");

if($.cookie("MOBILE") != "null" && $.cookie("MOBILE") != undefined)
{

    console.log("登录成功");
    $myMobile.text($.cookie("MOBILE"));
    $("#menu_my_order,#menu_logout,#my_mobile").show();
    //$buyPersonInfo.hide();
    $(".loginBox").hide();
    $("#menu_logout").click(function(){
        //清空用户登录cookie
        if(confirm("您确定要登出吗？"))
        {
            $.cookie("MOBILE",null);
            $.cookie("JMID",null);
            window.location.href = "/mall/site/index";
        }
    });
}else{
    console.log("未登录");
    //$buyPersonInfo.show();
    $(".loginBox").show();
    $("#menu_logout,#menu_my_order").hide();
    $myMobile.hide();
};

/*
 *功能：点击我的订单跳转对应页面
 * 1,如果stutas <= 2 跳转到getInfo.html
 * 2,如果stutas >= 3 跳转到upload_complete.html*/

//获取后台数据
var $myOrder = $("#myOrder");
$myOrder.on("click",function(){
    mobile = $('#login_user_mobile').val();
    $.ajax({
        url:"/mall/order/get-info?mobile="+ mobile,
        type:"GET",
        async:false,
        dataType:"json",
        success:function(data)
        {
            if(data.message == "success")
            {
                if(data.data[0] === null)
                {
                    alert("您还没有任何订单信息，现在可返回首页，选择喜欢的车型下单订车！");
                    window.location.href = "/";
                    return false;
                };
                if(data.data[0].client_status == 1)
                {
                    window.location.href = "/mall/confirm-" + data.data[0].vehicle_type_id+".html";
                }else if(data.data[0].client_status == 2){
                    window.location.href = "/mall/site/audit.html";
                }else if(data.data[0].client_status == 3){
                    window.location.href = "/mall/site/upload_complete.html";
                }else if(data.data[0].client_status == 4){
                    window.location.href = "/mall/site/payment.html";
                }else if(data.data[0].client_status == 5){
                    window.location.href = "/mall/site/delivery.html";
                }
            }
        }
    });
});


$('.x-custom-nav-back').each(function(){
    $(this).click(function(){
        history.back();
    });
});
