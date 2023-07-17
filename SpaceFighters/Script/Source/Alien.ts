namespace Script{
    import f=FudgeCore;
    import fAid = FudgeAid;
    
    export class Alien extends f.Node{
        public pos: f.Node;
        public node: fAid.NodeSprite;
    
        public ySpeed: number = 0;
        
        public healthPoints : number = 3;

        ctrSideways: f.Control;
    
        public animState: Animation;
        public spriteSheedPath: string ="Assets/Alien.png";
    

        private moveSpeed: number = 4;
        private jumpForce: number = 5;
        private animWalk: fAid.SpriteSheetAnimation;
        private animIdle: fAid.SpriteSheetAnimation;
        private animShoot: fAid.SpriteSheetAnimation;
    
        constructor(_texture: f.TextureImage){
            super("Alien");
            this.pos= new f.Node("AlienPosition");
            this.pos.addComponent( new f.ComponentTransform)
        
            this.node = new fAid.NodeSprite("Alien");
            this.node.addComponent(new f.ComponentTransform);
    
            this.node.getComponent(f.ComponentMesh).mtxPivot.scaleY(2);
    
            this.node.mtxLocal.rotation = f.Vector3.Y(0);
            this.node.mtxLocal.translateY(-0.05);
            this.pos.appendChild(this.node);
    
            let texture: f.TextureImage= _texture;
    
            let coat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
            this.ctrSideways = new ƒ.Control("Sideways", this.moveSpeed, ƒ.CONTROL_TYPE.PROPORTIONAL);
    
            this.animIdle = new fAid.SpriteSheetAnimation("Idle", coat);
            this.animIdle.generateByGrid(f.Rectangle.GET(0,0,30,40,),3,32,f.ORIGIN2D.BOTTOMCENTER,f.Vector2.X(0));
    
            this.animWalk = new fAid.SpriteSheetAnimation("Walk", coat);
            this.animWalk.generateByGrid(f.Rectangle.GET(0,45,30,85,),3,32,f.ORIGIN2D.BOTTOMCENTER,f.Vector2.X(0));
    
            this.animShoot = new fAid.SpriteSheetAnimation("Shoot", coat);
            this.animShoot.generateByGrid(f.Rectangle.GET(0,90,30,130,),3,32,f.ORIGIN2D.BOTTOMCENTER,f.Vector2.X(0));
    
            this.node.setAnimation(this.animIdle);
            this.animState = Animation.Idle;
            this.node.setFrameDirection(1);
            this.node.framerate=12;
            }
    
            public setAnimation(_type: Animation): void{
                switch(_type){
                case Animation.Idle:
                     if(this.animState == _type) break;
                        this.node.setAnimation(this.animIdle)
                        this.animState = Animation.Idle;
                        break;
                case Animation.Walk:
                     if(this.animState == _type) break;
                         this.node.setAnimation(this.animWalk);
                        this.animState = Animation.Walk;
                        break;
                case Animation.Shoot:
                     if(this.animState == _type) break;
                     this.node.setAnimation(this.animShoot);
                     this.animState = Animation.Shoot;
                    break;
    
                default:
                        console.log("No valid parameter");
                        break;
                }
            }
            public update(): void {
                let deltaTime: number = ƒ.Loop.timeFrameGame / 1000;
          
                this.move(deltaTime);
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP])) {
                  this.jump();
                }
            }
            public move(_deltaTime: number): void {
                let sidewaysSpeed: number = (
                  ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) +
                  ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                );
          
                // run when shift is pressed
                if (!ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
                  this.ctrSideways.setInput(sidewaysSpeed * _deltaTime);
                  this.setAnimation(Animation.Walk);
                }
          
                if (this.ctrSideways.getOutput() == 0) {
                  this.setAnimation(Animation.Idle);
                }
          
                this.pos.mtxLocal.translateX(this.ctrSideways.getOutput());
                // rotateAline(ctrSideways.getOutput());
              }
              public jump(): void {
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
              public collision(): void {
                let blocks: f.Node = branch.getChildrenByName("Floors")[0];
                let pos: f.Vector3 = this.pos.mtxLocal.translation;
              
                for (let block of blocks.getChildren()) {
                  let posBlock: f.Vector3 = block.mtxLocal.translation;
              
                  if (pos.x > posBlock.x - 0.5 && pos.x < posBlock.x + 0.5) {
                    if (pos.y > posBlock.y + 0.3) {
                      pos.y = posBlock.y + 0.5;
                    }
                  }
                }
              
                this.pos.mtxLocal.translation = pos;
              }
            
            
            
    }
    }