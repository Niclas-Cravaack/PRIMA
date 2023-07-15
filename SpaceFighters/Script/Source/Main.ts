namespace Script {
  import f = FudgeCore;
  f.Debug.info("Main Program Template running!");

  let viewport: f.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  let astronaut: Astronaut;
  let alien: Alien;
  let levelSound : f.Audio = new f.Audio("");
  let cmpAudio = new f.ComponentAudio(levelSound,true,true);
  let gameStateMachine: GameStateMachine;
  
  export let branch: f.Node;
  


  export enum Animation {
    Idle, Walk, Shoot
  }

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    viewport.camera.mtxPivot.translateZ(10);
   viewport.camera.mtxPivot.rotateY(180);

   

    branch = viewport.getBranch();
    branch.addComponent(cmpAudio);

    //get Nodes

    let astronautTexture: f.TextureImage = new f.TextureImage();
    await astronautTexture.load(astronaut.spriteSheedPath);
    //creating and setting up the Astronaut
    astronaut = new Astronaut(astronautTexture);
    astronaut.pos.mtxLocal.translation = new f.Vector3(-2,0,0)
    astronaut.addComponent(new ShootingScript());

    // creating and setting up the Alien
    let alienTexture: f.TextureImage = new f.TextureImage();
    await alienTexture.load(astronaut.spriteSheedPath);
    alien = new Alien(alienTexture)
    alien.pos.mtxLocal.translation = new f.Vector3(-2,0,0)
    alien.addComponent(new ShootingScript()); 

    branch.appendChild(astronaut.pos);
    branch.appendChild(alien.pos);
    

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }
  function checkProjectilePlayerCollision(projectile: f.Node): void {
    let projectilePos: f.Vector3 = projectile.mtxWorld.translation;
  
    // Überprüfe die Kollision zwischen Projektil und Astronaut
    if (Math.abs(projectilePos.x - astronaut.pos.mtxWorld.translation.x) < 0.5 && Math.abs(projectilePos.y - astronaut.pos.mtxWorld.translation.y) < 0.5) {
      // Reduziere die Lebenspunkte des Astronauten
      astronaut.healthPoints--;
  
      // Weitere Aktionen für den Astronauten nach der Kollision
      // ...
  
      // Entferne das Projektil aus der Spielwelt
      projectile.getParent()?.removeChild(projectile);
      return;
    }
  
    // Überprüfe die Kollision zwischen Projektil und Alien
    if (Math.abs(projectilePos.x - alien.pos.mtxWorld.translation.x) < 0.5 && Math.abs(projectilePos.y - alien.pos.mtxWorld.translation.y) < 0.5) {
      // Reduziere die Lebenspunkte des Aliens
      alien.healthPoints--;
  
      // Weitere Aktionen für das Alien nach der Kollision
      // ...
  
      // Entferne das Projektil aus der Spielwelt
      projectile.getParent()?.removeChild(projectile);
      return;
    }
  }
  function update(_event: Event): void {
   
    if (astronaut.healthPoints <= 0 || alien.healthPoints <= 0) {
      gameStateMachine.setState("gameOver");

    let projectile: f.Node | null = null;
    
    //Controlls for shootingscript
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
      astronaut.getComponent(ShootingScript).shoot(astronaut);
    }
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SHIFT_RIGHT])) {
      alien.getComponent(ShootingScript).shoot(astronaut);
    }

    checkProjectilePlayerCollision(projectile);

    gameStateMachine.update();
    astronaut.update();
    alien.update();
    viewport.draw();
    f.AudioManager.default.update();
  }
  

}
}