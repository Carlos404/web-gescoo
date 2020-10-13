import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/autenticar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logado = false;
  erro = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autenticarService: AuthenticationService
  ) {
    if (this.autenticarService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.logado = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.autenticarService.login(this.f.usuario.value, this.f.senha.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this]);
        },
        erro => {
          this.erro = erro;
        });
  }
}
