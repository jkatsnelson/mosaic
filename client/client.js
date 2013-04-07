var getData = window.d = function (imgEl) {
  var canvas = $('canvas')[0],
      width, height, data,
      context = canvas.getContext && canvas.getContext('2d');

  imgEl = canvas;

  if (! canvas) throw new Error('this function needs a canvas el');

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;

  width = canvas.width = imgEl.nat  
  uralWidth || imgEl.offsetWidth || imgEl.width;
  
  context.drawImage(imgEl, 0, 0);
  
  try {
    data = context.getImageData(0, 0, width, height);
  } catch(e) {
    alert('x');
    return [0,0,0];
  }

  return;
};



window.rgb = function getAverageRGB(selector) {
  var blockSize = 5, 
      defaultRGB = [0, 0, 0],
      data, 
      i = -4,
      length,
      rgb = [0, 0, 0],
      count = 0, 
      imgEl = 'string' === typeof selector ? document.querySelector(selector) : selector;
  
  data = getData(imgEl);
  length = data.data.length;
  
  while ( (i += blockSize * 4) < length ) {
    ++count;
    rgb[0] += data.data[i];
    rgb[1] += data.data[i+1];
    rgb[2] += data.data[i+2];
  }
  
  rgb[0] = ~~ (rgb[0] / count);
  rgb[1] = ~~ (rgb[1] / count);
  rgb[2] = ~~ (rgb[2] / count);
  
  return rgb;
}

var getImage = function(url) {
  var image = new Image();
  image.src = url;
  var newCanvas = document.createElement('canvas');
  newCanvas.height = image.height;
  newCanvas.width = image.width;
  $('body').append(newCanvas);
  var context = newCanvas.getContext('2d');
  context.drawImage(image, 0, 0);
};

function grid_img(x, y) {
  var w = innerWidth, h = innerHeight;
  var dx = w / x, dy = h / y;
  var i = 0, j = 0;
  while (i++ < x) {
    j = 0;
    while (j++ < y) tile(dx, dy, i, j);
  }
}


function tile (dx, dy, i, j) {
  var url = window.test_url;
  setTimeout(function () {
    $('<img>').css('position', 'absolute')
      .attr('src', url[ ~~(Math.random() * url.length) ])
      .css('height', dy)
      .css('width', dx)
      .css('left', i * dx)
      .css('top', j * dy)
      .appendTo('body');
    console.log('hi');
  }, i * 10 + j + 10);
  console.log(j, i);
}

if (Meteor.isClient) window.g = grid_img;
Meteor.isClient && (window.test = function () {
  window.test_url.forEach(function (url, i) {
    setTimeout(function (){
      $('<img>').attr('src', url).appendTo('body');
    }, i * 10);
  });
});

Template.hello.events = {
  'click .btn' : function() {
    getImage('http://www.thejunglestore.com/core/media/media.nl?id=37516&c=432681&h=3c579cf84403f4536d5b');
  }
}
console.log(123123);
Meteor.startup(function() {
  var colorArray = [[240,200,139],[15,93,100], [60,200,60], [100,255, 100], [57,57,90], [200, 100, 63], [12,09,80], [1, 1 , 255]];

  var condenseValue = function(array) {
    var resultarray = [];
    for(var i = 0; i < array.length; i++) {
      resultarray.push(pusher.color('rgb', array[i][0], array[i][1], array[i][2]));
    }
    return resultarray;
  }

  var rgbSort = function() {
    array.sort(function(colorA, colorB) {
    return pusher.color(colorA).hue() - pusher.color(colorB).hue();
    })
  };

  var plotColors = function(array) {
    for(var i = 0; i < array.length; i++) {
      $('body').append('<div class="test" style="background: '+ array[i].html() + ';"</div>')
    }
  };

  window.array = colorArray;
    
  window.b = condenseValue;
  window.a = rgbSort;
  window.c = plotColors;
})