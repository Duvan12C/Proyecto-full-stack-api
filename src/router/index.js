// Composables
import HomeVue from "@/views/Home.vue";
//--------------Productos----------------------------
import IndexProducts from "../views/products/Index.vue";
import CreateProducts from "../views/products/Create.vue";
import EditProducts from "../views/products/Edit.vue";
import ShowProducts from "../views/products/Show.vue";
//--------------Inventario----------------------------
import IndexInventory from "../views/inventory/Index.vue";
import CreateInventory from "../views/inventory/Create.vue";
import EditInventory from "../views/inventory/Edit.vue";
import ShowInventory from "../views/inventory/Show.vue";
//--------------Inventario----------------------------
import IndexMovements from "../views/movements/Index.vue";
import CreateMovements from "../views/movements/Create.vue";
import EditMovements from "../views/movements/Edit.vue";
import ShowMovements from "../views/movements/Show.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeVue, // cnombnre de componente se importara aca
  },
  {
    path: "/producto",
    name: "indexP",
    component: IndexProducts, // cnombnre de componente se importara aca
  },
  {
    path: "/crear/producto",
    name: "createP",
    component: CreateProducts, // cnombnre de componente se importara aca
  },
  {
    path: "/editar/producto/:id",
    name: "editP",
    component: EditProducts, // cnombnre de componente se importara aca
  },
  {
    path: "/ver/producto",
    name: "showP",
    component: ShowProducts, // cnombnre de componente se importara aca
  },

  //--------------------------------------------------------------------
  {
    path: "/inventario",
    name: "indexI",
    component: IndexInventory, // cnombnre de componente se importara aca
  },
  {
    path: "/crear/inventario/",
    name: "createI",
    component: CreateInventory, // cnombnre de componente se importara aca
  },
  {
    path: "/editar/inventario/:id",
    name: "editI",
    component: EditInventory, // cnombnre de componente se importara aca
  },
  {
    path: "/ver/inventario",
    name: "showI",
    component: ShowInventory, // cnombnre de componente se importara aca
  },
  //--------------------------------------------------------------------
  {
    path: "/movimientos",
    name: "indexM",
    component: IndexMovements, // cnombnre de componente se importara aca
  },
  {
    path: "/crear/movimientos",
    name: "createM",
    component: CreateMovements, // cnombnre de componente se importara aca
  },
  {
    path: "/editar/movimientos/:id",
    name: "editM",
    component: EditMovements, // cnombnre de componente se importara aca
  },
  {
    path: "/ver/movimientos",
    name: "showM",
    component: ShowMovements, // cnombnre de componente se importara aca
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
