import * as PIXI from "pixi.js";

type Scene = (app: App) => {
	resize: (w: number, h: number) => void;
	remove: () => void;
	tick: (delta: number) => void;
};

type App = PIXI.Application<PIXI.ICanvas>;
