if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to mosaic.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



var rgb = getAverageRGB(document.getElementById('i'));
document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.b+','+rgb.g+')';


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
