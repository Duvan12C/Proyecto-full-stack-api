<template>
  <v-card :loading="loading" class="mx-auto mb-6" color="blue-grey-darken-4" width="600">
    <v-btn class="ma-2" color="orange-darken-2">
      <v-icon start icon="mdi-arrow-left"></v-icon>
      <RouterLink style="text-decoration: none; color: white;" to="/movimientos">Regresar</RouterLink>
    </v-btn>
  </v-card>
  <v-card :loading="loading" class="mx-auto" color="blue-grey-darken-4" width="600">
    <template v-slot:title>
      <v-icon>
        mdi-table-plus
      </v-icon>
      Hacer Movimiento
    </template>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-select v-model="selectedProductName" :items="productNames" label="Seleccione un producto"
              required></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="cantidad" label="Cantidad a mover" hide-details required></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="descripcion" label="Descripccion" hide-details required></v-text-field>
          </v-col>
          <v-col cols="6">

            <v-text-field v-model="fecha" label="Fecha" v-mask="'##/##/####'" type="date" required></v-text-field>

          </v-col>
        </v-row>
        <v-card-actions>
          <v-col cols="auto">
            <v-btn density="compact" color="green-lighten-2" @click="crearInventario" icon="mdi-content-save">
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
      cantidad: '',
      descripcion: '',
      fecha: '',
      valid: false,
      backendErrorMessage: '',
      selectedProductName: null,
      productNames: [],
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

      }
    },

    async crearInventario() {
      this.loading = true;

      const selectedProduct = this.selectedProductName;


      const selectedProductId = this.productNames.findIndex(product => product === selectedProduct);

      if (selectedProductId !== -1) {
        const selectedDate = new Date(this.fecha);

        const currentHours = new Date().getHours();
        const currentMinutes = new Date().getMinutes();
        const currentSeconds = new Date().getSeconds();


        selectedDate.setHours(currentHours);
        selectedDate.setMinutes(currentMinutes);
        selectedDate.setSeconds(currentSeconds);

        this.fecha = selectedDate.toISOString();

        try {
          const response = await axios.post('http://localhost:8080/movimientos/store', {
            producto_id: selectedProductId + 1,
            cantidad: this.cantidad,
            descripcion: this.descripcion,
            fecha: this.fecha
          });

          console.log('Respuesta del servidor:', response.data);

          show_alerta(response.data.message, 'success', '');

          this.selectedProductName = null;
          this.cantidad = '';
          this.descripcion = '';
          this.fecha = '';

        } catch (error) {

          console.error('Error al crear el producto:', error.response.data.messages);
          console.log(error);
          this.backendErrorMessage = error.response.data.messages.error;
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

