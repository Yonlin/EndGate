/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="Font/FontSettings.ts" />

module EndGate.Graphics {

    export class Text2d extends Abstractions.Graphic2d {
        public _type: string = "Text2d";
        public FontSettings: Assets.FontSettings;

        private _text: string;
        private _stroker: _.Utilities.NoopTripInvoker;

        // For GetDrawBounds
        private _drawBounds: Bounds.BoundingRectangle;

        constructor(x: number, y: number, text: string, color: string = "black") {
            super(new Vector2d(x, y));

            this._text = text;
            this._stroker = new _.Utilities.NoopTripInvoker((context: CanvasRenderingContext2D) => {
                context.strokeText(this._text, 0, 0);
            });

            this._drawBounds = new Bounds.BoundingRectangle(this.Position, Size2d.One());

            this.FontSettings = new Assets.FontSettings();
            this.Align("center");
            this.Baseline("middle");
            this.Color(color);
        }

        public Align(alignment?: string): string {
            return this.State.TextAlign(alignment);
        }

        public Baseline(baseline?: string): string {
            return this.State.TextBaseline(baseline);
        }

        public Color(color?: string): string {
            return this.State.FillStyle(color);
        }

        public Shadow(x?: number, y?: number, color?: string, blur?: number): any[] {
            return [this.ShadowX(x), this.ShadowY(y), this.ShadowColor(color), this.ShadowBlur(blur)];
        }

        public ShadowColor(color?: string): string {
            return this.State.ShadowColor(color);
        }

        public ShadowX(val?: number): number {
            return this.State.ShadowOffsetX(val);
        }

        public ShadowY(val?: number): number {
            return this.State.ShadowOffsetY(val);
        }

        public ShadowBlur(val?: number): number {
            return this.State.ShadowBlur(val);
        }

        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public Text(text?: string): string {
            if (typeof text !== "undefined") {
                this._text = text;
            }

            return this._text;
        }

        public Border(thickness?: number, color?: string): any[] {
            return [this.BorderThickness(thickness), this.BorderColor(color)];
        }

        public BorderThickness(thickness?: number): number {
            if (thickness === 0) {
                this._stroker.Reset();
            }
            else {
                this._stroker.Trip();
            }

            return this.State.LineWidth(thickness);
        }

        public BorderColor(color?: string): string {
            this._stroker.Trip();
            return this.State.StrokeStyle(color);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            var textSize;

            super.StartDraw(context);

            this.State.Font(this.FontSettings._BuildFont());

            textSize = context.measureText(this._text);
            this._drawBounds.Size.Width = textSize.width;
            this._drawBounds.Size.Height = parseInt(this.FontSettings.FontSize()) * 1.5;

            context.fillText(this._text, 0, 0);
            this._stroker.Invoke(context);

            super.EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;

            return this._drawBounds;
        }
    }

}