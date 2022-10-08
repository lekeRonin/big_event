$(function () {
  const layer = layui.layer
  const form = layui.form
  // 加载分类列表
  loadCateList()
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        console.log(res)
        if (res.code !== 0) {
          return layer.msg('获取文章分类失败')
        }

        let htmlStr = template('tpl-cate', res)

        $('tbody').html(htmlStr)
      }
    })
  }


  let indexAdd = null
  $('#btnAdd').on('click', function () {
    // console.log('ok')
    indexAdd = layer.open({
      type: 1,
      title: '添加分类名称',
      content: $('#addDialog').html(),
      area: ['400px', '240px']
    })
  })

  // 需要通过代理的形式，进行表单的监听事件

  let isEdit = false
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()

    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),
        success(res) {
          if (res.code !== 0) {
            return layer.msg('更新分类失败！')
          }
          layer.msg('更新分类成功')
          layer.close(indexAdd)
          loadCateList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize(),
        success(res) {
          console.log(res)
          if (res.code !== 0) {
            return layer.msg('添加分类失败！')
          }

          layer.msg('添加分类成功')
          layer.close(indexAdd)
          loadCateList()
        }
      })
    }
    isEdit = false

  })



  $('tbody').on('click', '.btnEdit', function () {
    isEdit = true
    // console.log('ok')
    indexAdd = layer.open({
      type: 1,
      title: '修改分类名称',
      content: $('#addDialog').html(),
      area: ['400px', '240px']
    })

    const id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: `/my/cate/info?id=${id}`,
      success(res) {
        if (res.code !== 0) {
          return layer.msg('获取分类详情失败')
        }

        form.val('formFilter', res.data)
      }
    })
  })

  $('tbody').on('click', '.btnDelete', function() {
    const result = confirm('您确定要删除该分类吗')
    const id = $(this).attr('data-id')
    if(result) {
      $.ajax({
        method: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success(res){
          if(res.code !== 0) {
            return layer.msg('删除分类详情失败')
          }

          layer.msg('删除分类详情成功')
          loadCateList()
        }
      })
    }
  })
})