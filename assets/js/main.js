// protfolio filters
$(window).on("load", function () {
  var t = $(".portfolio-container");
  t.isotope({
    filter: ".soft_dev",
    animationOptions: {
      duration: 750,
      easing: "linear",
      queue: !1,
    },
  }),
    $(".filters span").click(function () {
      event.preventDefault();
      $(".filters .active").removeClass("active"), $(this).addClass("active");
      var i = $(this).attr("data-filter");
      return (
        t.isotope({
          filter: i,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1,
          },
        }),
        !1
      );
    });
});

// SlideShow
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Get the modal
var img_status = false;
var video_status = false;
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("slider-image");
var modalVid = document.getElementById("slider-video");
var span_image = document.getElementsByClassName("modal-content")[0];

function modelLinkCreator(name, link) {
  let div_node = document.createElement("div");
  let text_node = document.createElement("h3");
  let button_node = document.createElement("button");
  let span1_node = document.createElement("span");
  let span2_node = document.createElement("span");
  let span3_node = document.createElement("span");
  let a_node = document.createElement("a");

  div_node.className = "model_link_div_class";
  div_node.id = "model_link_div_id";
  text_node.className = "model_link_text";
  button_node.id = "learn-more-id";
  button_node.className = "learn-more";
  span1_node.className = "lm-circle";
  span1_node.ariaHidden = "true";
  span2_node.className = "lm-icon lm-arrow";
  span3_node.className = "lm-button-text";
  a_node.href = link;
  a_node.target = "_blank";

  if (name !== "") {
    text_node.appendChild(document.createTextNode(name.toUpperCase()));
    div_node.appendChild(text_node);
  }

  if (link !== "") {
    span3_node.appendChild(document.createTextNode("MORE INFO"));
    span1_node.appendChild(span2_node);
    button_node.appendChild(span1_node);
    button_node.appendChild(span3_node);
    a_node.appendChild(button_node);
    div_node.appendChild(a_node);
  }
  return div_node;
}

function mainTitleCreator(title) {
  // let main_title = "";
  // if (/\<([^)]+)\>/i.test(data)) {
  //   main_title = data.match(/\<([^)]+)\>/)[1];
  // }
  if (title !== "") {
    let div_node = document.createElement("div");
    let title_node = document.createElement("h2");
    div_node.className = "model_title_div_class";
    div_node.id = "model_title_div_id";
    title_node.className = "model_title_text";
    title_node.appendChild(document.createTextNode(title));
    div_node.appendChild(title_node);
    return div_node;
  }
  return null;
}

function generateLinkList(dataList) {
  let linkList = [];
  dataList.forEach((data) => {
    linkList.push(modelLinkCreator(data.name, data.link));
  });
  return linkList;
}

function reset_video_model() {
  modalVid.pause();
  if (document.getElementById("slider-video-source") !== null) {
    document.getElementById("slider-video-source").remove();
  }
  modalVid.load();
}

