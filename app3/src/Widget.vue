<script setup>
import moment from "moment";
</script>
<template>
  <div class="system">
    <h2>App 3 Widget</h2>
    <p>Using <strong>momentjs</strong> for format the date</p>
    <p>{{ moment().format("MMMM Do YYYY, h:mm:ss a") }}</p>
  </div>
</template>

<style scope lang="sass"></style>
