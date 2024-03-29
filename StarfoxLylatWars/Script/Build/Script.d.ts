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
    import ƒ = FudgeCore;
    class EngineScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        private rgdBodySpaceship;
        private pitchF;
        private rollF;
        private yawf;
        strafeThrust: number;
        forwardthrust: number;
        private relativeX;
        private relativeY;
        private relativeZ;
        constructor();
        hndEvent: (_event: Event) => void;
        update: () => void;
        private width;
        private height;
        private xAxis;
        private yAxis;
        handleMouse: (e: MouseEvent) => void;
        setRelativeAxes(): void;
        backwards(): void;
        thrust(): void;
        rollLeft(): void;
        rollRight(): void;
    }
}
declare namespace Script {
}
