<script setup>
import {
  defineAsyncComponent,
  reactive,
  ref,
  watch,
  toRefs,
  markRaw,
} from "vue";
import { useDynamicScript } from "./useDynamicScript";
const system = ref({
  url: "http://localhost:3003/remoteEntry.js",
  scope: "app3",
  module: "./Widget",
  name: "Widget",
});
const { ready, failed, dynamicComponents } = useDynamicScript(system);
</script>
<template>
  <div class="system">
    <h2>App 2 Widget</h2>
    <p>Using <strong>momentjs</strong> for format the date</p>
    <div class="system">
      <h2 v-if="!system">App 2 Not system specified</h2>
      <h2 v-else-if="!ready">App 2 Loading dynamic script: {{ system.url }}</h2>
      <h2 v-else-if="failed">
        App 2 Failed to load dynamic script: {{ system.url }}
      </h2>
      <h2 v-else>
        <component :is="dynamicComponents.get('Widget')"></component>
      </h2>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import url('./css/base.css');
</style>
