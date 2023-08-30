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
        mdi-store-edit
      </v-icon>
      Editar Producto
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
            <v-btn density="compact" color="green-lighten-2" @click="editarProducto" icon="mdi-content-save">

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
  computed: {
    productId() {
      return this.$route.params.id;
    },
  },
  created() {
    // Cargar los datos del producto existente usando this.productId
    this.cargarProducto(this.productId);
  },
  methods: {
    async cargarProducto(id) {
      try {
        const response = await axios.get('http://localhost:8080/productos/get/' + id);

        this.nombre = response.data.nombre;
        this.precio = response.data.precio;
        this.descripcion = response.data.descripcion;

      } catch (error) {
        console.error('Error al cargar el producto:', error.response.data.messages.error);

        this.backendErrorMessage = error.response.data.messages.error;
        show_alerta(this.backendErrorMessage, 'error', '');
      }
    },

    async editarProducto() {
      this.loading = true;

      try {
        const response = await axios.put('http://localhost:8080/productos/update/' + this.productId, {
          nombre: this.nombre,
          precio: this.precio,
          descripcion: this.descripcion,
        });

        console.log('Respuesta del servidor:', response.data);

        show_alerta(response.data.message, 'success', '');

      } catch (error) {
        console.error('Error al editar el producto:', error.response.data.messages.error);

        this.backendErrorMessage = error.response.data.messages.error;
        show_alerta(this.backendErrorMessage, 'error', '');
      }

      this.loading = false;
    },

  },
};
</script>
