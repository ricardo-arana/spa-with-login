import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  sitekey = environment.sitekey;
  userForm = this.fb.group({
    nombre: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
    password: [null, Validators.required],
    password2: [null],
    recaptcha: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm.get('password2').setValidators(Validators.compose([Validators.required, this.confirmPass.bind(this)]))
  }

  onSubmit() {
    if(this.userForm.invalid) {
      return;
    }
    const usuario:Usuario = this.userForm.value;
    this.authService.crearUsuario(usuario).subscribe( res => console.log(res));
  }

  confirmPass(control: FormControl) {
    let pass = this.userForm.get('password').value;
    let confirmPass = control.value;

      return pass === confirmPass ? null : { notSame: true }  
  }
}
