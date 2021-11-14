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
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
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
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var Agent = ;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let transform;
    let laser;
    let agentRed;
    let agentBlue = new Agent;
    let ctrlForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrlForward.setDelay(200);
    async function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        //da krieg ich mein ganzen Stuff her
        let graph = viewport.getBranch();
        let laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("LaserRed")[0];
        transform = laser.mtxLocal;
        agentRed = graph.getChildrenByName("Agents")[0].getChildrenByName("AgentRed")[0];
        agentBlue = graph.getChildrenByName("Agents")[0].getChildrenByName("AgentBlue")[0];
        viewport.camera.mtxPivot.translateZ(-16);
        let graphLaser = await ƒ.Project.registerAsGraph(laser, false);
        let copy = new ƒ.GraphInstance(graphLaser);
        graph.getChildrenByName("Lasers")[0].addChild(copy);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 120);
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        let speedAgentRotation = 360; // meters per second
        //AgentRed controlls
        let value1 = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S])
            + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W]));
        ctrlForward.setInput(value1 * deltaTime);
        agentRed.mtxLocal.translateY(ctrlForward.getOutput());
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]))
            agentRed.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]))
            agentRed.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);
        //AgentBlue controlls
        let value2 = (ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.ARROW_DOWN])
            + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.ARROW_UP]));
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
    function checkCollisionRed() {
        let beam1 = laser.getChildrenByName("LaserRedOrigin")[0].getChildren()[0];
        let posLocal1 = ƒ.Vector3.TRANSFORMATION(agentRed.mtxWorld.translation, beam1.mtxWorldInverse, true);
        let beam2 = laser.getChildrenByName("LaserRedOrigin")[0].getChildren()[1];
        let posLocal2 = ƒ.Vector3.TRANSFORMATION(agentRed.mtxWorld.translation, beam2.mtxWorldInverse, true);
        let beam3 = laser.getChildrenByName("LaserRedOrigin")[0].getChildren()[2];
        let posLocal3 = ƒ.Vector3.TRANSFORMATION(agentRed.mtxWorld.translation, beam3.mtxWorldInverse, true);
        console.log(posLocal1.x <= 2.8 && posLocal1.x >= 0 && posLocal1.y <= 0.25 && posLocal1.y >= -0.25);
        if (posLocal1.x <= 2.8 && posLocal1.x >= 0 && posLocal1.y <= 0.25 && posLocal1.y >= -0.25)
            console.log("hit");
        if (posLocal2.x <= 2.8 && posLocal2.x >= 0 && posLocal2.y <= 0.25 && posLocal2.y >= -0.25)
            console.log("hit");
        if (posLocal3.x <= 2.8 && posLocal3.x >= 0 && posLocal3.y <= 0.25 && posLocal3.y >= -0.25)
            console.log("hit");
    }
})(Script || (Script = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        constructor() {
            super("Agent");
            this.addComponent(new ƒ.ComponentTransform);
            this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshPyramid("MeshAgent")));
            this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrlAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 1, 1)))));
            this.mtxLocal.scale(ƒ.Vector3.ONE(0.5));
            this.mtxLocal.rotateX(90);
        }
    }
    LaserLeague.Agent = Agent;
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map