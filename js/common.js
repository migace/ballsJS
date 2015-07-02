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

MIGACE.clearArray = function(dataArray, size) {
  var i;

  for (i = 0; i < size; i += 1) {
    dataArray[i] = 0;
  }

  return dataArray;
}

MIGACE.getMousePosition = function(e) {
  var xPos = new Number(),
      yPos = new Number(),
      rect = MIGACE.conf.getCvs().getBoundingClientRect();

  if (e.x !== 'undefined' && e.y !== 'undefined') {
    xPos = e.x;
    yPos = e.y;
  } else {
    xPos = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;

    yPos = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  xPos -= rect.left;
  yPos -= rect.top;

  return {
    x: xPos,
    y: yPos
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
  return coordinates.y * (arrayLength/10) + coordinates.x;
}

MIGACE.transIndexToBoardCoord = function(index, board) {
  var x = Math.floor(index % board.columns);
      y = Math.floor(index / board.rows);

  return {
    x: x,
    y: y
  };
}

MIGACE.transCoordToBoardPos = function(coordinates, board) {
  var xPos = coordinates.x * board.getFieldWidth() + board.getFieldWidth() / 2;
  var yPos = coordinates.y * board.getFieldHeight() + board.getFieldHeight() / 2;

  return {
    x: xPos,
    y: yPos
  };
}
