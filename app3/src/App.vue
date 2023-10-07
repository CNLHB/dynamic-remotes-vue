<script setup>
import { reactive, watch } from "vue";
import Widget from "./Widget.vue";
import System from "./System.vue";
const state = reactive({
  system: "",
});
function setSystem(params) {
  state.system = params;
}
function setApp3() {
  setSystem({
    url: "http://localhost:3002/remoteEntry.js",
    scope: "app2",
    module: "./Widget",
    name: "Widget",
  });
}
</script>
<template>
  <header>
    <h1>Dynamic System Host</h1>
    <h2>App 3</h2>
    <button @click="setApp3">Load App 2 Widget</button>

    <div style="margin-top: 40px">
      <System :system="state.system" />
    </div>
    <Widget></Widget>
  </header>
</template>

<style scope lang="sass">
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
