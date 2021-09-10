function Button(x, y, w, h, r, g, b, t) {
  this.x = x;
  this.y = y;
  this.bWidth = w;
  this.bHeight = h;
  this.colour = color(r, g, b);
  this.text = t;
  this.clicked = false;

  this.update = function () {
    if (start && end) {
      if (mouseX >= this.x && mouseX <= this.x + this.bWidth &&
        mouseY >= this.y && mouseY <= this.y + this.bHeight) {
        strokeWeight(4);
        if (mouseIsPressed && mouseButton == LEFT) {
          strokeWeight(2);
          this.clicked = true;
        }
      }
    }

    if (!mouseIsPressed) this.clicked = false;
  }

  this.display = function () {
    fill(this.colour);
    rect(this.x, this.y, this.bWidth, this.bHeight);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(12);
    strokeWeight(0);
    text(this.text, this.x + (this.bWidth / 2), this.y + (this.bHeight / 2));
  }

  this.isClicked = function () {
    return this.clicked;
  }

  this.unClick = function () {
    this.clicked = false;
  }
}