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
var Script;
(function (Script) {
    var f = FudgeCore;
    f.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let levelSound = new f.Audio("");
    let cmpAudio = new f.ComponentAudio(levelSound, true, true);
    async function start(_event) {
        viewport = _event.detail;
        viewport.camera.mtxPivot.translateZ(50);
        viewport.camera.mtxPivot.rotateY(180);
        Script.branch = viewport.getBranch();
        Script.branch.addComponent(cmpAudio);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        f.AudioManager.default.update();
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