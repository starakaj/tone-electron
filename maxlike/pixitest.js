var keyboard = require("./keyboard");

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0x1099bb, antialias:true});
document.body.appendChild(renderer.view);

var patchcord = null;
var cordStartPoint = null;

var nkey = keyboard.keyboard(78);
nkey.press = addObject;

window.onresize = function(event) {
  console.log("Resizing");
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.view.style.width = w + "px";
  renderer.view.style.height = h + "px";
  renderer.resize(w, h);
  stage.hitArea = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
}

// create the root of the scene graph
var stage = new PIXI.Container();
stage.hitArea = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
stage.interactive = true;
stage.on("mousedown", beginPatchCord);
stage.on("mousemove", continuePatchCord);
stage.on("mouseup", endPatchCord);
stage.on("mouseupoutside", endPatchCord);

function beginPatchCord(event) {
  patchcord = new PIXI.Graphics();
  cordStartPoint = new PIXI.Point(event.data.global.x, event.data.global.y);
  stage.addChild(patchcord);
}

function continuePatchCord(event) {
  if (patchcord) {
    patchcord.clear();
    patchcord.lineStyle(4, 0x110000, 1)
    patchcord.moveTo(cordStartPoint.x, cordStartPoint.y);
    patchcord.lineTo(event.data.global.x, event.data.global.y);
  }
}

function endPatchCord(event) {
  patchcord.clear();
  stage.removeChild(patchcord);
  patchcord = null;
}

function addObject() {
  var object = new PIXI.Graphics();
  var mp = renderer.plugins.interaction.mouse.global;
  var p = new PIXI.Point(10, 10);
  debugger;
  if (mp.x > 0 && mp.x < renderer.width && mp.y > 0 && mp.y < renderer.height) {
    p.x = mp.x; p.y = mp.y;
  }

  object.lineStyle(1, 0x0000FF, 1);
  object.beginFill(0xBBBBBB, 1);
  object.drawRect(0, 0, 100, 40);
  object.position = p;
  stage.addChild(object);
}

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}
