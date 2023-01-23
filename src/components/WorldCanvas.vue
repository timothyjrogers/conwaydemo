<script lang="ts">
export default {
   props: {
    size: String,
    genpct: Number,
    paused: Boolean,
    manualSteps: Number
  },
  data() {
      return {
          timer: null,
          cells: [],
          livingcells: 0,
          generation: 0
      }
  },
  methods: {
      initializeSimulation() {
        for (var i = 0; i < this.size * this.size; i++) {
            if (Math.floor(Math.random() * 100) < this.genpct) {
                this.cells.push(true);
                this.livingcells = this.livingcells + 1
            } else {
                this.cells.push(false);
            }
        }
        this.$emit('livingcells', this.livingcells)
      },
      drawWorld() {
        this.worldCanvas.fillStyle = "rgb(255, 255, 255)";
        this.worldCanvas.fillRect(0, 0, this.getDimension, this.getDimension);
        this.worldCanvas.fillStyle = "rgb(0, 0, 0)";
        for (var i = 0; i < this.cells.length; i++) {
              var x = 5 * (i % this.size);
              var y = 5 * Math.floor(i / this.size);
            if (this.cells[i]) {
                this.worldCanvas.fillRect(x, y, 5, 5);
            }
        }
      },
      updateWorld() {
          var world = this.cells
          for (var i = 0; i < this.cells.length; i++) {
              var alive = this.cells[i]
              var neighbors = 0;
              var x = 5 * (i % this.size);
              var y = 5 * Math.floor(i / this.size);
              var xvals = [x]
              var yvals = [y]
              if (y == 0) {
                  yvals.push(y+5)
                  yvals.push(this.getDimension - 5)
              } else if (y == this.getDimension - 5) {
                  yvals.push(0)
                  yvals.push(y-5)
              } else {
                  yvals.push(y-5)
                  yvals.push(y+5)
              }
              if (x == 0) {
                  xvals.push(x+5)
                  xvals.push(this.getDimension - 5)
              } else if (x == this.getDimension-5) {
                  xvals.push(0)
                  xvals.push(x-5)
              } else {
                  xvals.push(x-5)
                  xvals.push(x+5)
              }
              for (var xval of xvals) {
                  for (var yval of yvals) {
                      var index = ((yval / 5) * this.size) + (xval / 5)
                      if (this.cells[index]) {
                          neighbors++;
                      }
                  }
              }
              if (alive) {
                  if (neighbors < 2) {
                      world[i] = false;
                      this.livingcells = this.livingcells - 1
                  } else if (neighbors > 3) {
                      world[i] = false;
                      this.livingcells = this.livingcells - 1
                  }
              } else {
                  if (neighbors == 3) {
                      world[i] = true;
                      this.livingcells = this.livingcells + 1
                  }
              }
          }
          this.cells = world;
          this.generation = this.generation + 1;
          this.drawWorld();
          this.$emit('livingcells', this.livingcells)
          this.$emit('generation', this.generation);
      }
  },
  computed: {
      getDimension() {
          return this.size * 5
      },

  },
  watch: {
      paused: function(updatedVal, originalVal) {
          if (!originalVal) {
              clearInterval(this.timer);
          } else {
            this.timer = setInterval(() => {
                this.updateWorld()
            }, 1000)
          }
      },
      manualSteps: function(updatedVal, originalVal) {
          this.updateWorld()
      }
  },
    mounted() {
        var canvas = document.getElementById("world-canvas");
        var ctx = canvas.getContext("2d");    
        this.worldCanvas = ctx;
        this.worldCanvas.fillStyle = "rgb(255, 255, 255)";
        this.worldCanvas.fillRect(0, 0, this.getDimension, this.getDimension);
        this.initializeSimulation();
        this.drawWorld();
        this.timer = setInterval(() => {
            this.updateWorld()
        }, 1000)
    },
    beforeUnmount() {
        clearInterval(this.timer)
    }
}
</script>

<template>
      <canvas id="world-canvas" :width="getDimension" :height="getDimension">Conway Simulation</canvas>
</template>

<style scoped>
canvas {
    border: 1px solid white;
}
</style>