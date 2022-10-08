// 注意：每次调用$.get()或$.post()或$.ajax()的时候会先调用

$.ajaxPrefilter(function(options) {
  const formJson = scoure => {
    let target = {}
    scoure.split('&').forEach(el => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
  // 发起请求，统一拼接完整的URL路径
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url

  options.contentType = 'application/json'

  options.data = options.data && formJson(options.data)

  // 统一为有权限的接口，这只header请求头

  // indexOf startWith endWith includes
  if(options.url.indexOf('/my/') !== -1) {
    // headers属性是自定义属性
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  options.complete = cpl => {
    if(cpl.responseJSON?.code === 1 && cpl.responseJSON?.message === '身份认证失败！') {
      localStorage.removeItem('token')
      location.href = './login.html'
    }
  }
})