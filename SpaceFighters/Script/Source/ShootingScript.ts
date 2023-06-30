namespace Script {
  import f = FudgeCore;

  export class ShootingScript extends f.ComponentScript {
    public static readonly iSubclass: number = f.Component.registerSubclass(ShootingScript);

    

    constructor() {
      super();
      
    }

  
     public shoot(player: Astronaut | Alien): void {
      // Erstellen des quadratischen Projektils
      let projectile: f.Node = new f.Node("Projectile");
      let mesh: f.Mesh = new f.MeshCube();
      let material: f.Material = new f.Material("SolidWhite", f.ShaderLit, new f.CoatColored(f.Color.CSS("white")));
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
      let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(material);

      projectile.addComponent(cmpMesh);
      cmpMesh.mtxPivot.scale(f.Vector3.ONE(0.8));
      projectile.addComponent(cmpMaterial);

      // Bestimmen der Blickrichtung des Spielers (Astronaut oder Alien)
      let shootingDirection: f.Vector3 = player.pos.mtxWorld.getZ().clone;
      projectile.mtxLocal.translateZ(1); // Platzieren des Projektils vor dem Spieler

      // Setzen der Geschwindigkeit des Projektils
      let projectileSpeed: number = 5;
      let projectileVelocity: f.Vector3 = shootingDirection.clone;
      projectileVelocity.scale(projectileSpeed);

      // Hinzufügen der Transformationskomponente und Geschwindigkeitskomponente zum Projektil
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      projectile.addComponent(cmpTransform);

      // Hinzufügen des Projektils zur Spielwelt
      player.pos.getParent().appendChild(projectile);

    
  }
}
}