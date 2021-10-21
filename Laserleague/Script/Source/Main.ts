namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  let transform:ƒ.Matrix4x4;
  let agentRed: ƒ.Node;
  let agentBlue: ƒ.Node;
  
  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  
    let graph: ƒ.Node = viewport.getBranch();
    let laser: ƒ.Node = graph.getChildrenByName("Lasers")[0].getChildrenByName("LaserRed")[0];
    agentRed = graph.getChildrenByName("AgentRed")[0];
    agentBlue = graph.getChildrenByName("AgentBlue")[0];


    viewport.camera.mtxPivot.translateZ(-16);
    
    transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;

  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    let speedLaserRotate: number = 360; // degres per second
    let speedAgentTranslation: number = 10; // meters per second
    let speedAgentRotation: number = 360; // meters per second

    //AgentRed controlls
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]))
      agentRed.mtxLocal.translateY(speedAgentTranslation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]))
      agentRed.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]))
      agentRed.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]))
      agentRed.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);

    //AgentBlue controlls
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
      agentBlue.mtxLocal.translateY(speedAgentTranslation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      agentBlue.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      agentBlue.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      agentBlue.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);

    transform.rotateZ(speedLaserRotate * deltaTime);

    transform.rotateZ(speedLaserRotate * deltaTime);

    transform.rotateZ(2);
    viewport.draw();
    ƒ.AudioManager.default.update();
  }


  

}
