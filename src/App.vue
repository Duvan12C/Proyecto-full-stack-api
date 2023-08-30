

<script setup>
import { RouterView } from 'vue-router';
import Layaout from './components/Layaout.vue';
import Footer from './components/Footer.vue';
/*  <Layaout app />
    <v-content>
      <RouterView />
    </v-content>
*/
  //
</script>
<template>
  <v-app style="background-color: #000000;">
    <Layaout app />
    <v-content class="bt-12">
      <v-container>
        <RouterView />

      </v-container>
    </v-content>
    <Footer app />
  </v-app>
</template>
