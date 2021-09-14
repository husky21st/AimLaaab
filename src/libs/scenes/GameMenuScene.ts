import { Container, Text, Graphics, BitmapText, BitmapFont } from 'pixi.js';
import { IScene, Manager } from 'libs/manages/Manager';
import { GameScene } from 'libs/scenes/GameScene';

export class GameMenuScene extends Container implements IScene {
  private menuText: BitmapText;
  private Button1Text: Text;
  private Button2Text: Text;
  private Start1Button: Graphics;
  private Start2Button: Graphics;
  constructor() {
    super();
    console.log('fuck',BitmapFont.available);
    const wr: number = Manager.wr;
    const hr: number = Manager.hr;

    this.menuText = new BitmapText('AIM PRACTICE on WEB!', {fontName: 'RocknRoll', tint: 0x000000, fontSize: 96 });
    this.menuText.anchor.set(0.5);
    this.menuText.position.set(wr * 50, hr * 30);
    this.menuText.scale.set(Manager.scaleRatio);
    this.addChild(this.menuText);

    this.Start1Button = new Graphics()
      .lineStyle(2, 0xf8f8ff, 1)
      .beginFill(0xffc0cb)
      .drawRoundedRect(wr * 30, hr * 65, wr * 40, hr * 10, wr)
      .endFill();
    this.Start1Button.interactive = true;
    this.Start1Button.buttonMode = true;
    this.Start1Button.on('pointertap', () => Manager.changeScene(new GameScene()), this);
    this.addChild(this.Start1Button);

    this.Start2Button = new Graphics()
      .lineStyle(2, 0xf8f8ff, 1)
      .beginFill(0x8b008b)
      .drawRoundedRect(wr * 30, hr * 80, wr * 40, hr * 10, wr)
      .endFill();
    this.Start2Button.alpha = 0.1;
    this.addChild(this.Start2Button);

    this.Button1Text = new Text('Start Game', {fontFamily: 'RocknRoll One', fill: 'black', fontSize: 48 });
    this.Button1Text.anchor.set(0.5);
    this.Button1Text.position.set(wr * 50, hr * 70);
    this.Button1Text.scale.set(Manager.scaleRatio);
    this.addChild(this.Button1Text);

    this.Button2Text = new Text('Coming soon...', { fill: 'black', fontSize: 48 });
    this.Button2Text.anchor.set(0.5);
    this.Button2Text.position.set(wr * 50, hr * 85);
    this.Button2Text.scale.set(Manager.scaleRatio);
    this.Button2Text.alpha = 0.1;
    this.addChild(this.Button2Text);

  }

  public update(): void {}
}
