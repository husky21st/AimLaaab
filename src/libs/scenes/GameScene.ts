import { Container, Text, Graphics, InteractionEvent, Point, BitmapText } from 'pixi.js';
import { sound } from "@pixi/sound";
import { gsap } from 'gsap';
import { IScene, Manager } from 'libs/manages/Manager';
import { GameMenuScene } from 'libs/scenes/GameMenuScene';

type TypeOfTarget = {
  Gtarget: Graphics;
  key: number;
};

const getDistance = (x: number, y: number) : number => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

const setInterval = (tick: number): number => {
  let interval: number = 60 - Math.pow(tick/60 ,0.8) + getRandomArbitrary(0,10);
  interval = Math.floor(interval);
  if(interval < 5) interval = 5;
  return interval;
}

export class GameScene extends Container implements IScene {
  private startText: Text;
  private scoreText: Text;
  private lifeBar: Graphics;
  private targets: Array<TypeOfTarget>;
  private target_i: number; 
  private gameNow: boolean;
  private tick: number;
  private limit: number;
  private score: number;
  private interval: number;
  private background: Graphics;
  private targetContainer: Container;
  private resultScreen: Container;
  private fpsText: BitmapText;

  constructor() {
    super();
    const wr: number = Manager.wr;
    const hr: number = Manager.hr;
    this.sortableChildren = true;
    this.gameNow = false;
    this.tick = 0;
    this.limit = 100;
    this.target_i = 0;
    this.score = 0;
    this.interval = setInterval(0);

    this.interactive = true;
    this.cursor = 'Target';
    //this.on('pointerdown', this.clickScreen, this);

    this.background = new Graphics()
      .beginFill(0xf7f6f5)
      .drawRect(0, 0, wr * 100, hr * 100)
      .endFill();
    this.background.alpha = 0;
    this.background.zIndex = 1;
    this.background.interactive = true;
    this.background.on('pointerdown', this.clickScreen, this);
    this.addChild(this.background);

    this.resultScreen = new ResultScreen();
    this.resultScreen.zIndex = 200;
    this.resultScreen.alpha = 0;
    this.addChild(this.resultScreen);

    this.startText = new Text('3', { fill: 'black', fontSize: 96 });
    this.startText.anchor.set(0.5);
    this.startText.position.set(wr * 50, hr * 50);
    this.startText.scale.set(Manager.scaleRatio);
    this.addChild(this.startText);

    this.lifeBar = new Graphics()
      .beginFill(0x00008b)
      .drawRect(0, 0, wr * 100, hr * 2)
      .endFill();
    this.lifeBar.position.x = -wr * 100;
    this.addChild(this.lifeBar);

    this.targets = new Array();
    this.targetContainer = new Container();
    for (let i = 0; i < 30; i++) {
      let target = new Graphics()
        .beginFill(0xfffacd)
        .drawCircle(0, 0, wr * 4)
        .beginFill(0xff8c00)
        .drawCircle(0, 0, wr * 1)
        .endFill();
      target.interactive = true;
      target.on('pointerdown', this.clickTarget, this);
      target.alpha = 0;
      target.visible = false;
      this.targetContainer.addChild(target);
      this.targets.push({Gtarget: target, key: i});
    }
    this.targetContainer.zIndex = 10;
    this.addChild(this.targetContainer);

    this.scoreText = new Text(`Score: ${this.score}`, { fontFamily: 'RocknRoll One', fill: 'black', fontSize: 72 });
    this.scoreText.position.set(wr * 1, hr * 3);
    this.scoreText.scale.set(Manager.scaleRatio);
    this.addChild(this.scoreText);

    this.fpsText = new BitmapText("null", { fontName: 'RocknRoll', tint: 0xff0000, fontSize: 96 });
    this.fpsText.text = "0 fps";
    this.fpsText.position.set(wr * 90, hr * 96);
    this.fpsText.scale.set(Manager.scaleRatio * 0.4);
    this.addChild(this.fpsText);

    this.gameLoad();
  }

  private gameLoad(): void {
    gsap.to(this.lifeBar, {
      pixi: { x: 0 },
      duration: 3,
    });
    let gameNowTL = gsap.timeline();
    gameNowTL
      .to(this.startText, {
        duration: 1,
        onComplete: () => {
          this.startText.text = '2';
        },
      })
      .to(this.startText, {
        duration: 1,
        onComplete: () => {
          this.startText.text = '1';
        },
      })
      .to(this.startText, {
        duration: 1,
        onComplete: () => this.startGame(),
      });
  }

  private startGame(): void {
    console.log('gamestart');
    this.removeChild(this.startText);
    this.startText.destroy();
    this.gameNow = true;
  }

