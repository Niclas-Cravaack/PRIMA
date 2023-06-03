namespace Script{

    import f = FudgeCore;
    import fAid = FudgeAid;
    
        
    export class Operator{

        public pos: f.Node;

        ctrl: f.Control;

        private movement_speed = 4;
        public foot = branch.getChildrenByName("Operator")
        public operator_pos = foot.getComponent();
        

        constructor(){
          
        }

        

        public update(): void {
            let deltaTime: number = ƒ.Loop.timeFrameGame / 1000;
      
            this.move(deltaTime);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
              //this.jump();
            }
      
            // turn Mario
            if (this.ctrl.getOutput() > 0) {
              foot.getComponent.mtxLocal.rotation = ƒ.Vector3.Y(0);
            }
            else if (this.ctrl.getOutput() < 0) {
              this.mtxLocal.rotation = ƒ.Vector3.Y(180);
            }
      
            //this.fall(deltaTime);
          }



        public move(_deltaTime: number): void {
            let sidewaysSpeed: number = (
              ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) +
              ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
            );
      
            // run when shift is pressed
            if (!ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
              this.ctrl.setInput(sidewaysSpeed * _deltaTime);
              
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
              
              
            }
      
            if (this.ctrl.getOutput() == 0) {
              
            }
      
            this.pos.mtxLocal.translateX(this.ctrl.getOutput());
            // rotateMario(ctrSideways.getOutput());
          }

          public collision() : void{
            let blocks: ƒ.Node = branch.getChildrenByName("Floors")[0];
            let pos: ƒ.Vector3 = this.pos.mtxLocal.translation;
            for(let block of blocks.getChildren()){
              let posBlock: ƒ.Vector3 = block.mtxLocal.translation
                if(pos.x> posBlock.x-0,5 && pos.x< posBlock.x+0,5){
                  if(pos.y> posBlock.y+0,3){ 
                                   
                    pos.y= posBlock.y+0.5
    
                  }
                }
            }
        }    
      




    }

}