// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
Clap to turn your appliance on/off.
It needs a tessel with ambient and relay module
attached on port A and B respectively.

P.S. A sneeze has the same effect a clap.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var relaylib = require('relay-mono');

var ambient = ambientlib.use(tessel.port['A']);
var relay = relaylib.use(tessel.port['B']);

var sound_level = 0.2;

// remove the following comment if you'd like to write the code
// to tessel flash
// console.log = function(){};

ambient.on('ready', function () {
  console.log('ready.');

    // Set a sound level trigger
    // The trigger is a float between 0 and 1
    ambient.setSoundTrigger(sound_level);

    ambient.on('sound-trigger', function(data) {
      console.log("Turn on/off applicance");

      setTimeout( function () {
        relay.toggle(1, function toggleOneResult(err) {
          if (err) console.log("Err toggling 1", err);
        });
      }, 500);

      // Clear it
      ambient.clearSoundTrigger();

      // Reset sound trigger
      setTimeout(function () {
          ambient.setSoundTrigger(sound_level);
      },1500);

    });
  // });
});

ambient.on('error', function (err) {
  console.log(err)
});
