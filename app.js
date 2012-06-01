// button 2: o
// button 3: x
// button 9: select
// button 10: start


/* (13) up => up
 * (15) down => down
 * (16) left => left
 * (14) right => right
 * (2) o => z
 * (3) x => c
 *
 *
 */

/* 
 * Declare variables, load earth 
 */
var ge;
var view = true;
var earthView = true;
var openSidebar = false;
var curSelected;
google.load("earth", "1");

var MOVE_SPEED = 0.00005;

/*
 * Initialization function.
 * Loads map on #map3d, calls initCB. Implement changes in maps 
 * (moon/sky/mars) here
 */
function init() {
  google.earth.createInstance('map3d', initCB, failureCB);
}
  
/*
 * Call function from init.
 * Does all the preset/beginning stuff.
 */
function initCB(instance) {
  ge = instance; // starts instance
  ge.getWindow().setVisibility(true);
  ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
  
  /* Enable cool random features */
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS_LOW_RESOLUTION, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_TREES, true);
  ge.getSun().setVisibility(true);
  ge.getOptions().setAtmosphereVisibility(true);
   
  // Get the current view.
  var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
 
  // Set view starting points
  lookAt.setLatitude(32.703387);
  lookAt.setLongitude(-117.106158);
  lookAt.setTilt(lookAt.getTilt() + 88.0);
  lookAt.setRange(lookAt.getRange() * 0.000001);
  lookAt.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_GROUND);
  
  // Set to street view
  /* var st = lookAt.getViewerOptions();
  st.setOption(ge.OPTION_STREET_VIEW, ge.OPTION_STATE_ENABLED);
  lookAt.setViewerOptions(st); */
    
  // Update the view in Google Earth.
  ge.getView().setAbstractView(lookAt);
  
}

/*
 * Call function from init when failure.
 * (Don't worry about it.)
 */
function failureCB(errorCode) {

}

/*
 * Only load once the whole page (DOM) has loaded
 */
google.setOnLoadCallback(init);


$(document).keydown(function(event) {
  if (view && !openSidebar) {
    if (event.which == 37) {
      $("#moveleft").click();
    }
    if (event.which == 38) {
      $("#moveup").click();
    }
    if (event.which == 39) {
      $("#moveright").click();
    }
    if (event.which == 40) {
      $("#movedown").click();
    }
  }
  else if (!openSidebar) {
    if (event.which == 37) {
      $("#panleft").click();
    }
    if (event.which == 38) {
      $("#panup").click();
    }
    if (event.which == 39) {
      $("#panright").click();
    }
    if (event.which == 40) {
      $("#pandown").click();
    }
  }
  
  if (openSidebar) {
    if (event.which == 38) {
      curSelected.css({"background":"#ffffff"});
      curSelected = curSelected.prev();
      curSelected.hover();
      curSelected.css({"background":"#555555"});
    }
    if (event.which == 40) {
      curSelected.css({"background":"#ffffff"});
      curSelected = curSelected.next();
      curSelected.hover();
      curSelected.css({"background":"#555555"});
    }
    if (event.which == 90) {
      curSelected.click();
    }
  }
  
  if (event.which == 90) { // 'z'
    view = !view;
  }
  
  if (event.which == 67) { // 'c'
    if (openSidebar) {
      $("#map3d").animate({"margin-left": "15px"});
      $("#sidebar").animate({"margin-left": "-365px"});
    }
    else {
      $("#map3d").animate({"margin-left": "380px"});
      $("#sidebar").animate({"margin-left": "0px"});
      $("#sidebar div:first").hover();
      if (curSelected != undefined) {
        curSelected.css({"background":"#ffffff"});
      }
      curSelected = $("#sidebar div:first");
      curSelected.css({"background":"#555555"});
    }
    openSidebar = !openSidebar;
  }
  
  /* if (event.which == 88) { // 'x'
     var st = lookAt.getViewerOptions();
     st.setOption(ge.OPTION_STREET_VIEW, ge.OPTION_STATE_ENABLED);
     lookAt.setViewerOptions(st); 
  } */
});

function degToRad(x) {
  return x*Math.PI/180
}

function moveUp() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    var angle = degToRad(lookAt.getHeading());
    lookAt.setLatitude(lookAt.getLatitude() + Math.cos(angle)*MOVE_SPEED);
    lookAt.setLongitude(lookAt.getLongitude() + Math.sin(angle)*MOVE_SPEED);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function moveDown() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    var angle = degToRad(lookAt.getHeading()) + (Math.PI);
    lookAt.setLatitude(lookAt.getLatitude() + Math.cos(angle)*MOVE_SPEED);
    lookAt.setLongitude(lookAt.getLongitude() + Math.cos(angle)*MOVE_SPEED);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function moveLeft() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    var angle = degToRad(lookAt.getHeading()) + (Math.PI*3/2);
    lookAt.setLatitude(lookAt.getLatitude() + Math.cos(angle)*MOVE_SPEED);
    lookAt.setLongitude(lookAt.getLongitude() + Math.cos(angle)*MOVE_SPEED);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function moveRight() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    var angle = degToRad(lookAt.getHeading()) + (Math.PI/2);
    lookAt.setLatitude(lookAt.getLatitude() + Math.cos(angle)*MOVE_SPEED);
    lookAt.setLongitude(lookAt.getLongitude() + Math.cos(angle)*MOVE_SPEED);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function panUp() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setTilt(lookAt.getTilt() - 3);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function panDown() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setTilt(lookAt.getTilt() + 3);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function panLeft() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setHeading(lookAt.getHeading() - 3);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function panRight() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setHeading(lookAt.getHeading() + 3);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}

function goTo(lat, lon) {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setLatitude(lat);
    lookAt.setLongitude(lon);
    lookAt.setTilt(lookAt.getTilt() + 88.0);
    lookAt.setRange(lookAt.getRange() * 0.000001);
    lookAt.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_GROUND);
    ge.getView().setAbstractView(lookAt);
  }
}

/*$("#learning").click(function() {
  goTo(32.703387, -117.106158);
});

$("#rushmore").click(function() {
  goTo(43.882367, -103.453875);
});

$("#yellowstone").click(function() {
  goTo(44.609535, -110.548553);
});

$("#eiffel").click(function() {
  goTo(48.858263, 2.294286);
});

$("#pyramid").click(function() {
  goTo(29.979175, 31.134439);
});

$("#everest").click(function() {
  goTo(27.985837, 86.923313);
});*/