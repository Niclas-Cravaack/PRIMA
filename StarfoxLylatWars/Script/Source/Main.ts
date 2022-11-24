namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let cmpCamera: ƒ.ComponentCamera;
  
  
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    let graph = viewport.getBranch();
    let shipPos = graph.getChildrenByName("InterceptorPos")[0];
    let ship = shipPos.getChild(0);
    let shipRigidBody = ship.getComponent(ƒ.ComponentRigidbody);
    shipRigidBody.applyForce(ƒ.Vector3.Z(1000));

    
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
   ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }
  function control () :void{
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])){
      EngineScript.thrust();
    }


  }

  function update(_event: Event): void {
     ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  
}