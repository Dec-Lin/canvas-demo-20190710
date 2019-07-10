var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

autoSetCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  cations.className = 'actions x'
}
brush.onclick = function () {
  eraserEnabled = false
  cations.className = 'actions'
}
/***********/


function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, 360)
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 2
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  if (document.body.ontouchstart !== undefined) {  //特性检测，检测的是特性而不是设备
    //说明是触屏设备
    canvas.ontouchstart = function (aaa) {
      console.log('开始摸我了')
      console.log(aaa)
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x, y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function (aaa) {
      console.log('边摸边动')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {

        context.clearRect(x - 5, y - 5, 10, 10)


      } else {


        var newPoint = {
          "x": x,
          "y": y
        }

        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint

      }

    }
    canvas.ontouchend = function () {
      console.log('摸完了')
    }
  } else {
    //说明是非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }

    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {

        context.clearRect(x - 5, y - 5, 10, 10)


      } else {


        var newPoint = {
          "x": x,
          "y": y
        }

        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint

      }

    }
    canvas.onmouseup = function (aaa) {
      using = false
    }

  }
}
