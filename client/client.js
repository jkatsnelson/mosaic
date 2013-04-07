function getAverageRGB(selector) {
  var canvas = $('canvas')[0],
      context = canvas.getContext && canvas.getContext('2d');

  if (! canvas) throw new Error('this function needs a canvas el');

  var blockSize = 5, 
      defaultRGB = [0, 0, 0],
      data, width, height,
      i = -4,
      length,
      rgb = [0, 0, 0],
      count = 0, 
      imgEl = 'string' === typeof selector ? document.querySelector(selector) : selector;
  
  if (!context) return defaultRGB;
  
  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;

  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
  
  context.drawImage(imgEl, 0, 0);
  
  try {
    data = context.getImageData(0, 0, width, height);
  } catch(e) {
    alert('x');
    return defaultRGB;
  }
  
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
  }, j * 200 + i * 5);
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

