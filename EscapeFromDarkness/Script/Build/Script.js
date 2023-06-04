"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    // muss noch geändert werden 
    let levelSound = new ƒ.Audio("Sounds/SuperMarioBros.Mp3");
    let cmpAudio = new ƒ.ComponentAudio(levelSound, true, true);
    function start(_event) {
        viewport = _event.detail;
        viewport.camera.mtxPivot.translateZ(10);
        viewport.camera.mtxPivot.rotateY(180);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        Script.branch = viewport.getBranch();
        Script.branch.addComponent(cmpAudio);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map