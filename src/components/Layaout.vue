<script setup>


</script>


<template>
  <v-toolbar density="comfortable" color="" title="Application"></v-toolbar>
  <v-app-bar density="comfortable" color="blue-grey-darken-4" class="white--text">
    <template v-slot:prepend>
      <v-btn>
        <v-icon>mdi-home</v-icon>
        <RouterLink style="text-decoration: none; color: white;" to="/">Inventory System</RouterLink>
      </v-btn>
    </template>
    <v-btn>
      <v-icon>mdi-store</v-icon>
      <RouterLink style="text-decoration: none; color: white;" to="/producto">Productos</RouterLink>
    </v-btn>
    <v-btn>
      <v-icon>mdi-account</v-icon>
      <RouterLink style="text-decoration: none; color: white;" to="/inventario">Inventario</RouterLink>
    </v-btn>
    <v-btn>
      <v-icon>mdi-calendar-end-outline</v-icon>
      <RouterLink style="text-decoration: none; color: white;" to="/movimientos">Movimientos</RouterLink>
    </v-btn>
  </v-app-bar>
</template>
