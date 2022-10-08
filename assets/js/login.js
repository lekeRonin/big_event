$(function () {
  // 点击去注册链接
  $('#link-login').on('click', function () {
    $(this).parents('.reg-box').hide().siblings('.login-box').show()
  })

  // 点击去登录链接
  $('#link-reg').on('click', function () {
    $(this).parents('.login-box').hide().siblings('.reg-box').show()
  })

  // 从layUI里获取元素
  const form = layui.form
  const layer = layui.layer

  // 自定义设置表单验证
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],

    // 自定义验证两次密码输入是否一致
    repass: value => {
      // 属性选择器
      const pwd = $('.reg-box [name = password]').val()
      if (pwd !== value) {
        return '两次密码不一致, 请重新输入'
      }
    }
  })

  // 将key = value 转换成json字符串的格式
  
  // 监听表单注册事件
  $('#form-reg').on('submit', function (e) {

    // 阻止默认跳转
    e.preventDefault()
    $.ajax({
      method: `POST`,
      url: '/api/reg',
      contentType: 'application/json',
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        // console.log(res)

        // 模拟人的点击事件
        $('#link-login').click()
      },
      error(err) {
        console.log(err)
      }
    })
  })

  
  // 监听登录表单事件
  $('#form-login').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      method: `POST`,
      url: '/api/login',
      contentType: 'application/json',
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message)
        }

        layer.msg('登录成功')
        localStorage.setItem('token', res.token)

        location.href = './index.html'
      }
    })
 
  //   $.ajax({
  //     method: 'POST',
  //     url: `/api/login`,
  //     data: $('#form-login').serialize(),
  //     success: res => {
  //       if (res.status !== 0) {
  //         return layer.msg('登录失败，用户名或密码错误')
  //       }
  //       layer.msg('登录成功')
  //       // console.log(res.token)

  //       // 将登录成功之后的token保存到本地存储中
  //       localStorage.setItem('token', res.token)
  //       location.href = './index.html'
  //     }
  //   })


  })

})