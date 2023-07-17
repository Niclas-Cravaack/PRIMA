"use strict";
var Script;
(function (Script) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    class Alien extends f.Node {
        pos;
        node;
        ySpeed = 0;
        healthPoints = 3;
        ctrSideways;
        animState;
        spriteSheedPath = "Assets/Alien.png";
        moveSpeed = 4;
        jumpForce = 5;
        animWalk;
        animIdle;
        animShoot;
        constructor(_texture) {
            super("Alien");
            this.pos = new f.Node("AlienPosition");
            this.pos.addComponent(new f.ComponentTransform);
            this.node = new fAid.NodeSprite("Alien");
            this.node.addComponent(new f.ComponentTransform);
            this.node.getComponent(f.ComponentMesh).mtxPivot.scaleY(2);
            this.node.mtxLocal.rotation = f.Vector3.Y(0);
            this.node.mtxLocal.translateY(-0.05);
            this.pos.appendChild(this.node);
            let texture = _texture;
            let coat = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
            this.ctrSideways = new ƒ.Control("Sideways", this.moveSpeed, 0 /* PROPORTIONAL */);
            this.animIdle = new fAid.SpriteSheetAnimation("Idle", coat);
            this.animIdle.generateByGrid(f.Rectangle.GET(0, 0, 30, 40), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.X(0));
            this.animWalk = new fAid.SpriteSheetAnimation("Walk", coat);
            this.animWalk.generateByGrid(f.Rectangle.GET(0, 45, 30, 85), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.X(0));
            this.animShoot = new fAid.SpriteSheetAnimation("Shoot", coat);
            this.animShoot.generateByGrid(f.Rectangle.GET(0, 90, 30, 130), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.X(0));
            this.node.setAnimation(this.animIdle);
            this.animState = Script.Animation.Idle;
            this.node.setFrameDirection(1);
            this.node.framerate = 12;
        }
        setAnimation(_type) {
            switch (_type) {
                case Script.Animation.Idle:
                    if (this.animState == _type)
                        break;
                    this.node.setAnimation(this.animIdle);
                    this.animState = Script.Animation.Idle;
                    break;
                case Script.Animation.Walk:
                    if (this.animState == _type)
                        break;
                    this.node.setAnimation(this.animWalk);
                    this.animState = Script.Animation.Walk;
                    break;
                case Script.Animation.Shoot:
                    if (this.animState == _type)
                        break;
                    this.node.setAnimation(this.animShoot);
                    this.animState = Script.Animation.Shoot;
                    break;
                default:
                    console.log("No valid parameter");
                    break;
            }
        }
        update() {
            let deltaTime = ƒ.Loop.timeFrameGame / 1000;
            this.move(deltaTime);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP])) {
                this.jump();
            }
        }
        move(_deltaTime) {
            let sidewaysSpeed = (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) +
                ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]));
            // run when shift is pressed
            if (!ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
                this.ctrSideways.setInput(sidewaysSpeed * _deltaTime);
                this.setAnimation(Script.Animation.Walk);
            }
            if (this.ctrSideways.getOutput() == 0) {
                this.setAnimation(Script.Animation.Idle);
            }
            this.pos.mtxLocal.translateX(this.ctrSideways.getOutput());
            // rotateAline(ctrSideways.getOutput());
        }
        jump() {
            this.ySpeed = this.jumpForce;
        }
        //public fall(_deltaTime: number): void {
        // let g: number = 9.81;
        // this.ySpeed -= g * _deltaTime;
        //let deltaY: number = this.ySpeed * _deltaTime;
        //if (this.pos.mtxLocal.translation.y + deltaY > -2) {
        // this.pos.mtxLocal.translateY(deltaY);
        // }
        // }
        collision() {
            let blocks = Script.branch.getChildrenByName("Floors")[0];
            let pos = this.pos.mtxLocal.translation;
            for (let block of blocks.getChildren()) {
                let posBlock = block.mtxLocal.translation;
                if (pos.x > posBlock.x - 0.5 && pos.x < posBlock.x + 0.5) {
                    if (pos.y > posBlock.y + 0.3) {
                        pos.y = posBlock.y + 0.5;
                    }
                }
            }
            this.pos.mtxLocal.translation = pos;
        }
    }
    Script.Alien = Alien;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    class Astronaut extends f.Node {
        pos;
        node;
        ySpeed = 0;
        healthPoints = 3;
        ctrSideways;
        animState;
        spriteSheedPath = "Assets/Astronaut.png";
        moveSpeed = 4;
        jumpForce = 5;
        animWalk;
        animIdle;
        animShoot;
        constructor(_texture) {
            super("Astronaut");
            this.pos = new f.Node("AstronautPosition");
            this.pos.addComponent(new f.ComponentTransform);
            this.node = new fAid.NodeSprite("Astronaut");
            this.node.addComponent(new f.ComponentTransform);
            this.node.getComponent(f.ComponentMesh).mtxPivot.scaleY(2);
            this.node.mtxLocal.rotation = f.Vector3.Y(180);
            this.node.mtxLocal.translateY(-0.05);
            this.pos.appendChild(this.node);
            let texture = _texture;
            let coat = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
            this.ctrSideways = new ƒ.Control("Sideways", this.moveSpeed, 0 /* PROPORTIONAL */);
            this.animIdle = new fAid.SpriteSheetAnimation("Idle", coat);
            this.animIdle.generateByGrid(f.Rectangle.GET(0, 90, 40, 130), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.X(0));
            this.animWalk = new fAid.SpriteSheetAnimation("Walk", coat);
            this.animWalk.generateByGrid(f.Rectangle.GET(0, 0, 40, 40), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.X(0));
            this.animShoot = new fAid.SpriteSheetAnimation("Shoot", coat);
            this.animShoot.generateByGrid(f.Rectangle.GET(0, 45, 40, 85), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.X(0));
            this.node.setAnimation(this.animIdle);
            this.animState = Script.Animation.Idle;
            this.node.setFrameDirection(1);
            this.node.framerate = 12;
        }
        setAnimation(_type) {
            switch (_type) {
                case Script.Animation.Idle:
                    if (this.animState == _type)
                        break;
                    this.node.setAnimation(this.animIdle);
                    this.animState = Script.Animation.Idle;
                    break;
                case Script.Animation.Walk:
                    if (this.animState == _type)
                        break;
                    this.node.setAnimation(this.animWalk);
                    this.animState = Script.Animation.Walk;
                    break;
                case Script.Animation.Shoot:
                    if (this.animState == _type)
                        break;
                    this.node.setAnimation(this.animShoot);
                    this.animState = Script.Animation.Shoot;
                    break;
                default:
                    console.log("No valid parameter");
                    break;
            }
        }
        update() {
            let deltaTime = ƒ.Loop.timeFrameGame / 1000;
            this.move(deltaTime);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
                this.jump();
            }
        }
        move(_deltaTime) {
            let sidewaysSpeed = (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.D]) +
                ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.A]));
            // run when shift is pressed
            if (!ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
                this.ctrSideways.setInput(sidewaysSpeed * _deltaTime);
                this.setAnimation(Script.Animation.Walk);
            }
            if (this.ctrSideways.getOutput() == 0) {
                this.setAnimation(Script.Animation.Idle);
            }
            this.pos.mtxLocal.translateX(this.ctrSideways.getOutput());
            // rotateMario(ctrSideways.getOutput());
        }
        jump() {
            this.ySpeed = this.jumpForce;
        }
        fall(_deltaTime) {
            let g = 9.81;
            this.ySpeed -= g * _deltaTime;
            let deltaY = this.ySpeed * _deltaTime;
            if (this.pos.mtxLocal.translation.y + deltaY > -2) {
                this.pos.mtxLocal.translateY(deltaY);
            }
        }
        collision() {
            let blocks = Script.branch.getChildrenByName("Floors")[0];
            let pos = this.pos.mtxLocal.translation;
            for (let block of blocks.getChildren()) {
                let posBlock = block.mtxLocal.translation;
                if (pos.x > posBlock.x - 0.5 && pos.x < posBlock.x + 0.5) {
                    if (pos.y > posBlock.y + 0.3) {
                        pos.y = posBlock.y + 0.5;
                    }
                }
            }
            this.pos.mtxLocal.translation = pos;
        }
    }
    Script.Astronaut = Astronaut;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