  private showTarget(): void {
    if(!this.gameNow) return;
    if(this.target_i < 29){
      this.target_i++;
    } else {
      this.target_i = 0;
    }
    const nowTarget: Graphics = this.targets[this.target_i].Gtarget;
    nowTarget.position.set(Manager.wr * getRandomArbitrary(15,85), Manager.hr * getRandomArbitrary(15,85));
    const _radian: number = getRandomArbitrary(0,Math.PI * 2);
    const vecX: number = Math.cos(_radian) * Manager.wr * 5;
    const vecY: number = Math.sin(_radian) * Manager.wr * 5;
    const targetTL: gsap.core.Timeline = gsap.timeline();
    nowTarget.visible = true;
    targetTL
      .to(nowTarget, {
        pixi: {x: '+=' + vecX, y: '+=' + vecY, alpha: 1}, duration: 1, ease: 'Power4.easeOut'
      })
      .to(nowTarget, {
        pixi: {x: '+=' + vecX, y: '+=' + vecY, alpha: 0}, duration: 1, ease: 'Power4.easeIn',
        onComplete: () => {this.limit -= 8; nowTarget.visible = false; sound.play('missTargetSE');},
      });
  }

  private clickTarget(event: InteractionEvent):void {
    console.log('clickTARGET');
    const position: Point = event.data.getLocalPosition(event.currentTarget);
    const distance: number = getDistance(position.x, position.y);
    if(distance <= Manager.wr){
      console.log('1');
      sound.play('highPointSE');
      this.changeScore(21 * (75 - this.interval));
    }else {
      console.log('2');
      sound.play('normalPointSE');
      this.changeScore(7 * (75 - this.interval));
    }
    if(this.limit <= 98) this.limit += 2;
    gsap.killTweensOf(event.currentTarget);
    event.currentTarget.alpha = 0;
    event.currentTarget.visible = false;
  }

  private clickScreen(): void {
    if(!this.gameNow) return;
    console.log('clickSCREEN');
    sound.play('lostPointSE');
    this.changeScore(-Math.ceil(this.score * 0.05));
  }

  private changeScore(point: number): void {
    this.score += point;
    this.scoreText.text = `Score: ${this.score}`;
  }

  public update(): void {
    if (!this.gameNow) return;
    const delta: number = gsap.ticker.deltaRatio();
    this.tick += delta;
    this.limit -= delta / 20;
    this.applyCanvas(delta);
    if(this.limit <= 0){
      this.finishGame();
      return;
    } else if(this.limit <= 20 && this.scoreText.alpha === 1){
      this.hideScore();
    }
  }

  private hideScore(): void {
    this.scoreText.alpha = 0.99;
    gsap.to(this.scoreText, {
      pixi: {alpha: 0}, duration: 1,
    });
  }

  private applyCanvas(delta: number): void {
    this.lifeBar.position.x = Manager.wr * (this.limit - 100);
    const fps: number = 60 / delta;
    this.fpsText.text = `${fps.toFixed(3)} fps`;
    this.createTarget();
  }

  private createTarget():void {
    this.interval--;
    if(this.interval <= 0){
      this.showTarget();
      this.interval = setInterval(Math.round(this.tick));
      console.log(this.interval);
    }
  }

  private finishGame(): void {
    console.log('finish');
    this.gameNow = false;
    this.background.zIndex = 150;
    this.cursor = 'auto';
    gsap.killTweensOf(this.targetContainer.children);
    this.targetContainer.interactiveChildren = false;
    ResultScreen.scoreText.text = `Score: ${this.score}`;
    gsap.to(this.resultScreen, {
      pixi: {alpha: 1}, duration: 3,
    });
    gsap.to(this.background, {
      pixi: {alpha: 0.5}, duration: 3,
    })
  }
}

class ResultScreen extends Container {
  public static scoreText: Text;

  private returnMenuText: Text;
  constructor() {
    super();
    const wr: number = Manager.wr;
    const hr: number = Manager.hr;

    ResultScreen.scoreText = new Text("Score: Null", { fill: 'black', fontSize: 96 });
    ResultScreen.scoreText.anchor.set(0.5);
    ResultScreen.scoreText.position.set(wr * 50, hr * 30);
    ResultScreen.scoreText.scale.set(Manager.scaleRatio);
    this.addChild(ResultScreen.scoreText);

    this.returnMenuText = new Text("Return Menu", { fill: 'black', fontSize: 72 });
    this.returnMenuText.anchor.set(0.5);
    this.returnMenuText.position.set(wr * 50, hr * 70);
    this.returnMenuText.scale.set(Manager.scaleRatio);
    this.returnMenuText.interactive = true;
    this.returnMenuText.buttonMode = true;
    this.returnMenuText.on('pointerdown', () => Manager.changeScene(new GameMenuScene()), this);
    this.addChild(this.returnMenuText);
  }
}