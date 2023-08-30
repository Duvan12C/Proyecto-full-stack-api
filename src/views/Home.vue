<template>
  <div>
    <v-container>

      <v-row align="start" no-gutters>
        <v-col cols="5">
          <v-card color="blue-grey-darken-4">
            <v-card-item>
              <v-card-title>Productos</v-card-title>
              <v-card-subtitle>Cantidad de Productos: {{ productos.length }}</v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <ul>
                <li v-for="producto in productos" :key="producto.id">
                  {{ producto.nombre }} - {{ producto.descripcion }} - ${{ producto.precio }}
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="2">
          <!-- Espacio en blanco -->
        </v-col>

        <v-col cols="5">
          <v-card color="blue-grey-darken-4">
            <v-card-item>
              <v-card-title>Más recientes</v-card-title>
              <v-card-subtitle>Últimos movimientos: {{ ultimosMovimientos.length }}</v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <ul>
                <li v-for="movimiento in ultimosMovimientos" :key="movimiento.id">
                  {{ formatFecha(movimiento.fecha) }} - {{ movimiento.descripcion }}
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
  data() {
    return {
      productos: [], // Lista de productos
      ultimosMovimientos: [], // Lista de últimos movimientos
    };
  },
  created() {
    this.fetchProductos();
    this.fetchUltimosMovimientos();
  },
  methods: {
    async fetchProductos() {
      try {
        const response = await axios.get('http://localhost:8080/productos');
        this.productos = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchUltimosMovimientos() {
      try {
        const response = await axios.get('http://localhost:8080/movimientos');
        this.ultimosMovimientos = response.data;
      } catch (error) {
        console.error('Error fetching recent movements:', error);
      }
    },
    formatFecha(fecha) {
      return format(new Date(fecha), 'dd/MM/yyyy HH:mm:ss');
    },
  },
};
</script>
