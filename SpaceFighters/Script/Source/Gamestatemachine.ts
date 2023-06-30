class GameStateMachine {
    private currentState: string;
    private states: Record<string, () => void>;
  
    constructor() {
      this.currentState = "play";
      this.states = {
        play: this.playState,
        gameOver: this.gameOverState,
      };
    }
    public update(): void {
        switch (this.currentState) {
          case "play":
            // Aktualisieren des Spielzustands "play"
            // ...
            break;
    
          case "gameOver":
            // Aktualisieren des Spielzustands "gameOver"
            // ...
            break;
    
          default:
            break;
        }
    }
    public setState(state: string): void {
      if (this.states[state]) {
        this.currentState = state;
        this.states[state]();
      }
    }
  
    private playState(): void {
      console.log("Play State");
      // Hier können Sie die Logik für den Spielablauf implementieren
    }
  
    private gameOverState(): void {
      console.log("Game Over State");
      // Hier können Sie die Logik für den Game Over-Zustand implementieren, z.B. Game Over-Anzeige anzeigen
    }
  }
  
  // Beispielverwendung
  const gameStateMachine = new GameStateMachine();
  gameStateMachine.setState("play"); // Setzt den Zustand auf "play"
  gameStateMachine.setState("gameOver"); // Setzt den Zustand auf "gameOver"