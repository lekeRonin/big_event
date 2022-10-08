$(function() {
  let form = layui.form
  let layer =layui.layer


  form.verify({
    nickname: function(value) {
      if(value.length > 6) {
        return '用户昵称的长度必须在1-6个字符之间'
      }
    }
  })
  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method:'GET',
      url: '/my/userinfo',
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
  
        // console.log(res)
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 表单重置事件
  $('#btnReset').on('click', function(e) {
    // console.log('ooo')
    e.preventDefault()
    initUserInfo()
  })
  
  // 监听表单提交事件
  $('.layui-form').on('submit', function(e) {
    // 阻止表单默认行为
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success(res) {
        if(res.status !== 0) {
          return layer.msg('用户更新信息失败！')
        }

        layer.msg('用户更新信息成功！')
        // 在本页面中调用父页面中的方法渲染用户头像

        window.parent.getUserInfo()
      }
    })
  })
})

