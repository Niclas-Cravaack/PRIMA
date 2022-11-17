namespace Script {
  import ƒ = FudgeCore;
  // import ƒAid = FudgeAid;

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  // global variables for animation
  let mario: Mario;
  let levelSound : ƒ.Audio = new ƒ.Audio("Sounds/SuperMarioBros.Mp3")
  let cmpAudio = new ƒ.ComponentAudio(levelSound, true, true);
  
  export let branch : ƒ.Node;
  
  export enum Animation {
    Idle, Walk, Run
  }

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translateZ(10);
    viewport.camera.mtxPivot.rotateY(180)
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    branch = viewport.getBranch();
    
    branch.addComponent(cmpAudio);


    // get Nodes
    let texture: ƒ.TextureImage = new ƒ.TextureImage();
    await texture.load("images/Spritesheet.png");
    mario = new Mario(texture);
    branch.appendChild(mario.pos);
    

    // der Audiobumms steht auch in der Autoview.js
    


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    mario.collision();
    mario.update();
    

    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

}