import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environments';
import { Funcionario } from '../_models/funcionario';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Funcionario>;
    public currentUser: Observable<Funcionario>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Funcionario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Funcionario {
        return this.currentUserSubject.value;
    }

    login(usuario: string, senha: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/autenticar`, { usuario, senha })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {

        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}