class GameStateMachine {
    currentState;
    states;
    constructor() {
        this.currentState = "play";
        this.states = {
            play: this.playState,
            gameOver: this.gameOverState,
        };
    }
    update() {
        switch (this.currentState) {
            case "play":
                // Aktualisieren des Spielzustands "play"
                // ...
                break;
            case "gameOver":
                // Aktualisieren des Spielzustands "gameOver"
                // ...
                break;
            default:
                break;
        }
    }
    setState(state) {
        if (this.states[state]) {
            this.currentState = state;
            this.states[state]();
        }
    }
    playState() {
        console.log("Play State");
        // Hier können Sie die Logik für den Spielablauf implementieren
    }
    gameOverState() {
        console.log("Game Over State");
        // Hier können Sie die Logik für den Game Over-Zustand implementieren, z.B. Game Over-Anzeige anzeigen
    }
}
// Beispielverwendung
const gameStateMachine = new GameStateMachine();
gameStateMachine.setState("play"); // Setzt den Zustand auf "play"
gameStateMachine.setState("gameOver"); // Setzt den Zustand auf "gameOver"
var Script;
(function (Script) {
    var f = FudgeCore;
    f.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let astronaut;
    let alien;
    let levelSound = new f.Audio("");
    let cmpAudio = new f.ComponentAudio(levelSound, true, true);
    let gameStateMachine;
    let Animation;
    (function (Animation) {
        Animation[Animation["Idle"] = 0] = "Idle";
        Animation[Animation["Walk"] = 1] = "Walk";
        Animation[Animation["Shoot"] = 2] = "Shoot";
    })(Animation = Script.Animation || (Script.Animation = {}));
    async function start(_event) {
        viewport = _event.detail;
        viewport.camera.mtxPivot.translateZ(-10);
        viewport.camera.mtxPivot.rotateY(180);
        Script.branch = viewport.getBranch();
        Script.branch.addComponent(cmpAudio);
        //get Nodes
        let astronautTexture = new f.TextureImage();
        await astronautTexture.load(astronaut.spriteSheedPath);
        //creating and setting up the Astronaut
        astronaut = new Script.Astronaut(astronautTexture);
        astronaut.pos.mtxLocal.translation = new f.Vector3(4, 2, 0);
        astronaut.addComponent(new Script.ShootingScript());
        // creating and setting up the Alien
        let alienTexture = new f.TextureImage();
        await alienTexture.load(astronaut.spriteSheedPath);
        alien = new Script.Alien(alienTexture);
        alien.pos.mtxLocal.translation = new f.Vector3(-4, 2, 0);
        alien.addComponent(new Script.ShootingScript());
        Script.branch.appendChild(astronaut.pos);
        Script.branch.appendChild(alien.pos);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function checkProjectilePlayerCollision(projectile) {
        let projectilePos = projectile.mtxWorld.translation;
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
    function update(_event) {
        if (astronaut.healthPoints <= 0 || alien.healthPoints <= 0) {
            gameStateMachine.setState("gameOver");
            let projectile = null;
            //Controlls for shootingscript
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
                astronaut.getComponent(Script.ShootingScript).shoot(astronaut);
            }
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SHIFT_RIGHT])) {
                alien.getComponent(Script.ShootingScript).shoot(astronaut);
            }
            checkProjectilePlayerCollision(projectile);
            gameStateMachine.update();
            astronaut.update();
            alien.update();
            viewport.draw();
            f.AudioManager.default.update();
        }
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var f = FudgeCore;
    class ShootingScript extends f.ComponentScript {
        static iSubclass = f.Component.registerSubclass(ShootingScript);
        constructor() {
            super();
        }
        shoot(player) {
            // Erstellen des quadratischen Projektils
            let projectile = new f.Node("Projectile");
            let mesh = new f.MeshCube();
            let material = new f.Material("SolidWhite", f.ShaderLit, new f.CoatColored(f.Color.CSS("white")));
            let cmpMesh = new f.ComponentMesh(mesh);
            let cmpMaterial = new f.ComponentMaterial(material);
            projectile.addComponent(cmpMesh);
            cmpMesh.mtxPivot.scale(f.Vector3.ONE(0.8));
            projectile.addComponent(cmpMaterial);
            // Bestimmen der Blickrichtung des Spielers (Astronaut oder Alien)
            let shootingDirection = player.pos.mtxWorld.getZ().clone;
            projectile.mtxLocal.translateZ(1); // Platzieren des Projektils vor dem Spieler
            // Setzen der Geschwindigkeit des Projektils
            let projectileSpeed = 5;
            let projectileVelocity = shootingDirection.clone;
            projectileVelocity.scale(projectileSpeed);
            // Hinzufügen der Transformationskomponente und Geschwindigkeitskomponente zum Projektil
            let cmpTransform = new f.ComponentTransform();
            projectile.addComponent(cmpTransform);
            // Hinzufügen des Projektils zur Spielwelt
            player.pos.getParent().appendChild(projectile);
        }
    }
    Script.ShootingScript = ShootingScript;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map