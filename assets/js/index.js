let layer = layui.layer
$(function () {
  getUserInfo()

  // 退出登录
  $('#btnReturn').on('click', function () {

    // 方法一
    layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
      // 清除本地存储
      localStorage.removeItem('token')

      // 跳转到登录注册页面
      location.href = './login.html'

      layer.close(index);
    })

    // 方法二
    // const result = confirm('亲，确定退出吗？')
    // if(result) {
    //   localStorage.removeItem('token')

    //   location.href = './login.html'
    // }


  })
})

const getUserInfo = () => {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success(res) {
      // console.log(res)
      if (res.code !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }

      renderAvatar(res.data)
    }
  })
}

// 渲染用户信息
function renderAvatar(user) {
  // 获取用户名称
  let uname = user.nickname || user.username

  // 渲染用户名称
  $('.welcom').html(`欢迎，${uname}`)

  // 按需渲染用户头像

  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show().siblings('.text-avatar').hide()
  } else {
    let first = uname[0].toUpperCase()
    $('.text-avatar').html(first).show().siblings('.layui-nav-img').hide()
  }
}