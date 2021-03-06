var getData = window.d = function (imgel) {
  var canvas = $('#hidden')[0],
      width, height, data,
      context = canvas.getContext('2d');

  if (imgel) {
    if (! canvas) throw new error('this function needs a canvas el');
    height = canvas.height = 500;
    width = canvas.width = 500;
    
    context.drawImage(imgel, 0, 0);
  }
  
  try {
    data = context.getImageData(0,
                                0,
                                width || canvas.width,
                                height || canvas.height
                               );
  } catch(e) {
    throw new Error(e);
  }

  return data;
};

image_to_canvas = function(binary) {
  var ctx, img;

  img = new Image();
  img.src = 'data:image/jpeg;base64,' + binary;
  ctx = document.getElementById('c').getContext('2d');
  return img.onload = function() {
    return ctx.drawImage(img, 0, 0);
  };
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
};

urlArray = [];

var getArray = function() {
  if (Images) {
    var shit = Images.find({}).fetch();
    for(var i = 0; i < shit.length; i++) {
      console.log(shit[i].body);
      urlArray.push(shit[i].body);
    }
  }
};

window.fucker = getArray;

var getImage = function(binary) {
  var image = new Image();
  image.src = 'data:image/jpeg;base64,' + binary;
  var newCanvas = document.createElement('canvas');
  newCanvas.height = image.height;
  newCanvas.width = image.width;
  $('body').append(newCanvas);
  var context = newCanvas.getContext('2d');
  context.drawImage(image, 0, 0);
};

var context;

//grid x = how many aside y = height
function grid_img(x, y, arr) {
  fucker();
  arr = urlArray;
  var w = innerWidth, h = innerHeight;
  var dx = w / x, dy = h / y;
  var newCanvas = $('canvas')[0];
  newCanvas.height = y * dy;
  newCanvas.width = x * dx;
  context = newCanvas.getContext('2d');
  var image = new Image();
  image.src = 'data:image/jpeg;base64,' + UserImages.find().fetch()[0].body
  image.onload = function(){
    context.drawImage(image, 0, 0, w, h) 
    context.globalAlpha = 0.1
    var i = 0, j = 0;
    while (i++ < x) {
      j = 0;
      while (j++ < y) tile(dx, dy, i, j, arr);
    }
  }
};

function tile (dx, dy, i, j, arr) {
  var pull = window.sp();
  var match = 
        pull.closest(
          window.rgb(
            context.getImageData(dx * (i-1), dy *(j-1), dx, dy)));
  
  var binaryArray = arr;
  setTimeout(function () {
    var image = new Image();
    item = i*j % arr.length
    image.src = 'data:image/jpeg;base64,' + binaryArray[ item ];
    
    image.onload = function() {
      context.drawImage(image, dx * (i-1), dy * (j-1), dx, dy);
    };
          
    
    // $('<img>').css('position', 'absolute')
    //   .attr('src', url[ ~~(Math.random() * url.length) ])
    //   .css('height', dy)
    //   .css('width', dx)
    //   .css('left', i * dx)
    //   .css('top', j * dy)
    //   .load()
    //   .appendTo('body');
  }, i * 10 + j + 10);
};

if (Meteor.isClient) window.g = grid_img;
Meteor.isClient && (window.test = function () {
  window.test_url.forEach(function (url, i) {
    setTimeout(function (){
      $('<img>').attr('src', url).appendTo('body');
    }, i * 10);
  });
});


// Meteor.startup(function() {
//   var colorArray = [[240,200,139], [15,93,100], [60,200,60], [100,255, 100], [57,57,90], [200, 100, 63], [12,09,80], [1, 1 , 255]];

//   var condenseValue = function(array) {
//     var resultarray = [];
//     for (var i = 0; i < array.length; i++) {
//       resultarray.push(pusher.color('rgb', array[i][0], array[i][1], array[i][2]));
//     }
//     return resultarray;
//   };

  var rgbSort = function() {
    array.sort(function(colorA, colorB) {
    return pusher.color(colorA).hue() - pusher.color(colorB).hue();
    });
  };
//   var rgbSort = function() {
//     array.sort(function(colorA, colorB) {
//     return pusher.color(colorA).hue() - pusher.color(colorB).hue();
//     })
//   };

//   var plotColors = function(array) {
//     for (var i = 0; i < array.length; i++) {
//       $('body').append('<div class="test" style="background: '+ array[i].html() + ';"</div>')
//     }
//   };

//   window.array = colorArray;
    
//   window.b = condenseValue;
//   window.a = rgbSort;
//   window.c = plotColors;
// });

window.distance = function(colorString1, colorString2){

  var i, d = 0,
    color1 = [parseInt(colorString1.substring(0,2), 16), parseInt(colorString1.substring(2,4), 16), parseInt(colorString1.substring(4,6), 16)],
    color2 = [parseInt(colorString2.substring(0,2), 16), parseInt(colorString2.substring(2,4), 16), parseInt(colorString2.substring(4,6), 16)];

  for (i = 0; i < color1.length; i++) {
    d += (color1[i] - color2[i])*(color1[i] - color2[i]);
  }
  return Math.sqrt(d);
}

function closest (arr, comparator) {
  var c = arr[0];
  arr.forEach(function (item) {
    if (comparator(item) < comparator(c)) c = item;
  });
  return c;
}


window.r = _.range(10, 155, 5);


function sorted_pics() {
  var img = Images.find().fetch();
  var c = document.querySelector('#hidden');
  img.forEach(function (img) {
    var rgb = window.rgb($('<img>')
           .attr('src', 'data:image/jpeg;base64,' + img.body)[0]);

    img.avg = rgb;
        
  });
  img.closest = function (rgb) {
    return closest(img, function (item) {
      window.distance(rgb, item.avg);
    });
  };

  return img.sort(function(colorA, colorB) {
    var a = colorA.avg;
    var b = colorB.avg;
    return pusher.color('rgb', a[0], a[1], a[2]).hue()
      - pusher.color('rgb', b[0], b[1], b[2]).hue();
  });
}


window.sp = sorted_pics;

window.bs = function bsearch_closest(arr, val, cmp){
  var lo = 0, hi = arr.length;
  var mid = (lo + hi) >> 1;
  var b, prev;
  cmp = cmp || _.identity;

  while(mid > lo && mid < hi){
    b = cmp(arr[mid]);
    console.log(b, mid);
    if (b > val) hi = mid; 
    if (b === val) return mid;
    if (b < val) lo = mid; 
    prev = mid;
    mid = (lo + hi) >> 1;
  }
  //no match found
  return prev;
};
