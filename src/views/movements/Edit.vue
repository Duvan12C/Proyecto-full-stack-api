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
      Editar Movimiento
    </template>
    <v-form v-model="valid">
      <v-container>
        <v-row>
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
            <v-btn density="compact" color="green-lighten-2" @click="crearMovimiento" icon="mdi-content-save">
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

  computed: {
    inventarioId() {
      return this.$route.params.id;
    },
  },
  created() {

    this.cargarMovimiento(this.inventarioId);
  },

  methods: {
    async cargarMovimiento(id) {
      try {
        const response = await axios.get('http://localhost:8080/movimientos/get/' + id);
        console.log(response);
        this.cantidad = response.data.cantidad;
        this.descripcion = response.data.descripcion;

        const fechaObj = new Date(response.data.fecha);

        const fechaFormatted = fechaObj.toISOString().substr(0, 10);
        this.fecha = fechaFormatted;

      } catch (error) {
        console.error('Error fetching products:', error);

      }
    },

    async crearMovimiento() {
      this.loading = true;

      const selectedDate = new Date(this.fecha);

      // Obtener la hora actual
      const currentHours = new Date().getHours();
      const currentMinutes = new Date().getMinutes();
      const currentSeconds = new Date().getSeconds();

      // Establecer la hora actual en la fecha seleccionada
      selectedDate.setHours(currentHours);
      selectedDate.setMinutes(currentMinutes);
      selectedDate.setSeconds(currentSeconds);

      // Convertir la fecha modificada a formato ISO
      this.fecha = selectedDate.toISOString();

      try {
        const response = await axios.put('http://localhost:8080/movimientos/update/' + this.inventarioId, {
          cantidad: this.cantidad,
          descripcion: this.descripcion,
          fecha: this.fecha
        });

        console.log('Respuesta del servidor:', response.data);

        show_alerta(response.data.message, 'success', '');

        //this.selectedProductName = null;
        //this.cantidad = '';
        //this.descripcion = '';
        //this.fecha = '';

      } catch (error) {

        console.error('Error al crear el producto:', error.response.data.messages);
        console.log(error);
        this.backendErrorMessage = error.response.data.messages.error;
        show_alerta(this.backendErrorMessage, 'error', '');
      }

      this.loading = false;
    },
  },

};
</script>

