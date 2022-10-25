declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    enum Animation {
        Idle = 0,
        Walk = 1,
        Run = 2
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class Mario {
        pos: ƒ.Node;
        node: ƒAid.NodeSprite;
        ySpeed: number;
        ctrSideways: ƒ.Control;
        animState: Animation;
        spriteSheedPath: string;
        private moveSpeed;
        private jumpForce;
        private animWalk;
        private animRun;
        private animIdle;
        constructor(_texture: ƒ.TextureImage);
        /**
         * setAnimation
         */
        setAnimation(_type: Animation): void;
        /**
         * update
         */
        update(): void;
        /**
         * move
         */
        move(_deltaTime: number): void;
        /**
         * jump
         */
        jump(): void;
        /**
         * fall
         */
        fall(_deltaTime: number): void;
    }
}
