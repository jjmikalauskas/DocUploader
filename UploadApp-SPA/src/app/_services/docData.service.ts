import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocInfo } from '../models/docinfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocDataService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getDocumentInfo(emaillink): Observable<DocInfo> {
  return this.http.get<DocInfo>(this.baseUrl + 'licensing/' + emaillink);
  // return x;
}

}
