declare namespace Script {
    import f = FudgeCore;
    import fAid = FudgeAid;
    class Alien extends f.Node {
        pos: f.Node;
        node: fAid.NodeSprite;
        ySpeed: number;
        healthPoints: number;
        ctrSideways: f.Control;
        animState: Animation;
        spriteSheedPath: string;
        private moveSpeed;
        private jumpForce;
        private animWalk;
        private animIdle;
        private animShoot;
        constructor(_texture: f.TextureImage);
        setAnimation(_type: Animation): void;
        update(): void;
        move(_deltaTime: number): void;
        jump(): void;
        collision(): void;
    }
}
declare namespace Script {
    import f = FudgeCore;
    import fAid = FudgeAid;
    class Astronaut extends f.Node {
        pos: f.Node;
        node: fAid.NodeSprite;
        ySpeed: number;
        healthPoints: number;
        ctrSideways: f.Control;
        animState: Animation;
        spriteSheedPath: string;
        private moveSpeed;
        private jumpForce;
        private animWalk;
        private animIdle;
        private animShoot;
        constructor(_texture: f.TextureImage);
        setAnimation(_type: Animation): void;
        update(): void;
        move(_deltaTime: number): void;
        jump(): void;
        fall(_deltaTime: number): void;
        collision(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare class GameStateMachine {
    private currentState;
    private states;
    constructor();
    update(): void;
    setState(state: string): void;
    private playState;
    private gameOverState;
}
declare const gameStateMachine: GameStateMachine;
declare namespace Script {
    import f = FudgeCore;
    let branch: f.Node;
    enum Animation {
        Idle = 0,
        Walk = 1,
        Shoot = 2
    }
}
declare namespace Script {
    import f = FudgeCore;
    class ShootingScript extends f.ComponentScript {
        static readonly iSubclass: number;
        constructor();
        shoot(player: Astronaut | Alien): void;
    }
}
