import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
  };

  register() {
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Registration successfully');
  }
}
