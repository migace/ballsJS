var MIGACE = MIGACE || {};

MIGACE.namespace = function(ns_string) {
  var parts = ns_string.split('.'),
      parent = MIGACE,
      i;

  if ('MIGACE' === parts[0]) {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === 'unfefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
}

MIGACE.clearArray = function(dataArray) {
  var i,
      max;

  for (i = 0, max = dataArray.length; i < max; i += 1) {
    dataArray[i] = 0;
  }

  return dataArray;
}

MIGACE.getMousePosition = function(e) {
  var xPos = new Number(),
      yPos = new Number();

  if (e.x !== 'undefined' && e.y !== 'undefined') {
    xPos = e.x;
    yPos = e.y;
  } else {
    xPos = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;

    yPos = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  xPos -= MIGACE.conf.getCvs().offsetLeft;
  yPos -= MIGACE.conf.getCvs().offsetTop;

  return {
    x: xPos,
    y : yPos
  };
}

MIGACE.getOneColor = function() {
  var color = ['#F7B800', '#FA3400', '#69F500', '#00F7CE', '#000BBD'],
      randomNumber = Math.floor(Math.random()*color.length);

  return {
    color: color[randomNumber],
    index: randomNumber
  };
}

MIGACE.transCoordMultiDimToOne = function(coordinates, arrayLength) {
  return coordinates.y * arrayLength + coordinates.x;
}
