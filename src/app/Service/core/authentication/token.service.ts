import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // setToken(token: any) {
  //     throw new Error("Method not implemented.");
  // }

  private token: string | null = null;
  private tenant_id: string | null = null;

  constructor() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token = savedToken;
    }

    const tenant = localStorage.getItem('tenant_id');
    if (tenant) {
      this.tenant_id = tenant;
    }
  }

  getEncodedToken(): string | null {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token = savedToken;
    }
    return this.token;
  }
  setToken(token?: string | null) {
    this.token = token || null;

    if (token) {
        localStorage.setItem(token, token);
    } else {
      localStorage.removeItem(token);
    }
  }
  
  getTenantID(): string | null {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token = savedToken;
    }
    return this.tenant_id;
  }

  isTokenValidated(): boolean {
    return this.token !== null ? true : false;
  }


}

