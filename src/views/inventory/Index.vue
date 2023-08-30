<template>
  <v-btn class="ma-2" color="green-darken-2">
    <v-icon start icon="mdi-plus"></v-icon>
    <RouterLink style="text-decoration: none; color: white;" to="/crear/inventario"> Agregar Inventario</RouterLink>
  </v-btn>
  <v-table fixed-header class="bg-blue-grey-darken-4">
    <thead>
      <tr>
        <th class="text-left">
          Id producto
        </th>
        <th class="text-left">
          Cantidad Disponible
        </th>
        <th class="text-left">
          Cantidad Minima
        </th>
        <th class="text-left">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in inventory" :key="item.id">
        <td>{{ item.producto_id }}</td>
        <td>{{ item.cantidad_disponible }}</td>
        <td>{{ item.cantidad_minima }}</td>
        <td>

          <v-btn size="small" variant="text" color="red" icon="" @click="deleteInventory(item)">
            <v-icon color="red">
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn size="small" variant="text" color="yellow">
            <RouterLink style="text-decoration: none; color: white;" :to="`/editar/inventario/${item.id}`">
              <v-icon color="yellow">
                mdi-square-edit-outline
              </v-icon>
            </RouterLink>
          </v-btn>

        </td>
      </tr>

    </tbody>
  </v-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { confirmacion, show_alerta } from '../../functions';

const inventory = ref([]);
const load = ref(false);


const getInventory = async () => {
  try {
    load.value = true;
    const response = await axios.get('http://localhost:8080/inventario');
    inventory.value = response.data;
    show_alerta('Inventario cargados exitosamente', 'success', '');
  } catch (error) {
    console.error('Error fetching Inventory:', error);
    show_alerta('Error al cargar productos', 'error', '');
  } finally {
    load.value = false;
  }
};


onMounted(getInventory)

const deleteInventory = async (item) => {
  try {
    load.value = true;
    const response = await axios.delete(`http://localhost:8080/inventario/delete/${item.id}`);
    // Actualiza la lista de productos después de la eliminación
    inventory.value = response.data;
    show_alerta('Inventario  eliminado exitosamente', 'success', '');
  } catch (error) {
    console.log(error);
    console.error('Error deleting product:', error);
    show_alerta(error.response.data.messages.error, 'error', '');
  } finally {
    load.value = false;
  }
};


</script>
