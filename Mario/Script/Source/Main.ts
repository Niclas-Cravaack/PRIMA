namespace Script {
  import ƒ = FudgeCore;
  // import ƒAid = FudgeAid;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  // global variables for animation
  let mario: Mario;

  export enum Animation {
    Idle, Walk, Run
  }

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    // get Nodes
    let branch: ƒ.Node = viewport.getBranch();
    let texture: ƒ.TextureImage = new ƒ.TextureImage();
    await texture.load("images/Spritesheet.png");
    mario = new Mario(texture);
    branch.appendChild(mario.pos);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    mario.update();

    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

}