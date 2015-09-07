/**
 * Created by Spencer-JD on 15/9/2.
 */
function validate() {
    var name = $("#name").val();
    if (name.length < 2) {
        showAlert('inputErr','','请输入姓名');
        return false;
    }

    var mobile = $("#phone").val();
    if (mobile.length == 0) {
        showAlert('inputErr','','请输入手机号码');
        return false;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
        showAlert('inputErr','','手机号输入有误!');
        return false;
    }

    var addr = $("#address").val();
    if (addr.length < 2) {
        showAlert('inputErr','','请输入送达地址');
        return false;
    }

    return true;
}

var payType = 0;

$("#ali-div").click(function () {
    payType = 0;
    $("#ali-img").attr("src", "img/pay_ali_select.png");
    $("#wechat-img").attr("src", "img/pay_wechat_default.png");
})

$("#wechat-div").click(function () {
    payType = 1;
    $("#ali-img").attr("src", "img/pay_ali_default.png");
    $("#wechat-img").attr("src", "img/pay_wechat_select.png");
})

$("#pay").click(function () {
    if (validate()) {
        if(payType==0){
            aliPay();
        } else {
            wechatPay();
        }
    }
})

function aliPay(){
    alert("call ali pay api");
}

function wechatPay(){
    alert("call wechat pay api");
}