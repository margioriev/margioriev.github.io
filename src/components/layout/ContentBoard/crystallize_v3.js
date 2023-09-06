const geometry = {
  hexagon: {
    sides: 6,
    distribution: {
      squared: {
        nX: function ({ width, d }) {
          return Math.round(width / d)
        },
        nY: function ({ height, d }) {
          return Math.round(height / d)
        },
        center: {
          x: function ({ i, d }) {
            return i * d * 2
          },
          y: function ({ j, d }) {
            return j * d * Math.sqrt(3)
          },
        },
      },
      fit: {
        nX: function ({ width, d }) {
          return Math.round(width / d)
        },
        nY: function ({ height, d }) {
          return Math.round(height / d) + 3
        },
        center: {
          x: function ({ i, j, d }) {
            return 3 * i * d + (j % 2) * 1.5 * d
          },
          y: function ({ j, d }) {
            return (Math.sqrt(3) / 2) * d * j
          },
        },
      },
    },
  },
}

class PolygonPattern {
  constructor({
    d,
    r,
    width,
    height,
    ctx,
    xMouse,
    yMouse,
    color,
    backgroundColor,
    polygon,
    distribution,
    lines,
    areas,
    dpi = 1,
  }) {
    this.n = geometry[polygon].sides
    this.geometryDistribution = geometry[polygon].distribution[distribution]
    this.center = this.geometryDistribution.center
    this.r = r * dpi
    this.d = d * dpi
    this.width = width
    this.height = height
    this.ctx = ctx
    this.color = color
    this.backgroundColor = backgroundColor
    this.polygons = []
    this.nX = this.geometryDistribution.nX.call(undefined, {
      width: width / dpi,
      d,
    })
    this.nY = this.geometryDistribution.nY.call(undefined, {
      height: height / dpi,
      d,
    })
    this.buildPattern()
    this.redraw(xMouse, yMouse, dpi)
    this.polygon = polygon
    this.distribution = distribution
    this.lines = lines
    this.areas = areas
  }

  buildPattern() {
    const { nX, nY, r, d, n, center, lines, areas } = this
    for (var i = 0; i < nX; i++) {
      this.polygons[i] = []
      for (var j = 0; j < nY; j++) {
        const centerArguments = {
          i: i,
          j: j,
          d: d,
        }
        const x = center.x.call(undefined, centerArguments)
        const y = center.y.call(undefined, centerArguments)
        var a = new Polygon({
          x,
          y,
          n,
          r,
          lines,
          areas,
        })
        this.polygons[i][j] = a
      }
    }
  }

  redraw(xMouse, yMouse, dpi = 1) {
    this.ctx.lineWidth = dpi
    this.ctx.beginPath()
    this.ctx.rect(0, 0, this.width, this.height)
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fill()
    for (var i = 0; i < this.nX; i++) {
      for (var j = 0; j < this.nY; j++) {
        this.polygons[i][j].drawPoints(
          this.ctx,
          xMouse * dpi,
          yMouse * dpi,
          this.color,
          this.lines,
          this.areas
        )
      }
    }
  }
}

class Polygon {
  constructor({ x, y, n, r }) {
    this.n = n
    this.r = r
    this.x = []
    this.y = []
    this.c = [x, y]
    for (var i = 0; i <= n + 1; i++) {
      if (i === 0) {
        this.x[0] = x //coord 0 is the center
        this.y[0] = y
      } else {
        this.x[i] = Math.cos((2 * Math.PI * i) / n) * r + x
        this.y[i] = Math.sin((2 * Math.PI * i) / n) * r + y
      }
    }
  }

