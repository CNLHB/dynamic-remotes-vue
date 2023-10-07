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
const props = defineProps({
  system: [Object, String],
});
const { ready, failed, dynamicComponents } = useDynamicScript(
  toRefs(props).system
);
</script>
<template>
  <div class="system">
    <h2 v-if="!props.system">Not system specified</h2>
    <h2 v-else-if="!ready">Loading dynamic script: {{ props.system.url }}</h2>
    <h2 v-else-if="failed">
      Failed to load dynamic script: {{ props.system.url }}
    </h2>
    <h2 v-else>
      <component :is="dynamicComponents.get('Widget')"></component>
    </h2>
  </div>
</template>

<style scope lang="sass"></style>
