import Swal from "sweetalert2";
import { nextTick } from "vue";

export function show_alerta(msj, icon, focus) {
  if (focus !== "") {
    nextTick(() => focus.value.focus());
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    background: "#222",
    color: "white",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    buttonsStyling: true,
    title: msj,
  });
}

export function confirmacion(name, url, redirect) {
  const Toast = Swal.mixin({
    buttonsStyling: true,
    toast: true,
    position: "bottom-end",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "question",
    title: "Estas seguro de eliminar" + name + "?",
  }).then((result) => {
    if (result.isConfirmed) {
      //send delete ...
    }
  });
}

export async function sendRequest(method, params, url, redirect = "") {
  //pending ...
}
