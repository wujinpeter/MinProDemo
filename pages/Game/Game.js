// pages/Game/Game.js
var startX = 0;
var startY = 0;
var moveX = 0;
var moveY = 0;
var X = 0;
var Y = 0;
var x = 0;
var y = 0;
var snackeHead = {
  color: "#ff0000",
  x: 0,
  y: 0,
  w: 20,
  h: 20,
};
var direction = null;
var snakeDirection = "Right";
var snakeBodys = [];
// Food
var foods = [];
var windowWidth = 0;
var windowHeight = 0;
var coolideBol = true;

Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    // 获取画布上下文
    var context = wx.createContext();
    var frameNum = 0;
    // 绘制
    function draw(obj) {
      context.setFillStyle(obj.color);
      // 开始绘制
      context.beginPath();
      context.rect(obj.x, obj.y, obj.w, obj.h);
      context.closePath();
      context.fill();
    };

    function collide(obj1, obj2) {
      var l1 = obj1.x;
      var r1 = l1 + obj1.w;
      var t1 = obj1.y;
      var b1 = t1 + obj1.h;

      var l2 = obj2.x;
      var r2 = l2 + obj2.w;
      var t2 = obj2.y;
      var b2 = t2 + obj2.h;

      if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
        return true;
      } else {
        return false;
      }
    }

    function animate() {
      frameNum++;
      if (frameNum % 10 == 0) {
        // 拿到head的上一个位置
        snakeBodys.push({
          color: "#333333",
          x: snackeHead.x,
          y: snackeHead.y,
          w: 20,
          h: 20
        });

        if (snakeBodys.length > 4) {
          if (coolideBol) {
            snakeBodys.shift();
          } else {
            coolideBol = true;
          }
        };

        switch (snakeDirection) {
          case "Right":
            snackeHead.x += snackeHead.w;
            break;
          case "Left":
            snackeHead.x -= snackeHead.w;
            break;
          case "Down":
            snackeHead.y += snackeHead.h;
            break;
          case "Up":
            snackeHead.y -= snackeHead.h;
            break;
        };
      }
      // 绘制head
      draw(snackeHead);

      // 如果撞到墙
      if (snackeHead.x < 0 || snackeHead.y < 0 || snackeHead.x > windowWidth || snackeHead.y > windowHeight) {
        snackeHead = {
          color: "#ff0000",
          x: 0,
          y: 0,
          w: 20,
          h: 20
        };
        snakeBodys = [];
        snakeDirection = "Right";
      }

      // 绘制body
      for (var i = 0; i < snakeBodys.length; i++) {
        var snakeBody = snakeBodys[i];
        draw(snakeBody);
      };

      // 绘制food
      for (var i = 0; i < foods.length; i++) {
        var foodObj = foods[i];
        draw(foodObj);
        if (collide(snackeHead, foodObj)) {
          // eat food
          console.log('eat');
          coolideBol = false;
          foodObj.reset();
        }
      };

      wx.drawCanvas({
        canvasId: 'snackCanvas',
        actions: context.getActions()
      });
      requestAnimationFrame(animate);
    }

    function rand(min, max) {
      return parseInt(Math.random() * (max - min));
    }

    function Food() {
      this.x = rand(0, windowWidth - 20);
      this.y = rand(0, windowHeight - 20);
      var w = rand(10, 20);
      this.w = w;
      this.h = w;
      this.color = "rgb(" + rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
      // 重置食物位置
      this.reset = function () {
        this.x = rand(0, windowWidth - 20);
        this.y = rand(0, windowHeight - 20);
        this.color = "rgb(" + rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255) + ")";
      };
    };

    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
        for (var i = 0; i < 20; i++) {
          var foodObj = new Food();
          foods.push(foodObj);
        }
        animate();
      }
    });
  },

  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  canvasStart: function (e) {
    startX = e.touches[0].x;
    startY = e.touches[0].y;
  },
  canvasMove: function (e) {
    moveX = e.touches[0].x;
    moveY = e.touches[0].y;
    X = moveX - startX;
    Y = moveY - startY;
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      direction = "Right";
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      direction = "Left";
    } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      direction = "Down";
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      direction = "Up";
    }
  },
  canvasEnd: function (e) {
    snakeDirection = direction;
  }
})