"use strict";
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
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    // import ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    // global variables for animation
    let mario;
    let levelSound = new ƒ.Audio("Sounds/SuperMarioBros.Mp3");
    let cmpAudio = new ƒ.ComponentAudio(levelSound, true, true);
    let Animation;
    (function (Animation) {
        Animation[Animation["Idle"] = 0] = "Idle";
        Animation[Animation["Walk"] = 1] = "Walk";
        Animation[Animation["Run"] = 2] = "Run";
    })(Animation = Script.Animation || (Script.Animation = {}));
    async function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        Script.branch = viewport.getBranch();
        Script.branch.addComponent(cmpAudio);
        // get Nodes
        let texture = new ƒ.TextureImage();
        await texture.load("images/Spritesheet.png");
        mario = new Script.Mario(texture);
        Script.branch.appendChild(mario.pos);
        // der Audiobumms steht auch in der Autoview.js
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
    }
    function update(_event) {
        mario.update();
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Mario {
        pos;
        node;
        ySpeed = 0;
        ctrSideways;
        animState;
        spriteSheedPath = "Images/Spritesheet.png";
        moveSpeed = 4;
        jumpForce = 5;
        animWalk;
        animRun;
        animIdle;
        constructor(_texture) {
            this.pos = new ƒ.Node("MarioPosition");
            this.pos.addComponent(new ƒ.ComponentTransform);
            this.node = new ƒAid.NodeSprite("Mario");
            this.node.addComponent(new ƒ.ComponentTransform);
            // scaling doesn't work as expected
            this.node.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(2);
            this.node.mtxLocal.rotation = ƒ.Vector3.Y(180);
            this.node.mtxLocal.translateY(-0.05);
            this.pos.appendChild(this.node);
            let texture = _texture;
            // let texture: ƒ.TextureImage = new ƒ.TextureImage();
            // texture.load(this.spriteSheedPath);
            let coat = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
            this.ctrSideways = new ƒ.Control("Sideways", this.moveSpeed, 0 /* ƒ.CONTROL_TYPE.PROPORTIONAL */);
            // animation
            // WalkB
            this.animWalk = new ƒAid.SpriteSheetAnimation("Walk", coat);
            this.animWalk.generateByGrid(ƒ.Rectangle.GET(400, 38, 16, 32), 3, 32, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(52));
            // Run
            this.animRun = new ƒAid.SpriteSheetAnimation("Run", coat);
            this.animRun.generateByGrid(ƒ.Rectangle.GET(332, 38, 18, 32), 3, 32, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(52));
            // Idle
            this.animIdle = new ƒAid.SpriteSheetAnimation("Idle", coat);
            this.animIdle.generateByGrid(ƒ.Rectangle.GET(20, 38, 16, 32), 1, 32, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(52));
            this.node.setAnimation(this.animIdle);
            this.animState = Script.Animation.Idle;
            this.node.setFrameDirection(1);
            this.node.framerate = 12;
        }
        /**
         * setAnimation
         */
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
                case Script.Animation.Run:
                    if (this.animState == _type)
                        break;
                    this.node.setAnimation(this.animRun);
                    this.animState = Script.Animation.Run;
                    break;
                default:
                    console.log("No valid parameter");
                    break;
            }
        }
        /**
         * update
         */
        update() {
            let deltaTime = ƒ.Loop.timeFrameGame / 1000;
            this.move(deltaTime);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                this.jump();
            }
            // turn Mario
            if (this.ctrSideways.getOutput() > 0) {
                this.node.mtxLocal.rotation = ƒ.Vector3.Y(180);
            }
            else if (this.ctrSideways.getOutput() < 0) {
                this.node.mtxLocal.rotation = ƒ.Vector3.Y(0);
            }
            this.fall(deltaTime);
        }
        /**
         * move
         */
        move(_deltaTime) {
            let sidewaysSpeed = (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) +
                ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]));
            // run when shift is pressed
            if (!ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
                this.ctrSideways.setInput(sidewaysSpeed * _deltaTime);
                this.setAnimation(Script.Animation.Walk);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
                this.setAnimation(Script.Animation.Run);
                this.ctrSideways.setInput(sidewaysSpeed * 1.5 * _deltaTime);
            }
            if (this.ctrSideways.getOutput() == 0) {
                this.setAnimation(Script.Animation.Idle);
            }
            this.pos.mtxLocal.translateX(this.ctrSideways.getOutput());
            // rotateMario(ctrSideways.getOutput());
        }
        /**
         * jump
         */
        jump() {
            this.ySpeed = this.jumpForce;
        }
        /**
         * fall
         */
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
                if (pos.x > posBlock.x - 0, 5 && pos.x < posBlock.x + 0, 5) {
                    if (pos.y > posBlock.y + 0, 3) {
                        pos.y = posBlock.y + 0.5;
                    }
                }
            }
        }
        ;
    }
    Script.Mario = Mario;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map