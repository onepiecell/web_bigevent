
// 需用js重写

// const { default: axios } = require("axios")

// 登录/注册相互切换
(function () {
  // 点击去登陆账号的链接
  document.querySelector('#link_reg').addEventListener('click', () => {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的链接
  document.querySelector('#link_login').addEventListener('click', () => {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 表单验证
  let form = layui.form
  let layer = layui.layer
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ]


    , repwd: function (value) {
      let pwd = document.querySelector('.reg-box #password').value
      // let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })
  // 注册提交事件

  // 注册表单
  document.querySelector('#form_reg').addEventListener('submit', function (e) {
    e.preventDefault()
    let username = document.querySelector('#form_reg [name=username]').value
    let password = document.querySelector('#form_reg [name=password]').value
    let url = '/api/reguser'
    let dataObj = { username: username, password: password }
    // 有问题
    // axios.post(url, dataObj).then(function (res) {
    //   if (res.status !== 0) {
    //     return console.log(res)
    //   }
    //   console.log('注册成功！');
    // })

    $.post(
      url,
      dataObj,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message, {
            time: 1000
          })
        }

        layer.msg("注册成功,请登录", {
          time: 1000
        })
        document.querySelector('#link_login').click()
      }
    )
  })
  // 登录表单
  document.querySelector('#form_login').addEventListener('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/api/login',
      data: $(this).serialize(),

      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })


})()