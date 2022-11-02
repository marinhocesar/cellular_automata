const MAX_DECAY = 60;
class Cell {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.start_x = config.start_x;
    this.start_y = config.start_y;
    this.size = config.size;
    this.index_i = this.x / this.size;
    this.index_j = this.y / this.size;
    this.state = round(random(0, config.concentration));
    this.decay = this.state ? MAX_DECAY : 0;
    this.future_state = this.state;
    this.rule_alive = config.rule_alive;
    this.rule_dead = config.rule_dead;
    this.has_changed = true;
    this.alive_color = config.alive_color;
    this.dead_color = config.dead_color;
  }

  show() {
    if (!this.has_changed) {
      return;
    }

    noStroke();
    if (this.decay == 0 && this.state == 0) {
      fill(this.dead_color);
    }

    if (this.state == 0 && this.decay > 0) {
      let alive_color = color(this.alive_color);
      let dead_color = color(this.dead_color);
      let r =
        (red(alive_color) * (this.decay) + red(dead_color) * (MAX_DECAY + 1 - this.decay)) / (1 + MAX_DECAY);
      let g =
        (green(alive_color) * (this.decay) + green(dead_color) * (MAX_DECAY + 1 - this.decay)) / (1 + MAX_DECAY);
      let b =
        (blue(alive_color) * (this.decay) + blue(dead_color) * (MAX_DECAY + 1 - this.decay)) / (1 + MAX_DECAY);
      let decay_color = color(r, g, b);
      fill(decay_color);
    }

    if (this.state == 1) {
      fill(this.alive_color);
    }

    rect(this.x + this.start_x, this.y + this.start_y, this.size);
  }

  calcNear(cell_grid) {
    let near_alive = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let index_x = i + this.index_i;
        let index_y = j + this.index_j;

        if (i == 0 && j == 0) {
          continue;
        }
        if (
          index_x < 0 ||
          index_y < 0 ||
          index_x >= cell_grid.length ||
          index_y >= cell_grid[0].length
        ) {
          continue;
        }
        let near = cell_grid[index_x][index_y].state;

        if (near == 1) {
          near_alive += 1;
        }
      }
    }
    return near_alive;
  }

  calcDecay() {
    if (this.state == 1 || this.decay < 1) {
      return;
    }

    this.decay -= 1;
    this.has_changed = true;
  }

  calcNextState(cell_grid) {
    let near_alive = this.calcNear(cell_grid);

    if (this.state == 0) {
      this.future_state = this.rule_dead[near_alive];
    } else {
      this.future_state = this.rule_alive[near_alive];
    }

    if (this.future_state == 1) {
      this.decay = MAX_DECAY;
    }
    this.has_changed = !(this.state == this.future_state);
  }

  update() {
    if (!this.has_changed) {
      return;
    }

    this.state = this.future_state;
  }
}
