$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
  
    var layer = layui.layer
    $('#btnLogout').on('click',function () {  
        layer.confirm('是否确定退出',{icon:3,title:'提示'},function (index) {
            //
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index)
          })
    })
    // 点击按钮，实现退出功能

  })
    
    



 var getUserInfo = function() { 
    $.ajax({
        // type: "method",
        method:'GET',
        url: '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (response) {
            console.log(response)
            if (response.status!= 0) {
                return layui.layer.msg('获取用户信息失败')
                
            }
            renderAvatar(response.data)
        },
        // complete: function (res) { 
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //     location.href = '/login.html'
        //     }
        //  }  

        
    });
 }

 function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)
    //3渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
 }

