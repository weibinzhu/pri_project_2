export default{
  fontSize (sizeW) {
    var bodyWidth = document.documentElement.clientWidth
    if (bodyWidth > sizeW) {
      bodyWidth = sizeW
    }
    document.documentElement.style.fontSize = bodyWidth / 7.5 + 'px'
    window.onresize = () => {
      bodyWidth = document.documentElement.clientWidth
      if (bodyWidth > sizeW) {
        bodyWidth = sizeW
      }
      document.documentElement.style.fontSize = bodyWidth / 7.5 + 'px'
    }
  }
}
