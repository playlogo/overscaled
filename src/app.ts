import * as PIXI from "pixi.js";
import { Scene } from "../types/app";
import title from "./scenes/title";

class Game {
	app: undefined | PIXI.Application<PIXI.ICanvas> = undefined;
	scene: undefined | ReturnType<Scene>;

	constructor() {}

	async init() {
		this.app = new PIXI.Application({
			view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
			resizeTo: window,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0x0000ff,
		});

		this.loadScene(title);

		this.app.ticker // Listen for animate update
			.add((delta) => {
				// Call tick handling for each spinner.
				if (this.scene !== undefined) {
					this.scene.tick(delta);
				}
			});
	}

	async loadScene(scene: Scene) {
		if (this.scene !== undefined) {
			this.scene.remove();
		}

		this.scene = scene(this.app!);
	}
}

export default new Game();
