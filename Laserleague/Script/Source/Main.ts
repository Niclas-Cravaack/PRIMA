namespace Script {
  import ƒ = FudgeCore;
  import Agent;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><any>start);

  let transform: ƒ.Matrix4x4;
  let laser: ƒ.Node
  let agentRed: ƒ.Node;
  let agentBlue = new Agent;

  let ctrlForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrlForward.setDelay(200);

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    //da krieg ich mein ganzen Stuff her
    let graph: ƒ.Node = viewport.getBranch();
    let laser: ƒ.Node = graph.getChildrenByName("Lasers")[0].getChildrenByName("LaserRed")[0];

    transform = laser.mtxLocal;
    agentRed = graph.getChildrenByName("Agents")[0].getChildrenByName("AgentRed")[0];
    agentBlue = graph.getChildrenByName("Agents")[0].getChildrenByName("AgentBlue")[0];

    viewport.camera.mtxPivot.translateZ(-16);

    let graphLaser: ƒ.Graph = await ƒ.Project.registerAsGraph(laser, false);
    let copy: ƒ.GraphInstance = new ƒ.GraphInstance(graphLaser);

    graph.getChildrenByName("Lasers")[0].addChild(copy);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 120);


  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    let speedAgentRotation: number = 360; // meters per second

    //AgentRed controlls
    let value1: number = (
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W])
    );
    ctrlForward.setInput(value1 * deltaTime);
    agentRed.mtxLocal.translateY(ctrlForward.getOutput());

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]))
      agentRed.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]))
      agentRed.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);

    //AgentBlue controlls
    let value2: number = (
      ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.ARROW_UP])
    );
    ctrlForward.setInput(value2 * deltaTime);
    agentBlue.mtxLocal.translateY(ctrlForward.getOutput());

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      agentBlue.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      agentBlue.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);

      

    viewport.draw();
    checkCollisionRed();
    ƒ.AudioManager.default.update();
  }

  function checkCollisionRed(): void {
    let beam1: ƒ.Node = laser.getChildrenByName("LaserRedOrigin")[0].getChildren()[0];
    let posLocal1: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agentRed.mtxWorld.translation, beam1.mtxWorldInverse, true);
    let beam2: ƒ.Node = laser.getChildrenByName("LaserRedOrigin")[0].getChildren()[1];
    let posLocal2: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agentRed.mtxWorld.translation, beam2.mtxWorldInverse, true);
    let beam3: ƒ.Node = laser.getChildrenByName("LaserRedOrigin")[0].getChildren()[2];
    let posLocal3: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agentRed.mtxWorld.translation, beam3.mtxWorldInverse, true);

    console.log(posLocal1.x <= 2.8 && posLocal1.x >= 0 && posLocal1.y <= 0.25 && posLocal1.y >= -0.25)

    if (posLocal1.x <= 2.8 && posLocal1.x >= 0 && posLocal1.y <= 0.25 && posLocal1.y >= -0.25)
      console.log("hit");
    if (posLocal2.x <= 2.8 && posLocal2.x >= 0 && posLocal2.y <= 0.25 && posLocal2.y >= -0.25)
      console.log("hit");
    if (posLocal3.x <= 2.8 && posLocal3.x >= 0 && posLocal3.y <= 0.25 && posLocal3.y >= -0.25)
      console.log("hit");
  }


}
