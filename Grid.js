class Grid {
  constructor(config) {
    this.start_x = config.start_x;
    this.start_y = config.start_y;
    this.cell_size = config.cell_size;
    this.rows = config.grid_width / this.cell_size;
    this.cols = config.grid_height / this.cell_size;
    this.concentrarion = config.concentration
      ? config.concentration
      : random(0, 1);
    this.color_range = config.color_range;

    this.cell_grid = [];
    this.rule_alive = [];
    this.rule_dead = [];
    this.rule_binary = "";
    this.rule_decimal = 0;
    console.log(config);
    console.log(this);
    this.initialize_rules(config.grid_rule);
    this.initialize_grid_color();
    this.initialize_cell_grid();
  }

  initialize_cell_grid() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        const cell_config = {
          x: i * this.cell_size,
          y: j * this.cell_size,
          start_x: this.start_x,
          start_y: this.start_y,
          size: this.cell_size,
          rule_alive: this.rule_alive,
          rule_dead: this.rule_dead,
          alive_color: this.alive_color,
          dead_color: this.dead_color,
          concentration: this.concentrarion,
        };
        let cell = new Cell(cell_config);

        row.push(cell);
      }
      this.cell_grid.push(row);
    }
  }

  initialize_grid_color() {
    if (this.color_range != -1) {
      let r = random(this.color_range / 1.5, this.color_range);
      let g = random(this.color_range / 1.5, this.color_range);
      let b = random(this.color_range / 1.5, this.color_range);
      this.alive_color = color(r, g, b);
      r = random(0, this.color_range);
      g = random(0, this.color_range / 1.5);
      b = random(0, this.color_range / 1.5);
      this.dead_color = color(r, g, b);
    } else {
      this.alive_color = color(255);
      this.dead_color = color(0);
    }
  }

  initialize_rules(rule) {
    let rule_int;
    let rule_str;

    if (typeof rule == "number") {
      if (rule < 0 || rule > 262143 || rule - round(rule) != 0) {
        rule_int = 49184;
      } else {
        rule_int = rule;
      }
      rule_str = decimal_to_binary(rule_int);
      console.log(rule_str);
    } else if (typeof rule == "string") {
      if (binary_to_decimal(rule) == -1) {
        rule_str = "001100000000100000";
      } else {
        rule_str = rule;
      }
    }

    if (rule_str != undefined) {
      if (rule_str.length > 18 || rule_str.length <= 0) {
        rule_str = "001100000000100000";
      } else if (rule_str.length < 18) {
        while (rule_str.length < 18) {
          rule_str = "0" + rule_str;
        }
      }
      this.rule_alive = rule_str
        .substring(0, 9)
        .split("")
        .map((x) => int(x));
      this.rule_dead = rule_str
        .substring(9, 18)
        .split("")
        .map((x) => int(x));
      this.rule_decimal = binary_to_decimal(
        this.rule_alive.map((x) => str(x)).join("") +
          this.rule_dead.map((x) => str(x)).join("")
      );
      this.rule_binary = decimal_to_binary(this.rule_decimal);
    }
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.cell_grid[i][j].calcDecay();
        this.cell_grid[i][j].show();
        this.cell_grid[i][j].calcNextState(this.cell_grid);
      }
    }
  }

  next_gen() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.cell_grid[i][j].update();
      }
    }
  }
}