  drawPoints(ctx, xMouse, yMouse, color, lines, areas) {
    ctx.strokeStyle = color

    // Fill Areas
    if (areas) {
      areas.list.forEach((area) => {
        const { pathPoints, mouseReplace } = area
        ctx.fillStyle = areas.color || area.color
        ctx.beginPath()
        pathPoints.forEach((point, index) => {
          const pointKey = point.toString()
          if (index === 0) {
            if (this.isInside(xMouse, yMouse) && mouseReplace) {
              // If it is the fisrt point and mouse coords replaces it
              ctx.moveTo(xMouse, yMouse) // move to center
            } else {
              ctx.moveTo(this.x[pointKey], this.y[pointKey]) // move to point
            }
          } else {
            ctx.lineTo(this.x[pointKey], this.y[pointKey])
          }
        })
        ctx.fill()
        ctx.closePath()
      })
    }

    // Draw Lines
    if (lines) {
      lines.list.forEach((line) => {
        const {
          points,
          points: { a, b },
          mouseJointPoint,
        } = line
        const mouseJoint = points[mouseJointPoint]
        ctx.strokeStyle = color || lines.color || line.color
        ctx.beginPath()
        if (this.isInside(xMouse, yMouse) && mouseJointPoint) {
          ctx.moveTo(xMouse, yMouse)
          ctx.lineTo(this.x[mouseJoint], this.y[mouseJoint])
        } else {
          ctx.moveTo(this.x[a], this.y[a])
          ctx.lineTo(this.x[b], this.y[b])
        }
        ctx.stroke()
        ctx.closePath()
      })
    }
  }

  // End of the Crystallize library authored by Margiorie Vielma.

  // This is the JavaScript version of the Point Inclusion in Polygon Test authored by Randolph Franklin
  // Copyright (c) 1970-2003, Wm. Randolph Franklin
  isInside(x, y) {
    let c = false
    for (let i = 1, j = this.n; i < this.n + 1; j = i++) {
      if (
        this.y[i] > y !== this.y[j] > y &&
        x <
        ((this.x[j] - this.x[i]) * (this.y[i] - y)) /
        (this.y[i] - this.y[j]) +
        this.x[i]
      ) {
        c = !c
      }
    }
    return c
  }
} // End of Point Inclusion in Polygon Test

//Some code to generate points that follows Bezier curves using De Casteljau's Algorithm
function deCasteljauPoint(t, p0, p1, p2, p3) {
  var cX = 3 * (p1.x - p0.x),
    bX = 3 * (p2.x - p1.x) - cX,
    aX = p3.x - p0.x - cX - bX

  var cY = 3 * (p1.y - p0.y),
    bY = 3 * (p2.y - p1.y) - cY,
    aY = p3.y - p0.y - cY - bY

  var x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x
  var y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y

  return { x: x, y: y }
}

class CurvedPath {
  constructor({ width, height }) {
    this.width = width
    this.height = height
    this.points = []
    this.p0 = { x: 0, y: 0 }
    this.p1 = { x: this.randomInX(), y: this.randomInY() }
    this.p2 = { x: this.randomInX(), y: this.randomInY() }
    this.p3 = { x: this.randomInX(), y: this.randomInY() } // using 4 control points for a 3rd degree Bernstein polynomial
    this.accuracy = 0.01
    this.initializePoints({ fromStart: true })
  }

  randomInX = () => {
    return Math.random() * this.width
  }

  randomInY = () => {
    return Math.random() * this.width
  }

  initializePoints = ({ fromStart = true }) => {
    if (!fromStart) {
      this.p0 = this.p3
      this.p1 = { x: this.randomInX(), y: this.randomInY() }
      this.p2 = { x: this.randomInX(), y: this.randomInY() }
      this.p3 = { x: this.randomInX(), y: this.randomInY() }
    }
    for (var i = 0; i < 1; i += this.accuracy) {
      var p = deCasteljauPoint(i, this.p0, this.p1, this.p2, this.p3)
      this.points.push(p)
    }
  }

  nextPoint = () => {
    if (this.points.length === 0) {
      this.initializePoints({ fromStart: false })
    }
    return this.points.splice(0, 1)[0]
  }
}

//Helper functions
var hasTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints

var dpi = window.devicePixelRatio || 1

function isMobile() {
  //from http://detectmobilebrowsers.com/
  let check = false
    ; (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true
    })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}
