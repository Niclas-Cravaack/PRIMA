namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  let transformLaser:ƒ.Matrix4x4;
  let transformAgent:ƒ.Matrix4x4;
  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  
    let graph: ƒ.Node = viewport.getBranch();
    let laser: ƒ.Node = graph.getChildrenByName("Lasers")[0].getChildrenByName("LaserRed")[0];
    transformLaser = laser.getComponent(ƒ.ComponentTransform).mtxLocal;

  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    transformLaser.rotateZ(0.0002);
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
  function placeLaserRed(): void{

    let graph: ƒ.Node = viewport.getBranch();

    let laser: ƒ.Node = graph.getChildrenByName("Lasers")[0].getChildrenByName("LaserRed")[0];
    let agentRed: ƒ.Node = graph.getChildrenByName("AgentRed")[0];

    transformLaser = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
    transformAgent = agentRed.getComponent(ƒ.ComponentTransform).mtxLocal;

    transformLaser.translation = transformAgent.translation;


  }
}