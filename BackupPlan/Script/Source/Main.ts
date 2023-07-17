namespace Script {
  import f = FudgeCore;
  f.Debug.info("Main Program Template running!");

  let viewport: f.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  let levelSound : f.Audio = new f.Audio("");
  let cmpAudio = new f.ComponentAudio(levelSound,true,true);

  export let branch: f.Node;

  async function start(_event: CustomEvent): Promise <void> {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translateZ(50);
    viewport.camera.mtxPivot.rotateY(180);

    branch = viewport.getBranch();
    branch.addComponent(cmpAudio)

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    f.AudioManager.default.update();
  }
}