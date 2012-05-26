// button 2: o
// button 3: x
// button 9: select
// button 10: start

var ge;
google.load("earth", "1");
  
function init() {
  google.earth.createInstance('map3d', initCB, failureCB);
}
  
function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);
  ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS_LOW_RESOLUTION, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_TREES, true);
  ge.getSun().setVisibility(true);
  ge.getOptions().setAtmosphereVisibility(true);
   
  // Get the current view.
  var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  //var camera = ge.getView().copyAsCamera(ge.ALTITUDE_RELATIVE_TO_GROUND);
 
  // Set new latitude and longitude values.
  lookAt.setLatitude(32.703586);
  lookAt.setLongitude(-117.105677);
  lookAt.setTilt(lookAt.getTilt() + 88.0);
  lookAt.setRange(lookAt.getRange() * 0.00001);
  var st = lookAt.getViewerOptions();
  st.setOption(ge.OPTION_STREET_VIEW, ge.OPTION_STATE_ENABLED);
  
  //camera.setAltitude(camera.getAltitude() -90);
    
  // Update the view in Google Earth.
  ge.getView().setAbstractView(lookAt);
  lookAt.setViewerOptions(st);
  
  //ge.getView().setAbstractView(camera);
    
}

function failureCB(errorCode) {

}



google.setOnLoadCallback(init);
  
$(document).keydown(function(event) {
  
  if (event.which == 88) {
    resetView();
  }
  if (event.which == 84) {
    moveUp();
    console.log("natl");
  }
  
});
  
function resetView() {
  if(ge) { 
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setTilt(0); //top-down 
    lookAt.setHeading(0); //north-up 
    ge.getView().setAbstractView(lookAt); //update view 
  } 
} 
  
function moveUp() {
  if (ge) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setLatitude(lookAt.getLatitude() + 0.00001);
    ge.getView().setAbstractView(lookAt); //update view 
  }
}