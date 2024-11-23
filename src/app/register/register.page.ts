import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';
import { ToastController } from '@ionic/angular'; // Importamos ToastController para feedback visual

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: string = '';
  correo: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private api: GameApiService,
    private toastController: ToastController // Inyectamos ToastController
  ) { }

  ngOnInit() {}

  // Función que se llama cuando se hace clic en "Registrarse"
  async onClickRegistrar(form: NgForm) {
    // Validamos si el formulario es válido
    if (form.invalid) {
      // Si el formulario no es válido, mostramos un toast de error
      this.showToast('Por favor completa todos los campos correctamente.', 'danger');
      return;
    }

    // Intentamos registrar al usuario a través de la API
    try {
      await this.api.register(this.correo, this.usuario, this.password);
      // Si el registro es exitoso, redirigimos a la página de login y mostramos un toast de éxito
      this.showToast('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      // Si ocurre un error, mostramos el mensaje de error que viene de la API
      this.showToast(error.error?.message || 'Hubo un error al registrar. Intenta de nuevo.', 'danger');
    }
  }

  // Función para mostrar los toast
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
