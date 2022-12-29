$(function(){
    let form = layui.form
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samePwd:function (value) { 
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
           },
           rePwd:function (value) { 
            if(value !== $('[name=newPwd]').val()){
                return '两次新密码不一致'
            }
            }
    })

    $('.layui-form').on('submit',function (e) { 
        e.preventDefault();
        
        $.ajax({
            method:'POST',
            url: "/my/userinfo",
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新失败')
                }
                layui.layer.msg('更新成功')
                console.log('tijiao')
                $('.layui-form')[0].reset()
            }
        });
    });
}
)