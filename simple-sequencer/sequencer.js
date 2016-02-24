'use strict';

var $ = require("jquery");
var Tone = require("Tone");
var synth = new Tone.Sampler({
  A: "330042__andreonate__dre-kick-09.wav"
}).toMaster();

function toggleButton() {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(this).addClass("active");
  }
}

$(document).ready(function() {
  $("div.sequence-button").click(toggleButton);
  Tone.Transport.timeSignature = 4;

  var seq = new Tone.Sequence(function(time, step) {
    $(".sequence-button.current").removeClass("current");
    $("div.sequence-button").eq(step).addClass("current");
    if ($("div.sequence-button").eq(step).hasClass("active")) {
      synth.triggerAttack("A", "8n");
    }
  }, [0,1,2,3,4,5,6,7], "8n");

  Tone.Transport.start();
  seq.start();
});
