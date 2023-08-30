<template>
  <v-card :loading="loading" class="mx-auto mb-6" color="blue-grey-darken-4" width="600">
    <v-btn class="ma-2" color="orange-darken-2">
      <v-icon start icon="mdi-arrow-left"></v-icon>
      <RouterLink style="text-decoration: none; color: white;" to="/inventario">Regresar</RouterLink>
    </v-btn>
  </v-card>
  <v-card :loading="loading" class="mx-auto" color="blue-grey-darken-4" width="600">
    <template v-slot:title>
      <v-icon>
        mdi-clipboard-plus-outline
      </v-icon>
      Agregar Inventario
    </template>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-select v-model="selectedProductName" :items="productNames" label="Seleccione un producto"
              required></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="cantidad_disponible" label="Cantidad Disponible" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="cantidad_minima" label="Cantidad Minima" hide-details required></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-col cols="auto">
            <v-btn start color="green-lighten-2" @click="crearInventario" icon="mdi-content-save">
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';
import { show_alerta } from '../../functions';

export default {
  data() {
    return {
      loading: false,
      cantidad_disponible: '',
      cantidad_minima: '',
      valid: false,
      backendErrorMessage: '',
      selectedProductName: null,  // El nombre del producto seleccionado
      productNames: [],  // Lista de nombres de productos
    };
  },

  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8080/productos');
        const productsData = response.data;
        this.productNames = productsData.map(product => product.nombre);

      } catch (error) {
        console.error('Error fetching products:', error);
        // Manejo de error
      }
    },

    async crearInventario() {
      this.loading = true;

      const selectedProduct = this.selectedProductName;

      // Buscar el ID del producto seleccionado en la lista de nombres
      const selectedProductId = this.productNames.findIndex(product => product === selectedProduct);

      if (selectedProductId !== -1) {
        console.log('Producto ID:', this.selectedProductName);
        try {
          const response = await axios.post('http://localhost:8080/inventario/store', {
            producto_id: selectedProductId + 1,
            cantidad_disponible: this.cantidad_disponible,
            cantidad_minima: this.cantidad_minima,
          });

          console.log('Respuesta del servidor:', response.data);

          show_alerta(response.data.message, 'success', '');

          this.selectedProductName = null;
          this.cantidad_disponible = '';
          this.cantidad_minima = '';

        } catch (error) {

          console.error('Error al crear el producto:', error);
          console.log(error);
          this.backendErrorMessage = error.response.data.messages.error !== null ? error.response.data.messages.error : error.message;

          show_alerta(this.backendErrorMessage, 'error', '');
        }
      }

      this.loading = false;
    },
  },

  created() {
    this.fetchProducts();
  },
};
</script>