function openImgCert(details, modal_type = null) {
  let image = details;

  while (document.getElementById("model_link_div_id") !== null) {
    document.getElementById("model_link_div_id").remove();
  }
  if (document.getElementById("model_title_div_id") !== null) {
    document.getElementById("model_title_div_id").remove();
  }
  reset_video_model();

  if (image.src !== undefined) {
    var source = image.src;
    if (/mobile/i.test(source)) {
      source = source.replace("mobile", "scale");
    }
  } else {
    const imageElement = image.getElementsByTagName("img")[0];
    const moreInfoList = JSON.parse(imageElement.getAttribute("moreinfo"));

    var source = imageElement.src;

    let mainTitle = mainTitleCreator(imageElement.alt);
    let linkList = generateLinkList(moreInfoList);

    if (mainTitle !== null) {
      document
        .getElementById("myModal")
        .insertBefore(mainTitle, document.getElementById("slider-image"));
    }
    linkList.forEach((element) => {
      document.getElementById("myModal").appendChild(element);
    });
    document.getElementById("myModal").style.paddingBottom = "10px";

    if (modal_type === "gif") {
      let temp_index = source.lastIndexOf("/");
      source = source.slice(0, temp_index) + "/gifs" + source.slice(temp_index);
      if (/.png/i.test(source) === true) {
        source = source.replace("png", "gif");
      } else if (/.jpg/i.test(source) === true) {
        source = source.replace("jpg", "gif");
      } else if (/.webp/i.test(source) === true) {
        source = source.replace("webp", "gif");
      }
    } else if (modal_type === "video") {
      let temp_index = source.lastIndexOf("/");
      source =
        source.slice(0, temp_index) + "/videos" + source.slice(temp_index);
      if (/.png/i.test(source) === true) {
        source = source.replace("png", "mp4");
      } else if (/.jpg/i.test(source) === true) {
        source = source.replace("jpg", "mp4");
      } else if (/.webp/i.test(source) === true) {
        source = source.replace("webp", "mp4");
      }
    } else if (modal_type === "image") {
      let temp_index = source.lastIndexOf("/");
      source =
        source.slice(0, temp_index) + "/images" + source.slice(temp_index);
    } else {
      let temp_index = source.lastIndexOf("/");
      source =
        source.slice(0, temp_index) + "/scale" + source.slice(temp_index);
    }
  }
  document.querySelector("body").classList.add("disable-scroll");
  modal.style.display = "block";
  modalImg.style.display = "";
  modalVid.style.display = "none";

  if (modal_type === "gif") {
    modalImg.src = source;
  } else if (modal_type === "video") {
    modalVid.style.display = "";
    modalImg.style.display = "none";
    let video_source = document.createElement("source");
    video_source.id = "slider-video-source";
    video_source.src = source;
    video_source.type = "video/mp4";
    modalVid.appendChild(video_source);
  } else {
    modalImg.src = source;
  }
}

span_image.onclick = function () {
  img_status = true;
};

modalVid.onclick = function () {
  video_status = true;
};

modal.onclick = function () {
  if (!img_status && !video_status) {
    modal.style.display = "none";
    modalImg.src = "";
    document.querySelector("body").classList.remove("disable-scroll");
  }
  img_status = false;
  video_status = false;
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot_active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dot_active";
}

window.addEventListener("load", function () {
  document.getElementById("loading").style.display = "none";
  document.querySelector("body").classList.remove("disable-scroll");
});

// ----------------------------------------
// --------- HEADER IMAGE CHANGER ---------
// ----------------------------------------

