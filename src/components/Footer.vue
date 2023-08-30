<template>
  <v-footer class="d-flex bg-red flex-column" color="blue-grey-darken-4">
    <div class="pb-4 d-flex w-100 align-center px-4">
      <di>
        <v-icon class="ml-4">mdi-hand-heart-outline</v-icon>
        <strong>Gracias por la oportunidad!</strong>
        <br>
        <v-icon>mdi-gmail</v-icon>
        <strong>iduvangonzalez.13@gmail.com</strong>
      </di>

      <v-spacer></v-spacer>


      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <h3>Tecnologias usadas</h3>
          <v-col cols="auto" class="text-center">
            <v-btn density="compact" variant="text" icon="mdi-vuetify"></v-btn>
            <v-btn density="compact" variant="text" icon="mdi-database"></v-btn>
            <v-btn density="compact" variant="text" icon="mdi-api"></v-btn>
            <v-btn density="compact" variant="text" icon="mdi-language-php"></v-btn>

          </v-col>
        </v-col>

      </v-row>
    </div>

    <div class=" bg-black text-center w-100">
      <a href="https://www.linkedin.com/in/duvan-ernesto-castellanos-gonzalez/"
        style="text-decoration: none;color: white;"><v-icon>mdi-linkedin</v-icon> Duvan</a> — <strong>Developer</strong>
    </div>
  </v-footer>
</template>
