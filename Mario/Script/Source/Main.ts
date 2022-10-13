namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  

  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let spriteNode: ƒAid.NodeSprite;
  data;

  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  window.addEventListener("animate",hndlAnimation)
  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  async function hndlAnimation(_event: Event): Promise<void> {
    // ich glaube das Problem liegt hier dabei dass ich nicht weis wie man Daten aus dem Json file in die Methode hier lädt
    
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("images/Spritesheet.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);

    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Walk", coat);
    animation.generateByGrid(ƒ.Rectangle.GET(1, 0, 17, 60), 8, 22, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(20));
    spriteNode = new ƒAid.NodeSprite("Sprite");
    spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    spriteNode.setAnimation(animation);
    spriteNode.setFrameDirection(1);
    spriteNode.mtxLocal.translateY(-1);
    spriteNode.framerate = parseInt((<HTMLInputElement>document.querySelector("[name=fps]")).value);

    

    
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}