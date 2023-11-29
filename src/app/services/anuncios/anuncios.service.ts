import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnuncio } from '../../models/anuncio.model';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  url: string = "http://localhost:5000/anuncios";
  

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<IAnuncio[]> {
    return this.httpClient.get<IAnuncio[]>(this.url);
  }

  findById(_id: string): Observable<IAnuncio> {
    return this.httpClient.get<IAnuncio>(`${this.url}/id/${_id}`);
  }

  findBydireccion(direccion: string): Observable<IAnuncio> {
    return this.httpClient.get<IAnuncio>(`${this.url}/${direccion}`);
  }

  create(anuncio :IAnuncio): Observable<IAnuncio> {
    return this.httpClient.post<IAnuncio>(this.url, anuncio);
  }

  update(book: IAnuncio): Observable<IAnuncio> {
    return this.httpClient.put<IAnuncio>(`${this.url}/${book._id}`, book);
  }

  httpOptions = {
    observe: 'response' as 'body'
  }
  deleteById(_id: number): Observable<HttpResponse<{}>> {
    return this.httpClient.delete<HttpResponse<{}>>(`${this.url}/${_id}`, this.httpOptions);
  }
}

