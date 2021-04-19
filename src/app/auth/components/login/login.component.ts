import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';
import { tap } from 'rxjs/operators';
import { Login } from 'src/app/shared/models/usuario';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  sitekey = environment.sitekey;
  loading = false;
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  constructor(private fb: FormBuilder, 
    private authService: AuthService, private snackBar: MatSnackBar
    , private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const login: Login = this.loginForm.value;
    this.authService.login(login).subscribe(
      (res: any) => {
        this.loading = false;
        console.log(res)
        if(res.ok) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/task','main']);
        } else {
          this.snackBar.open('Correo o contraseña incorrecta', 'cerrar', {duration: 3000})
        }
      },
      err => {
        this.loading = false;
        this.loginForm.get('recaptcha').reset();
        this.captchaElem.resetCaptcha();
        this.snackBar.open('Correo o contraseña incorrecta', 'cerrar', {duration: 3000})}
    )
  }

}
