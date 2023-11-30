import { FancyButton } from "@pixi/ui";
import * as PIXI from "pixi.js";

import { App } from "../../types/app";

import gameApp from "../app";

const SCALE = 960;

const buttonEntries = [
	{
		name: "Inside",
		description: "Help a overwhelmed computer to handle Blackfrieday",
		thumb: "thumbnails/inside.jpeg",
		scene: undefined,
	},
	{
		name: "Roomba",
		description: "Manage a burning server room ",
		thumb: "thumbnails/server.jpeg",
		scene: undefined,
	},
];

export default (app: App) => {
	const scene = new PIXI.Container();

	const left_container = new PIXI.Container();

	const right_container = new PIXI.Container();

	const settings_overlay = new PIXI.Container();
	settings_overlay.visible = false;

	// Left
	const text_style_title = new PIXI.TextStyle({
		fontFamily: "VT323",
		fontSize: 48,
		fill: ["#ffffff", "#00ff99"], // gradient
		stroke: "#4a1850",
		strokeThickness: 2,
	});

	const text_style_normal = new PIXI.TextStyle({
		fontFamily: "VT323",
		fontSize: 32,
		fill: ["#ffffff"], // gradient
	});

	const title = new PIXI.Text("Overscaled", text_style_title);

	left_container.addChild(title);

	const buttons: any[] = [];

	for (const entry of buttonEntries) {
		const btn = new FancyButton({
			defaultView: `assets/button/title_default.png`,
			hoverView: `assets/button/title_hover.png`,
			pressedView: `assets/button/title_pressed.png`,
			text: new PIXI.Text(entry.name, text_style_normal),
			animations: {
				hover: {
					props: {
						scale: {
							x: 1.1,
							y: 1.1,
						},
					},
					duration: 100,
				},
				pressed: {
					props: {
						scale: {
							x: 0.9,
							y: 0.9,
						},
					},
					duration: 100,
				},
			},
		});

		btn.onPress.connect((_entry) => gameApp.loadScene(entry.scene!));

		buttons.push(btn);
	}

	// Add containers
	scene.addChild(left_container);
	scene.addChild(right_container);
	scene.addChild(settings_overlay);

	// @ts-ignore
	app.stage.addChild(scene);

	// Tick
	function tick(delta: number) {
		console.log(delta);
	}

	// Resize
	function resizeLeftContainer(w: number, h: number) {
		left_container.x = 0;
		left_container.y = 0;

		title.x = (16 / SCALE) * w;
		title.y = (32 / SCALE) * h;
		title.style.fontSize = (w / SCALE) * 32;

		let i = 0;
		for (const button of buttons) {
			button.x = (16 / SCALE) * w;
			title.y = ((128 + i * 64) / SCALE) * h;

			i++;
		}
	}

	function resizeRightContainer(w: number, h: number) {
		right_container.x = w / 2;
		right_container.y = 0;
	}

	function resizeSettings(w: number, h: number) {
		settings_overlay.x = (32 / SCALE) * w;
		settings_overlay.y = (32 / SCALE) * h;
	}

	function resize(w: number, h: number) {
		resizeLeftContainer(w, h);
		resizeRightContainer(w, h);
		resizeSettings(w, h);
	}

	// Remove
	function remove() {
		// @ts-ignore
		app.stage.removeChild(scene);
	}

	// Initial resize
	resize(app.view.width, app.view.height);

	return {
		resize: resize,
		tick: tick,
		remove: remove,
	};
};
