<script setup>
import { reactive, watch } from "vue";
import Widget from "./Widget.vue";
</script>
<template>
  <header>
    <div>
      <h1>Dynamic System Host</h1>
      <h2>App 2</h2>
      <Widget />
    </div>
  </header>
</template>

<style scope lang="sass">
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
