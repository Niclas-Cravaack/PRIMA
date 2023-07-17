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
    import f = FudgeCore;
    let branch: f.Node;
}
declare namespace Script {
    import f = FudgeCore;
    class ShootingScript extends f.ComponentScript {
        static readonly iSubclass: number;
        constructor();
        shoot(): void;
    }
}
