import { Container, Graphics, Loader, Text, BitmapFont } from 'pixi.js';
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import { sound } from "@pixi/sound";
import { gsap } from "gsap";
import { assets } from 'libs/asset/assets';
import { IScene, Manager } from 'libs/manages/Manager';
import { GameMenuScene } from 'libs/scenes/GameMenuScene';



export class LoaderScene extends Container implements IScene {
  // for making our loader graphics...
  private loaderBar: Container;
  private loaderBarBoder: Graphics;
  private loaderBarFill: Graphics;
  private text: Text;
  constructor() {
    super();
    console.log('Loader_cons');
    console.log('resolution',window.devicePixelRatio);
    const wr: number = Manager.wr;
    const hr: number = Manager.hr;
    const textScale: number = wr / 40;
    const loaderBarWidth: number = Manager.width * 0.8;

    this.loaderBarFill = new Graphics();
    this.loaderBarFill.beginFill(0x9900ff, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, hr*5);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0;

    this.loaderBarBoder = new Graphics();
    this.loaderBarBoder.lineStyle(10, 0x0, 1);
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, hr*5);

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
    
    this.addChild(this.loaderBar);

    this.text = new Text("画面がおかしくなったときはリロードしてね！", {fontFamily: 'RocknRoll One', fill: 0x000000, fontSize: 64 });
    this.text.anchor.set(0.5);
    this.text.position.set(Manager.width / 2, Manager.height / 2);
    this.text.scale.set(textScale * 2);
    this.text.alpha = 0;
    this.addChild(this.text);

    Loader.registerPlugin(WebfontLoaderPlugin);
    Loader.shared.add(assets);
    
    Loader.shared.onProgress.add(this.downloadProgress, this);
    Loader.shared.onComplete.once(this.gameLoaded, this);
    
    Loader.shared.load();
  }

  private downloadProgress(loader: Loader): void {
    console.log('Loader_downloadProgress');
    const progressRatio: number = loader.progress / 100;
    this.loaderBarFill.scale.x = progressRatio;
  }

  private gameLoaded(): void {
    // Change scene to the game scene!
    //console.log('Loader_gameLoaded');
    this.initSetting();
    const openTL: gsap.core.Timeline = gsap.timeline();
    openTL
    .to(this.loaderBar, {
      pixi : { alpha : 0}, duration: 1,
    })
    .to(this.text, {
      pixi : { alpha : 1 }, duration : 1, yoyo : true, repeat : 1,
      onComplete : () => {this.text.text = "※音が出ます"},
    })
    .to(this.text, {
      pixi : { alpha : 1 }, duration : 1, yoyo : true, repeat : 1,
      onComplete : () => Manager.changeScene(new GameMenuScene()),
    });
  }

  private initSetting(): void {
    this.setAssetsVolume();
    console.log(...Loader.shared.resources["fontT"].data.text);
    BitmapFont.from(
      "RocknRoll", 
      {
        fontFamily: "RocknRoll One",
        fill: "#ffffff", // White, will be colored later
        fontSize: 96
      },
      {
        resolution: 4,
        chars: [['0', '9'], ['a', 'z'], ['A', 'Z'], ".,/`~:;'-_=+!@#$%^&*()~{}[] ", ...Loader.shared.resources["fontT"].data.text],
      }
    );
  }

  private setAssetsVolume(): void {
    //sound.volume('highPointSE', 100);
    //sound.volume('normalPointSE', 100);
    //sound.volume('missTargetSE', 100);
    //sound.volume('lostPointSE', 100);
    sound.volumeAll = 0.5;
  }

  public update(): void {
    console.log('Loader_update');
    // To be a scene we must have the update method even if we don"t use it.
    //this.text.angle += 1 * gsap.ticker.deltaRatio();
  }
}
