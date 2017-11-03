// ajaxRequest(url, 'POST', getSuccess, getError);
/*
url 请求地址
method 请求方式 GET POST
successHandler 请求成功时执行的方法
errorHandler 请求失败时执行的方法
parameter 传参
*/
export default{
  ajaxRequest (url, method, successHandler, errorHandler, parameter) {
    if (window.fetch !== undefined) {
      fetch(url, {
        method: method,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: parameter
        // credentials: 'include' // 这个应该是跨域之后的 cookie 需要后台设置打开
      }).then((response) => {
        // console.log(response);
        // 将json数据转换成对象
        return response.json()
      }).then((indexContentData) => {
        if (successHandler !== undefined) {
          successHandler(indexContentData)
        }
      }).catch((error) => {
        if (errorHandler !== undefined) {
          errorHandler(error)
        }
      })
    }else {
      var xhr = new XMLHttpRequest()
      xhr.open(method, url)
      // xhr.responseType = 'json';
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      var data = parameter;
      xhr.onreadystatechange = (event) => {
        var target = event.target;
        // console.log(1)
        if (target.readyState !== 4) {
          return
        }
        if (target.status === 200 || target.status === 304) {
          var indexContentData = JSON.parse(target.responseText)
          if (successHandler !== undefined) {
            successHandler(indexContentData);
          }
        } else {
          if (errorHandler !== undefined) {
            errorHandler(target.status);
          }
        }
      }
      xhr.send(data);
    }
  }
}
