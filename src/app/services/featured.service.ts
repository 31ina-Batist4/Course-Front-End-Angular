import { Injectable } from '@angular/core';
import { Featured } from '../shared/featured';
import {  Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturedService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getFeatureds(): Observable<Featured[]> {
    return this.http.get<Featured[]>(baseURL + 'dishes.featured')
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeatured(id: string): Observable<Featured> {
    return this.http.get<Featured>(baseURL + 'featureds/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Featured> {
    return this.http.get<Featured[]>(baseURL + 'leaders?featured=true')
    .pipe(map(featuredLeader => featuredLeader[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
