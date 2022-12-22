$(function () {
  $('#ling_reg a').click(function () { 
    $('.login-box').css('display', 'none');
    $('.reg-box').css('display', 'block');
})

$('#ling_login a').click(function () { 
  $('.login-box').css('display', 'block');
  $('.reg-box').css('display', 'none');
})

//layui 获取form对象
let form = layui.form
let layer = layui.layer
//自定义校验规则-pwd的校验规则
form.verify({
  'pwd':[
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] ,
  'repwd':function (value) { 
    let pwd = $('.reg-box [name=password]').val()
    if (pwd !== value) {
      return '两次密码不一致'
    }
   }
})


//监听注册表单的提交

$('#form_reg').on('submit',function (e) { 
  e.preventDefault()
  let data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
  $.post('/api/reguser', data,
    function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg(res.message);
$('#ling_login a').click()
    },

  );
 })

 //监听登录
 $('#form_login').submit(function (e) { 
  e.preventDefault();
  $.ajax({
    
    type: "method",
    url: "/api/login",
    method:'POST',
    data: $(this).serialize(),
    success: function (response) {
      if (response.status !== 0) {
        return layer.msg(response.message);
      }
      layer.msg(response.message)
      console.log(response.token)
      //跳转到后台主页
      localStorage.setItem('token',response.token)
      location.href = '/index.html'
    }
  });
 });
})