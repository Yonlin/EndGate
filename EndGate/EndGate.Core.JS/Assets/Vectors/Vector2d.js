/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../Sizes/Size2d.ts" />
/// <reference path="../../Extensions/MathExtensions.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a two dimensional vector object which specifies an X and Y
    */
    var Vector2d = (function () {
        function Vector2d(x, y) {
            this._type = "Vector2d";
            this.X = x || 0;
            this.Y = y || 0;
        }
        Vector2d.Zero = /**
        * Returns a Vector2d with all its components set to zero.
        */
        function Zero() {
            return new Vector2d(0, 0);
        };
        Vector2d.One = /**
        * Returns a Vector2d with all its components set to one.
        */
        function One() {
            return new Vector2d(1, 1);
        };
        Vector2d.prototype.ProjectOnto = /**
        * Returns a Vector2d that represents the current Vector2d projected onto the provided Vector2d.
        * @param vector Source vector.
        */
        function (vector) {
            return vector.Multiply(this.Dot(vector) / vector.Dot(vector));
        };
        Vector2d.prototype.RotateAround = function (point, angle, precision) {
            if (typeof precision === "undefined") { precision = 2; }
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);
            return new Vector2d(Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision), Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision));
        };
        Vector2d.prototype.Apply = /**
        * Executes the action with the X and Y components of this Vector2d and sets the X and Y components to the corresponding return values.
        * @param action The function used to modify the X and Y components.
        */
        function (action) {
            this.X = action(this.X);
            this.Y = action(this.Y);
        };
        Vector2d.prototype.Trigger = /**
        * Executes the action with the X and Y components of this Vector2d.
        * @param action The function to pass the X and Y components to.
        */
        function (action) {
            action(this.X);
            action(this.Y);
        };
        Vector2d.prototype.Normalized = /**
        * Returns the current vector as a unit vector. The result is a vector one unit in length pointing in the same direction as the original vector.
        */
        function () {
            var magnitude = this.Magnitude();
            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };
        Vector2d.prototype.Magnitude = /**
        * Calculates the magnitude or length of the vector
        */
        function () {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        };
        Vector2d.prototype.Length = /**
        * Calculates the length or magnitude of the vector
        */
        function () {
            return this.Magnitude();
        };
        Vector2d.prototype.Dot = /**
        * Calculates dot product.
        * @param vector Source vector.
        */
        function (vector) {
            return vector.X * this.X + vector.Y * this.Y;
        };
        Vector2d.prototype.Abs = /**
        * Returns a Vector2d that has the current Vector2d's X and Y components as positive values.
        */
        function () {
            return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
        };
        Vector2d.prototype.Sign = /**
        * Returns a Vector2d that has its X and Y components converted to -1, 0 or 1 depending on the current Vector2d's component values.
        */
        function () {
            return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
        };
        Vector2d.prototype.Distance = /**
        * Calculates the distance between the current vector and the provided one.
        */
        function (vector) {
            return new Vector2d(Math.abs(vector.X - this.X), Math.abs(vector.Y - this.Y));
        };
        Vector2d.prototype.Add = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X + val.Width, this.Y + val.Height);
            } else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        };
        Vector2d.prototype.Multiply = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X * val.Width, this.Y * val.Height);
            } else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        };
        Vector2d.prototype.Subtract = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X - val.Width, this.Y - val.Height);
            } else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        };
        Vector2d.prototype.SubtractFrom = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(val.Width - this.X, val.Height = this.Y);
            } else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        };
        Vector2d.prototype.Divide = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X / val.Width, this.Y / val.Height);
            } else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        };
        Vector2d.prototype.DivideFrom = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(val.Width / this.X, val.Height / this.Y);
            } else {
                return new Vector2d(val / this.X, val / this.Y);
            }
        };
        Vector2d.prototype.IsZero = /**
        * Determines whether this Vector2d's X and Y components are zero.
        */
        function () {
            return this.X === 0 && this.Y === 0;
        };
        Vector2d.prototype.Negate = /**
        * Returns a Vector2d that is the negated version of this Vector2d.
        */
        function () {
            return new Vector2d(this.X * -1, this.Y * -1);
        };
        Vector2d.prototype.Equivalent = /**
        * Determines whether this Vector2d has the same X and Y of the provided Vector2d.
        * @param vector The Vector2d to compare the current Vector2d to.
        */
        function (vector) {
            return this.X === vector.X && this.Y === vector.Y;
        };
        Vector2d.prototype.Clone = /**
        * Returns a Vector2d that has an identical X and Y component as the current Vector2d.
        */
        function () {
            return new Vector2d(this.X, this.Y);
        };
        Vector2d.prototype.toString = /**
        * Overridden toString method to display Vector2d in the (X, Y) format.
        */
        function () {
            return "(" + this.X + ", " + this.Y + ")";
        };
        return Vector2d;
    })();
    EndGate.Vector2d = Vector2d;    
})(EndGate || (EndGate = {}));
