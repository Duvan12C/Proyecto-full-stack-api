<template>
  <v-btn class="ma-2" color="green-darken-2">
    <v-icon start icon="mdi-plus"></v-icon>
    <RouterLink style="text-decoration: none; color: white;" to="/crear/producto"> Crear Producto</RouterLink>
  </v-btn>

  <v-table fixed-header class="bg-blue-grey-darken-4">
    <thead>
      <tr>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Descripción
        </th>
        <th class="text-left">
          Precio
        </th>
        <th class="text-left">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">

        <td>{{ item.nombre }}</td>
        <td>{{ item.descripcion }}</td>
        <td>${{ item.precio }}</td>
        <td>

          <v-row align="center">
            <v-btn size="small" variant="text" color="red" @click="deleteProducts(item)">
              <v-icon color="red">
                mdi-delete
              </v-icon>
            </v-btn>
            <v-btn size="small" variant="text" color="yellow">
              <RouterLink style="text-decoration: none; color: white;" :to="`/editar/producto/${item.id}`">
                <v-icon color="yellow">
                  mdi-square-edit-outline
                </v-icon>
              </RouterLink>
            </v-btn>
          </v-row>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Importa Axios


import { confirmacion, show_alerta } from '../../functions';

const products = ref([]);
const load = ref(false);


const getProducts = async () => {
  try {
    load.value = true;
    const response = await axios.get('http://localhost:8080/productos');
    products.value = response.data;

    show_alerta('Productos cargados exitosamente', 'success', '');
  } catch (error) {
    console.error('Error fetching products:', error);
    show_alerta('Error al cargar productos', 'error', '');
  } finally {
    load.value = false;
  }
};


onMounted(getProducts)

const deleteProducts = async (item) => {
  try {
    load.value = true;
    const response = await axios.delete(`http://localhost:8080/productos/delete/${item.id}`);
    // Actualiza la lista de productos después de la eliminación
    products.value = response.data;
    show_alerta('Producto eliminado exitosamente', 'success', '');
  } catch (error) {
    console.log(error);
    console.error('Error deleting product:', error);
    show_alerta(error.response.data.messages.error, 'error', '');
  } finally {
    load.value = false;
  }
};



</script>
