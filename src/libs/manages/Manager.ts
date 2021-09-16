import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export class Manager {
  private constructor() {
    console.log('Manager_cons'); /*this class is purely static. No constructor to see here*/
  }

  // Safely store variables for our game
  private static app: PIXI.Application;
  private static currentScene: IScene;

  // Width and Height are read-only after creation (for now)
  private static _width: number;
  private static _height: number;
  private static _scaleRatioX: number;
  private static _scaleRatioY: number;

  // With getters but not setters, these variables become read-only
  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }
  public static get wr(): number {
    return Manager._width / 100;
  }
  public static get hr(): number {
    return Manager._height / 100;
  }

  public static get scaleRatioX(): number {
    return Manager._scaleRatioX;
  }

  public static get scaleRatioY(): number {
    return Manager._scaleRatioY;
  }

  // Use this function ONCE to start the entire machinery
  public static initialize(canvas: HTMLCanvasElement, width: number, height: number): void {
    console.log('Manager_init');
    // store our width and height
    Manager._width = width;
    Manager._height = height;
    Manager._scaleRatioX = 1;
    Manager._scaleRatioY = 1;
    
    // debugger;
    // Create our pixi app
    Manager.app = new PIXI.Application({
      view: canvas,
      resolution: window.devicePixelRatio || 1,
      backgroundColor: 0xbddbda,
      autoDensity: false,
      antialias: true,
      width: width,
      height: height,
    });
    // debugger;


    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    // Add the ticker
    Manager.app.ticker.stop();
    gsap.ticker.fps(60);
    gsap.ticker.add(() => {
      Manager.app.ticker.update();
    })
    Manager.app.ticker.add(Manager.update);
    console.log('a_1', Manager.currentScene);
    // listen for the browser telling us that the screen size changed
    //window.addEventListener('resize', Manager.resize);
    //// call it manually once so we are sure we are the correct size after starting
    //Manager.resize();
    Manager.ManagerInitSetting();
  }

  private static ManagerInitSetting(): void {
    Manager.app.renderer.plugins.interaction.cursorStyles['Target'] = "url('redTarget.png') 10 10, crosshair";
    const _userAgent: string = window.navigator.userAgent.toLowerCase();
    console.log(_userAgent);
    let checkwebgl2: boolean = true;
    if(_userAgent.indexOf('edge') != -1) {
      console.log('use Edge');
    } else if(_userAgent.indexOf('chrome') != -1) {
      console.log('use Google Chrome');
    } else if(_userAgent.indexOf('safari') != -1) {
      console.log('use Safari');
      checkwebgl2 = false;
    } else if(_userAgent.indexOf('firefox') != -1) {
      console.log('use FireFox');
    } else if(_userAgent.indexOf('opera') != -1) {
      console.log('use Opera');
    } else {
      console.log('undefined');
      checkwebgl2 = false;
    }
    if(!checkwebgl2){
      PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL;
    }
    console.log('ENVIRONMENT', PIXI.settings.PREFER_ENV);
  }

  public static resizeToFullscreen(): void {
    // current screen size
    console.log('width', window.innerWidth, screen.width, screen.availWidth, document.documentElement.clientWidth);
    console.log('height', window.innerHeight, screen.height, screen.availHeight, document.documentElement.clientHeight);
    Manager._scaleRatioX = screen.availWidth / Manager.width;
    Manager._scaleRatioY = screen.availHeight / Manager.height;
    if(Manager.scaleRatioX === 1 && Manager.scaleRatioY === 1)return;
    Manager.currentScene.pivot.set(Manager.width / 2, Manager.height / 2);
    Manager._width = screen.availWidth;
    Manager._height = screen.availHeight;

    Manager.app.renderer.resize(Manager.width, Manager.height);
    Manager.currentScene.scale.set(Manager.scaleRatioX);
    Manager.currentScene.position.set(Manager.width / 2, Manager.height / 2);
    //Manager.currentScene.transform.position.set(Manager.scaleRatioX, Manager.scaleRatioY);
    Manager.app.render();

    //// uniform scale for our game
    //const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

    //// the "uniformly englarged" size for our game
    //const enlargedWidth = Math.floor(scale * Manager.width);
    //const enlargedHeight = Math.floor(scale * Manager.height);

    //// margins for centering our game
    //const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    //const verticalMargin = (screenHeight - enlargedHeight) / 2;

    //// now we use css trickery to set the sizes and margins
    //Manager.app.view.style.width = `${enlargedWidth}px`;
    //Manager.app.view.style.height = `${enlargedHeight}px`;
    //Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
    //Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    console.log('Manager_change');
    console.log('a_2', Manager.currentScene);
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      console.log('Manager_destroy');
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    // Add the new one
    Manager.currentScene = newScene;
    Manager.app.stage.addChild(Manager.currentScene);
    console.log('a_3', Manager.currentScene);
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (Manager.currentScene) {
      Manager.currentScene.update();
    }

    // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
  }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends PIXI.DisplayObject {
  update(): void;
}
