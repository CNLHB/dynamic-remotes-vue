<script setup>
import { reactive, defineAsyncComponent, watch } from "vue";
import System from "./System.vue";
const state = reactive({
  system: "",
});
let dynamicCp = defineAsyncComponent(() => import("app2/Slider"));
function setSystem(params) {
  state.system = params;
}
function setApp2() {
  setSystem({
    url: "http://localhost:3002/remoteEntry.js",
    scope: "app2",
    module: "./Widget",
    name: "Widget",
  });
}

function setApp3() {
  setSystem({
    url: "http://localhost:3003/remoteEntry.js",
    scope: "app3",
    module: "./Widget",
    name: "Widget",
  });
}
</script>
<template>
  <header>
    <div class="wrapper">
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation
        <strong>remotes</strong> and <strong>exposes</strong>. It will no load
        components that have been loaded already.
      </p>
      <dynamicCp></dynamicCp>
      <button @click="setApp2">Load App 2 Widget</button>
      <button @click="setApp3">Load App 3 Widget</button>
      <div style="margin-top: 40px">
        <System :system="state.system" />
      </div>
    </div>
  </header>
</template>

<style scope lang="sass">
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
