$(function () { 
    var form = layui.form
    let layer = layui.layer
    form.verify({
        nickname:function (value) { 
           if(value.length> 6) {
            return '昵称必须在1-6字符'
           }
         }
    })

    initUserIofo()


    function initUserIofo() {  
       $.ajax({
        type: "method",
        method:'GET',
        url: "/my/userinfo",

        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('或许用户信息失败')
            }
            
            //调佣formUserInfo form.val
            form.val('formUserInfo',res.data)
            console.log(res)
        }
       }); 
    }

    $('#btnReset').on('click', function (e) {
        //阻止默认重置行为
        e.preventDefault()
        initUserIofo()
    });

    //提交事件
    $('.layui-form').on('submit', function (e) {
                //阻止默认重置行为
                e.preventDefault()
                $.ajax({
                    method:'POST',
                    url: "/my/userinfo",
                    data: $(this).serialize(),
                    success: function (res) {
                        if (res.status!== 0) {
                            return layer.msg('更新失败')
                        }
                        layer.msg('更新成功')
                        //调佣父页面的方法，重新渲染用户的头像和信息
                        window.parent.getUserInfo()
                    }
                });
    });
 })