/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module AudioHandling {

    // Generic animation class that allows me to display temporary animations in the viewport
    export class Animation {
        // Sprite2d which essentially shows the current frame of the animation on the canvas
        public Graphic: eg.Graphics.Sprite2d;

        // SpriteSheet image that is used to pull frames from
        private _animation: eg.Graphics.SpriteAnimation;

        constructor(private _spriteSheet: eg.Graphics.ImageSource, x: number, y: number, frameWidth: number, frameHeight: number, fps: number, frameCount: number, onComplete: Function, repeat: boolean = true, rotateRandomly: boolean = false) {

            // To create our animation, we pass in our sprite sheet that we want to use for the animation, the fps (frames per second), 
            // our animation frame size, and how many frames the animation is
            this._animation = new eg.Graphics.SpriteAnimation(this._spriteSheet, fps, new eg.Size2d(frameWidth, frameHeight), frameCount);
            // Wire up the animations OnComplete handler to trigger the passed in function once the animation has finished.
            this._animation.OnComplete.Bind(onComplete);

            // We now create our Sprite2d which is used to display our animation onto the canvas, this is what eventually gets added to the Scene
            this.Graphic = new eg.Graphics.Sprite2d(x, y, this._spriteSheet, frameWidth, frameHeight);

            // Randomly rotate the Sprite2d to give a more distinct look to the animation
            if (rotateRandomly) {
                this.Graphic.Rotation = Math.random() * (<any>Math).twoPI + -Math.PI;
            }

            if (this._spriteSheet.IsLoaded()) {
                this._animation.Play(repeat);
            }
            else {
                // Need  to wait until the image is loaded to play the animation
                this._spriteSheet.OnLoaded.Bind(() => {
                    // By default the animation is stopped, meaning even if it has update called on it the frames will not start moving
                    // Therefore here we're saying that the animation is ready to play
                    this._animation.Play(repeat);
                });
            }
        }

        public Update(gameTime: eg.GameTime): void {
            // Update the animation so that it plays
            this._animation.Update(gameTime);
        }
    }

}