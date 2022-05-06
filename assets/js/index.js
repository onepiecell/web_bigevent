((function () {
    getUserInfo()
    // document.querySelector('.layui-nav-img').style.display = 'none'
    // document.querySelector('.userInfo .layui-nav-img').style.display = 'none'
    // $('.text-avatar').hide()
})())

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            console.log(res)
            // 调用 renderAvatar渲染用户头像

            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log("执行了 complete 回调");
        //     console.log(res);
        //     // 在complete回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })
}

// 渲染用户头像函数
function renderAvatar(user) {

    let name = user.nickname || user.username
    // console.log(name);

    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        // $('.layui-nav-img').arrt('src', user.user_pic).show()
        // console.log(user.user_pic)
        let img = document.querySelector('.userInfo .layui-nav-img').src = user.user_pic
        let img1 = document.querySelector('.layui-nav-img').src = user.user_pic
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}
let layer = layui.layer
// 点击退出按钮，实现退出
$('#btnLogout').on('click', function () {
    layer.confirm('确定要退出?', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 清空本地存储中的 token
        localStorage.removeItem('token')

        location.href = '/login.html'

        // 关闭询问框
        layer.close(index);
    });
})