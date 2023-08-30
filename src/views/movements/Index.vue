<template>
  <v-btn class="ma-2" color="green-darken-2">
    <v-icon start icon="mdi-plus"></v-icon>
    <RouterLink style="text-decoration: none; color: white;" to="/crear/movimientos">Crear Movimiento</RouterLink>
  </v-btn>
  <v-table fixed-header class="bg-blue-grey-darken-4">
    <thead>
      <tr>
        <th class="text-left">
          Id producto
        </th>
        <th class="text-left">
          Cantidad
        </th>
        <th class="text-left">
          Tipo
        </th>
        <th class="text-left">
          Fecha
        </th>
        <th class="text-left">
          Descripción
        </th>
        <th class="text-left">
          Acciones
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in movimientos" :key="item.id">
        <td>{{ item.producto_id }}</td>
        <td>{{ item.tipo }}</td>
        <td>{{ item.cantidad }}</td>
        <td>{{ item.fecha }}</td>
        <td>{{ item.descripcion }}</td>
        <td>

          <v-btn size="small" variant="text" color="red" @click="deleteMovimiento(item)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
          <v-btn size="small" variant="text" color="yellow">
            <RouterLink style="text-decoration: none; color: white;" :to="`/editar/movimientos/${item.id}`">
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
import axios from 'axios'; // Importa Axios
import { confirmacion, show_alerta } from '../../functions';


const movimientos = ref([]);
const load = ref(false);



const getmovimientos = async () => {
  try {
    load.value = true;
    const response = await axios.get('http://localhost:8080/movimientos');
    movimientos.value = response.data;

    show_alerta('movimientos cargados exitosamente', 'success', '');
  } catch (error) {
    console.error('Error fetching movimientos:', error);
    show_alerta('Error al cargar movimientos', 'error', '');
  } finally {
    load.value = false;
  }
};


onMounted(getmovimientos)

const deleteMovimiento = async (item) => {
  try {
    load.value = true;
    const response = await axios.delete(`http://localhost:8080/movimientos/delete/${item.id}`);
    // Actualiza la lista de movimientos después de la eliminación
    movimientos.value = response.data;
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
