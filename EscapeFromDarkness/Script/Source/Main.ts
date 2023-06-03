namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

 // muss noch geändert werden 
  let levelSound : ƒ.Audio = new ƒ.Audio("Sounds/SuperMarioBros.Mp3")
  let cmpAudio = new ƒ.ComponentAudio(levelSound, true, true);
  
  

  export let branch : ƒ.Node;


  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translateZ(10);
    viewport.camera.mtxPivot.rotateY(180)
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    branch = viewport.getBranch();

    branch.addComponent(cmpAudio)

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

}