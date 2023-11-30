import * as PIXI from "pixi.js";
import FontFaceObserver from "fontfaceobserver";

import app from "./app";

// Load assets
PIXI.Assets.init({ manifest: "manifest.json" });

PIXI.Assets.backgroundLoadBundle("basic"); // Load basic scene

// Load fonts
const fontLoaded = new FontFaceObserver("VT323");

fontLoaded.load().then(function () {
	console.log("Font loaded");

	app.init();
});