const headerImages = [
  "header1.webp",
  "header2.webp",
  "header3.webp",
  "header4.webp",
  "header5.webp",
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * headerImages.length);
  return `../assets/imgs/header/${headerImages[randomIndex]}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerElement = document.querySelector(".header");
  headerElement.style.backgroundImage = `
    linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${getRandomImage()})
  `;
});

// ----------------------------------------
// ----------- HEADER TERMINAL ------------
// ----------------------------------------

var TerminalEmulator = {
  init: function (screen) {
    var inst = Object.create(this);
    inst.screen = screen;
    inst.createInput();

    return inst;
  },

  createInput: function () {
    var inputField = document.createElement("div");
    var inputWrap = document.createElement("div");

    inputField.className = "terminal_emulator__field";
    inputField.innerHTML = "";
    inputWrap.appendChild(inputField);
    this.screen.appendChild(inputWrap);
    this.field = inputField;
    this.fieldwrap = inputWrap;
  },

  enterInput: function (input) {
    return new Promise((resolve, reject) => {
      var randomSpeed = (max, min) => {
        return Math.random() * (max - min) + min;
      };

      var speed = randomSpeed(70, 90);
      var i = 0;
      var str = "";
      var type = () => {
        str = str + input[i];
        this.field.innerHTML = str.replace(/ /g, "&nbsp;");
        i++;

        setTimeout(() => {
          if (i < input.length) {
            if (i % 5 === 0) speed = randomSpeed(80, 120);
            type();
          } else {
            setTimeout(() => {
              resolve();
            }, 400);
          }
        }, speed);
      };

      type();
    });
  },

  enterCommand: function () {
    return new Promise((resolve, reject) => {
      var resp = document.createElement("div");
      resp.className = "terminal_emulator__command";
      resp.innerHTML = this.field.innerHTML;
      this.screen.insertBefore(resp, this.fieldwrap);

      this.field.innerHTML = "";
      resolve();
    });
  },

  enterResponse: function (response) {
    return new Promise((resolve, reject) => {
      var resp = document.createElement("div");
      resp.className = "terminal_emulator__response";
      resp.innerHTML = response;
      this.screen.insertBefore(resp, this.fieldwrap);

      resolve();
    });
  },

  wait: function (time, busy) {
    busy = busy === undefined ? true : busy;
    return new Promise((resolve, reject) => {
      if (busy) {
        this.field.classList.add("waiting");
      } else {
        this.field.classList.remove("waiting");
      }
      setTimeout(() => {
        resolve();
      }, time);
    });
  },

  reset: function () {
    return new Promise((resolve, reject) => {
      this.field.classList.remove("waiting");
      resolve();
    });
  },
};

var TE = TerminalEmulator.init(document.getElementById("screen"));

TE.wait(1000, false)
  .then(
    TE.enterInput.bind(
      TE,
      "System Administration | Full-Stack Development | Electronic Development"
    )
  )
  .then(TE.enterCommand.bind(TE, 2000))
  .then(TE.enterInput.bind(TE, "Technical & IT Support "))
  .then(TE.reset.bind(TE));

// ----------------------------------------
// ---------- BACKGROUND THEME ------------
// ----------------------------------------

var Point = function (x, y) {
  this.x = x;
  this.y = y;
};

var Point = function (x, y) {
  this.x = x;
  this.y = y;
};

var Circle = function (rad, centerPoint) {
  this.rad = rad;
  this.centerPoint = centerPoint;
};

var DelaunayDataSet = function (vertex, context) {
  this.vertex = vertex;
  this.context = context;

  this.fillTriangleColor = "#ff0000";
  this.fillTriangleCheck = true;

  this.strokeTriangleColor = "rgba( 255, 255, 255, 0)";
  this.strokeTriangleCheck = true;
};

var TriSettings = [];
var lights = [];
var max_lights = 20;

DelaunayDataSet.prototype.drawLight = function () {
  while (lights.length < max_lights) {
    var light = {
      x: Math.random() * this.context.canvas.width,
      y: Math.random() * this.context.canvas.height,
      angle: Math.random() * 360 * (Math.PI / 180),
      speed: Math.random() * 10,
    };
    lights.push(light);
  }
  for (var i = 0; i < lights.length; i++) {
    var light = lights[i];
    light.x += Math.cos(light.angle) * light.speed;
    light.y += Math.sin(light.angle) * light.speed;
    if (
      light.x < 0 ||
      light.y < 0 ||
      light.x > this.context.canvas.width ||
      light.y > this.context.canvas.height
    ) {
      light.x = Math.random() * this.context.canvas.width;
      light.y = Math.random() * this.context.canvas.height;
      continue;
    }
    with (this.context) {
      fillStyle = "#96c";
      beginPath();
      arc(light.x, light.y, 3, 0, 2 * Math.PI, false);
      shadowColor = "#96c";
      shadowBlur = 30;
      shadowOffsetX = 0;
      shadowOffsetY = 0;
      fill();
      closePath();
    }
  }
  this.context.shadowBlur = 0;
};

DelaunayDataSet.prototype.drawTriangle = function () {
  for (var i = 0; i < this.triangleVertexNumber.length; i += 3) {
    if (
      this.triangleVertexNumber[i] !== 0 &&
      this.triangleVertexNumber[i] !== 1 &&
      this.triangleVertexNumber[i] !== 2 &&
      this.triangleVertexNumber[i + 1] !== 0 &&
      this.triangleVertexNumber[i + 1] !== 1 &&
      this.triangleVertexNumber[i + 1] !== 2 &&
      this.triangleVertexNumber[i + 2] !== 0 &&
      this.triangleVertexNumber[i + 2] !== 1 &&
      this.triangleVertexNumber[i + 2] !== 2
    ) {
      var ctx = this.context;
      var points = [];
      points.push({
        x: this.vertex[this.triangleVertexNumber[i]].x,
        y: this.vertex[this.triangleVertexNumber[i]].y,
      });
      points.push({
        x: this.vertex[this.triangleVertexNumber[i + 1]].x,
        y: this.vertex[this.triangleVertexNumber[i + 1]].y,
      });
      points.push({
        x: this.vertex[this.triangleVertexNumber[i + 2]].x,
        y: this.vertex[this.triangleVertexNumber[i + 2]].y,
      });

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.lineTo(points[2].x, points[2].y);
      ctx.lineTo(points[0].x, points[0].y);

      if (this.fillTriangleCheck) {
        var settings = TriSettings[i];
        if (!settings) {
          var num = (120 + (80 / this.triangleVertexNumber.length) * i) | 0;
          var sp = new Point(
            this.vertex[this.triangleVertexNumber[i]].x,
            this.vertex[this.triangleVertexNumber[i]].y
          );
          var ep = new Point(
            sp.x + 50 + Math.random() * 200,
            sp.y + 50 + Math.random() * 200
          );
          var opacity = 0.05 + Math.random() * 0.2;
          settings = {
            start_point: sp,
            end_point: ep,
            opacity: opacity,
          };
          TriSettings[i] = settings;
        }

        var color = "70,70,70";
        var collision = false;
        for (var l = 0; l < lights.length; l++) {
          var collision = is_in_triangle(
            lights[l].x,
            lights[l].y,
            points[0].x,
            points[0].y,
            points[1].x,
            points[1].y,
            points[2].x,
            points[2].y
          );
          if (collision) {
            color = "153,102,204";
            continue;
          }
        }

        var grad = ctx.createLinearGradient(
          settings.start_point.x,
          settings.start_point.y,
          settings.end_point.x,
          settings.end_point.y
        );
        grad.addColorStop(0, "rgba(0,0,0," + settings.opacity + ")");
        grad.addColorStop(1, "rgba(" + color + "," + settings.opacity + ")");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (this.strokeTriangleCheck) {
        ctx.strokeStyle = this.strokeTriangleColor;
        ctx.stroke();
      }

      ctx.closePath();
    }
  }
};

DelaunayDataSet.prototype.update = function () {
  var vertexNumber = this.vertex.length;
  this.triangleVertexNumber = [0, 1, 2];
  this.circumCircles = [];

  var firstCircle = calculationCircle(
    this.vertex[0],
    this.vertex[1],
    this.vertex[2]
  );
  this.circumCircles.push(firstCircle);

  for (var i = 3; i < vertexNumber; i++) {
    calTriangles(this, i);
    if (i > 3) {
      removeTriangle(this, i);
    }
  }
};

function distanceBetweenPoints(pt1, pt2) {
  var dx = pt2.x - pt1.x;
  var dy = pt2.y - pt1.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function distanceBetweenPointAndCircle(pt, circle) {
  var dx = pt.x - circle.centerPoint.x;
  var dy = pt.y - circle.centerPoint.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function judgeBetweenDistance(_pt, _circle) {
  var dis = distanceBetweenPointAndCircle(_pt, _circle);

  var circleJudge = false;
  if (dis < _circle.rad) {
    circleJudge = true;
  }

  return circleJudge;
}

function calTriangles(_delaunayDataSet, num) {
  var newNumber = num;
  var pt = _delaunayDataSet.vertex[newNumber];

  var tempVertexNumber = [];
  var tempCircles = [];
  var tempNumbers = [];

  for (var i = 0; i < _delaunayDataSet.circumCircles.length; i++) {
    if (judgeBetweenDistance(pt, _delaunayDataSet.circumCircles[i])) {
      tempNumbers.push(i);

      var selectingNum01 = _delaunayDataSet.triangleVertexNumber[3 * i];
      var selectingNum02 = _delaunayDataSet.triangleVertexNumber[3 * i + 1];
      var selectingNum03 = _delaunayDataSet.triangleVertexNumber[3 * i + 2];

      tempVertexNumber.push(selectingNum01);
      tempVertexNumber.push(selectingNum02);
      tempVertexNumber.push(newNumber);

      tempVertexNumber.push(selectingNum02);
      tempVertexNumber.push(selectingNum03);
      tempVertexNumber.push(newNumber);

      tempVertexNumber.push(selectingNum03);
      tempVertexNumber.push(selectingNum01);
      tempVertexNumber.push(newNumber);

      var ct01circle1 = calculationCircle(
        _delaunayDataSet.vertex[selectingNum01],
        _delaunayDataSet.vertex[selectingNum02],
        _delaunayDataSet.vertex[newNumber]
      );
      var ct01circle2 = calculationCircle(
        _delaunayDataSet.vertex[selectingNum02],
        _delaunayDataSet.vertex[selectingNum03],
        _delaunayDataSet.vertex[newNumber]
      );
      var ct01circle3 = calculationCircle(
        _delaunayDataSet.vertex[selectingNum03],
        _delaunayDataSet.vertex[selectingNum01],
        _delaunayDataSet.vertex[newNumber]
      );

      tempCircles.push(ct01circle1);
      tempCircles.push(ct01circle2);
      tempCircles.push(ct01circle3);
    }
  }

  for (i = 0; i < tempVertexNumber.length; i++) {
    _delaunayDataSet.triangleVertexNumber.push(tempVertexNumber[i]);
  }

  for (i = 0; i < tempCircles.length; i++) {
    _delaunayDataSet.circumCircles.push(tempCircles[i]);
  }

  for (i = 0; i < tempNumbers.length; i++) {
    var num = tempNumbers[i] - i;

    var slicedObjectPtNumbers;
    var slicedCircles;

    if (num == 0) {
      slicedObjectPtNumbers = _delaunayDataSet.triangleVertexNumber.slice(3);
      slicedCircles = _delaunayDataSet.circumCircles.slice(1);
    } else {
      var slicedObjectPtNumberBefore =
        _delaunayDataSet.triangleVertexNumber.slice(0, 3 * num);
      var slicedObjectPtNumberAfter =
        _delaunayDataSet.triangleVertexNumber.slice(3 * num + 3);
      slicedObjectPtNumbers = slicedObjectPtNumberBefore.concat(
        slicedObjectPtNumberAfter
      );

      var slicedCircleBefore = _delaunayDataSet.circumCircles.slice(0, num);
      var slicedCircleAfter = _delaunayDataSet.circumCircles.slice(1 + num);
      slicedCircles = slicedCircleBefore.concat(slicedCircleAfter);
    }

    _delaunayDataSet.triangleVertexNumber = slicedObjectPtNumbers;
    _delaunayDataSet.circumCircles = slicedCircles;
  }
}

function calculationCircle(pt01, pt02, pt03) {
  var x1 = pt01.x;
  var y1 = pt01.y;

  var x2 = pt02.x;
  var y2 = pt02.y;

  var x3 = pt03.x;
  var y3 = pt03.y;

  var c = 2.0 * ((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1));
  var tempX =
    ((y3 - y1) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1) +
      (y1 - y2) * (x3 * x3 - x1 * x1 + y3 * y3 - y1 * y1)) /
    c;
  var tempY =
    ((x1 - x3) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1) +
      (x2 - x1) * (x3 * x3 - x1 * x1 + y3 * y3 - y1 * y1)) /
    c;
  var tempPt = new Point(tempX, tempY);

  var tempRad = Math.sqrt(Math.pow(tempX - x1, 2) + Math.pow(tempY - y1, 2));

  return new Circle(tempRad, tempPt);
}

function removeTriangle(_delaunayDataSet, tempVertexNum) {
  var circumcircleArrays = _delaunayDataSet.circumCircles;
  var ommitCircumCircleNumbers = [];

  for (var i = 0; i < circumcircleArrays.length; i++) {
    var vertexNum01 = _delaunayDataSet.triangleVertexNumber[i * 3];
    var vertexNum02 = _delaunayDataSet.triangleVertexNumber[i * 3 + 1];
    var vertexNum03 = _delaunayDataSet.triangleVertexNumber[i * 3 + 2];

    for (var num = 0; num < tempVertexNum; num++) {
      if (num != vertexNum01 && num != vertexNum02 && num != vertexNum03) {
        if (
          judgeBetweenDistance(
            _delaunayDataSet.vertex[num],
            circumcircleArrays[i]
          )
        ) {
          ommitCircumCircleNumbers.push(i);
          break;
        }
      }
    }
  }

  //omit
  var tempCircumCircleArray = [];
  var tempTriagneNumberArray = [];

  for (i = 0; i < circumcircleArrays.length; i++) {
    for (var j = 0; j < ommitCircumCircleNumbers.length; j++) {
      if (ommitCircumCircleNumbers[j] == i) {
        break;
      }
    }

    if (j == ommitCircumCircleNumbers.length) {
      tempTriagneNumberArray.push(_delaunayDataSet.triangleVertexNumber[3 * i]);
      tempTriagneNumberArray.push(
        _delaunayDataSet.triangleVertexNumber[3 * i + 1]
      );
      tempTriagneNumberArray.push(
        _delaunayDataSet.triangleVertexNumber[3 * i + 2]
      );

      tempCircumCircleArray.push(_delaunayDataSet.circumCircles[i]);
    }
  }

  _delaunayDataSet.triangleVertexNumber = [];
  for (i = 0; i < tempTriagneNumberArray.length; i++) {
    _delaunayDataSet.triangleVertexNumber[i] = tempTriagneNumberArray[i];
  }

  _delaunayDataSet.circumCircles = [];
  for (i = 0; i < tempCircumCircleArray.length; i++) {
    _delaunayDataSet.circumCircles[i] = tempCircumCircleArray[i];
  }
}

function initTriangle(context, recWid, recHig, recTop, recLeft) {
  var vertex = [];

  var bigRad = Math.sqrt(Math.pow(recWid, 2) + Math.pow(recHig, 2)) / 2;
  var bigCirclePos = new Point(recWid / 2 + recLeft, recHig / 2 + recTop);

  vertex.push(
    new Point(bigCirclePos.x - Math.sqrt(3) * bigRad, bigCirclePos.y - bigRad)
  );
  vertex.push(
    new Point(bigCirclePos.x + Math.sqrt(3) * bigRad, bigCirclePos.y - bigRad)
  );
  vertex.push(new Point(bigCirclePos.x, bigCirclePos.y + bigRad * 2));

  return new DelaunayDataSet(vertex, context);
}

function is_in_triangle(px, py, ax, ay, bx, by, cx, cy) {
  var v0 = [cx - ax, cy - ay];
  var v1 = [bx - ax, by - ay];
  var v2 = [px - ax, py - ay];

  var dot00 = v0[0] * v0[0] + v0[1] * v0[1];
  var dot01 = v0[0] * v1[0] + v0[1] * v1[1];
  var dot02 = v0[0] * v2[0] + v0[1] * v2[1];
  var dot11 = v1[0] * v1[0] + v1[1] * v1[1];
  var dot12 = v1[0] * v2[0] + v1[1] * v2[1];

  var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

  var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

  return u >= 0 && v >= 0 && u + v < 1;
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

(function () {
  var canvas = document.getElementById("myCanvas");
  var canvasWid = window.innerWidth;
  var canvasHig = window.innerHeight;

  canvas.width = canvasWid;
  canvas.height = canvasHig;

  var context = canvas.getContext("2d");

  var recWid = canvasWid;
  var recHig = canvasHig;

  var recTop = 0;
  var recLeft = 0;

  var delaneyNum = 80;
  var myDelaunayDataSet = initTriangle(
    context,
    recWid,
    recHig,
    recTop,
    recLeft
  );

  var tempPt;
  tempPt = new Point(0, 0);
  myDelaunayDataSet.vertex.push(tempPt);

  tempPt = new Point(canvasWid, 0);
  myDelaunayDataSet.vertex.push(tempPt);

  tempPt = new Point(0, canvasHig);
  myDelaunayDataSet.vertex.push(tempPt);

  tempPt = new Point(canvasWid, canvasHig);
  myDelaunayDataSet.vertex.push(tempPt);

  for (var i = 0; i < delaneyNum - 4; i++) {
    var pt = new Point(
      Math.random() * recWid + recLeft,
      Math.random() * recHig + recTop
    );
    myDelaunayDataSet.vertex.push(pt);
  }

  var mousePos = new Point(canvasWid / 2, canvasHig / 2);
  myDelaunayDataSet.vertex.push(mousePos);

  myDelaunayDataSet.update();
  myDelaunayDataSet.drawTriangle();

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
  }

  loop();

  function loop() {
    context.clearRect(0, 0, canvasWid, canvasHig);
    myDelaunayDataSet.drawTriangle();
    myDelaunayDataSet.drawLight();
    requestAnimFrame(loop);
  }
})();
