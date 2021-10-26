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
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let transform;
    let agentRed;
    let agentBlue;
    function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        let graph = viewport.getBranch();
        let laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("LaserRed")[0];
        agentRed = graph.getChildrenByName("Agents")[0].getChildrenByName("AgentRed")[0];
        agentBlue = graph.getChildrenByName("Agents")[0].getChildrenByName("AgentBlue")[0];
        viewport.camera.mtxPivot.translateZ(-16);
        transform = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        let speedLaserRotate = 360; // degres per second
        let speedAgentTranslation = 10; // meters per second
        let speedAgentRotation = 360; // meters per second
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
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            agentBlue.mtxLocal.translateY(speedAgentTranslation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]))
            agentBlue.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            agentBlue.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            agentBlue.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);
        transform.rotateZ(speedLaserRotate * deltaTime / 2);
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map