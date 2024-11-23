import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';
import { ToastController } from '@ionic/angular'; // Importamos ToastController para los mensajes de retroalimentación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private api: GameApiService,
    private toastController: ToastController // Inyectamos ToastController
  ) { }

  ngOnInit() {}

  // Función que se llama cuando se hace clic en "Ingresar"
  async onClickIngresar(form: NgForm) {
    // Validamos si el formulario es válido
    if (form.invalid) {
      // Si el formulario no es válido, mostramos un toast de error
      this.showToast('Por favor completa todos los campos correctamente.', 'danger');
      return;
    }

    // Intentamos hacer login a través de la API
    try {
      await this.api.login(this.usuario, this.password);
      // Si el login es exitoso, mostramos un toast de éxito y redirigimos
      this.showToast('¡Bienvenido!', 'success');
      this.router.navigate(['/menu']);
    } catch (error: any) {
      // Si ocurre un error, mostramos un mensaje de error que viene de la API
      this.showToast(error.error?.message || 'Hubo un error al iniciar sesión. Intenta de nuevo.', 'danger');
    }
  }

  // Función para mostrar los toasts
  async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }
}
