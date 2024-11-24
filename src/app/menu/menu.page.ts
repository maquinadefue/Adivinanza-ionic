import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';  // Usamos App de Capacitor para salir de la app
import { Router } from '@angular/router'; // Para redirigir a otra página

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router  // Inyectamos Router para navegar a otras páginas
  ) { }

  ngOnInit() {}

  // Método para mostrar la alerta de confirmación
  async presentExitAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar Salida',
      message: '¿Estás seguro de que deseas salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            this.handleExit(); // Llamamos al método que maneja las acciones al salir
          }
        }
      ]
    });

    await alert.present();
  }

  // Método que maneja las acciones al confirmar la salida
  handleExit() {
    // 1. Cerrar sesión (si es necesario)
    this.logout();

    // 2. Redirigir a la página de inicio de sesión (opcional)
    this.router.navigateByUrl('/login');  // Redirige a la página de login

    // 3. Cerrar la aplicación en el móvil
    App.exitApp();  // Esto cerrará la app en dispositivos móviles (iOS/Android)
  }

  // Método para cerrar sesión (opcional)
  logout() {
    // Limpiar almacenamiento local o sesión si el usuario está autenticado
    localStorage.removeItem('userSession');  // Ejemplo de limpieza de datos
    console.log('Sesión cerrada');
  }
}
