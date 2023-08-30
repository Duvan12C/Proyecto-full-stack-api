<template>
  <v-card :loading="loading" class="mx-auto mb-6" color="blue-grey-darken-4" width="600">
    <v-btn class="ma-2" color="orange-darken-2">
      <v-icon start icon="mdi-arrow-left"></v-icon>
      <RouterLink style="text-decoration: none; color: white;" to="/producto">Regresar</RouterLink>
    </v-btn>
  </v-card>
  <v-card :loading="loading" class="mx-auto" color="blue-grey-darken-4" width="600">
    <template v-slot:title>
      <v-icon>
        mdi-store-plus
      </v-icon>
      Creación de Producto
    </template>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="nombre" label="Nombre" required hide-details></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="precio" label="Precio" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="descripcion" label="Descripción" hide-details required></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-col cols="auto">
            <v-btn density="compact" color="green-lighten-2" @click="crearProducto" icon="mdi-content-save">

            </v-btn>
          </v-col>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';
import { confirmacion, show_alerta } from '../../functions';

export default {
  data() {
    return {
      loading: false,
      nombre: '',
      precio: '',
      descripcion: '',
      valid: false,
      backendErrorMessage: '',
    };
  },

  methods: {
    async crearProducto() {
      this.loading = true;

      try {
        const response = await axios.post('http://localhost:8080/productos/store', {
          nombre: this.nombre,
          precio: this.precio,
          descripcion: this.descripcion,
        });

        console.log('Respuesta del servidor:', response.data);

        show_alerta(response.data.message, 'success', '');

        this.nombre = '';
        this.precio = '';
        this.descripcion = '';


      } catch (error) {
        console.error('Error al crear el producto:', error.response.data.messages.error);

        this.backendErrorMessage = error.response.data.messages.error;
        show_alerta(this.backendErrorMessage, 'error', '');
      }

      this.loading = false;
    },
  },
};
</script>
