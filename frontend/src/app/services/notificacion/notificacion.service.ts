import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private router: Router) { }

  success(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      color: 'green',
      showCloseButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }


  error(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__slideInLeft'
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutDown'
      }
    });
  }

  info(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'info',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'orange',
      color: 'black',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    });
  }

  warning(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  option(message: string) {
    Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Tareas',
      cancelButtonText: 'Ejemplo',
      showCloseButton: true,
      position: 'top',
      timerProgressBar: true,
      color: 'orange',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['tarea']);
      } else if (result.isDismissed) {
        this.router.navigate(['ejemplo']);
      }
    });
  }

  landing(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-start',
      icon: 'info',
      title: message,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      background: '#9ed98dff',
      color: 'green',
      showClass: {
        popup: 'animate__animated animate__slideInLeft'
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutRight'
      }
    });
  }

  async confirmar(message: string): Promise<boolean> {
    const result = await Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'blue',
      showCloseButton: true,
      position: 'top',
      color: 'red',
    });

    return result.isConfirmed;
  }
}
