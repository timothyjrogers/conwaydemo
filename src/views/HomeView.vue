<script lang="ts">
import WorldCanvas from '../components/WorldCanvas.vue'
export default {
  components: {
    WorldCanvas
  },
  data() {
    return {
      gridsize: "100",
      genpct: 10,
      simulating: false,
      cells: [],
      livingCells: 0,
      generation: 0,
      paused: false,
      steps: 0
    }
  },
  methods: {
    startSimulation() {
      this.simulating = true
    },
    stopSimulation() {
      this.cells = [];
      this.simulating = false;
    },
    updateLivingCells(val) {
      this.livingCells = val;
    },
    updateGeneration(val) {
      this.generation = val;
    },
    togglePause() {
      if (this.paused) {
        this.paused = false;
        document.getElementById('pause-button').innerText = 'Pause';
      } else {
        this.paused = true;
        document.getElementById('pause-button').innerText = 'Resume';
      }
    },
    step() {
      this.steps = this.steps + 1;
    }
  }
}
</script>

<template>
  <div id="content">
    <div v-if="!simulating" id="settings-panel">
      <h3 id="section-header">Configure Simulation</h3>
      <div class="setting-wrapper">
        <label class="setting-label" for="gridsize">Grid Size</label>
        <input v-model="gridsize" type="range" id="gridsize" name="gridsize" min="10" max="100">
        <span class="setting-value">{{ gridsize }}</span>
      </div>
      <div class="setting-wrapper">
        <label class="setting-label" for="genpct">Initial Spawn Chance</label>
        <input v-model="genpct" type="range" id="genpct" name="genpct" min="1" max="100">
        <span class="setting-value">{{ genpct }}</span>
      </div>
      <button @click="startSimulation">Start Simulation</button>
    </div>
    <div v-if="simulating" id="simulation-panel">
      <WorldCanvas :size=gridsize :genpct=genpct :paused=paused :manualSteps=steps @livingcells="updateLivingCells" @generation="updateGeneration" />
      <div id="simulation-details">
        <span class="simulation-detail">Grid Size: {{ gridsize }}</span>
        <span class="simulation-detail">Initial Spawn Chance: {{ genpct }}</span>
        <span class="simulation-detail">Generation: {{ generation }}</span>
        <span class="simulation-detail">Alive: {{ livingCells }} / {{ gridsize * gridsize }}</span>
      </div>
      <div id="simulation-controls">
        <button class="simulation-control-button" id="pause-button" @click="togglePause">Pause</button>
        <button class="simulation-control-button" :disabled="!paused" @click="step">Step</button>
        <button class="simulation-control-button" @click="stopSimulation">Reset</button>
      </div>
    </div>
  </div>
</template>

<style>
#content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

input {
  margin-left: 1em;
  margin-right: 1em;
}

#settings-panel {
  align-self: center;
  width: 100%;
  text-align: center;
}

.setting-wrapper {
  align-self: center;
  text-align: center;
  width: 100%;
}

#simulation-panel {
  display: flex;
  flex-direction: column;
}

#simulation-details {
  margin-top: 1em;
  margin-bottom: 1em;
}

.simulation-detail {
  margin: 1em;
}

#simulation-controls {
  margin: 0 auto;
  text-align: center;
}

.simulation-control-button {
  margin: .5em;
}

</style>