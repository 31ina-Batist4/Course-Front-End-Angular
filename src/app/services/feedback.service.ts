import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
}) 
export class FeedbackService {
   
  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseURL + 'feedback')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  
  getFeedback(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(baseURL + 'feedback/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError));
 }

 getFeedbacksIds(): Observable<string[] | any>{
  return this.getFeedbacks().pipe(map(feedbacks => feedbacks.map(feedback => feedback.id)))
  .pipe(catchError(error => error)); 
} 

postFeedback(feedback: Feedback): Observable<Feedback>{
  const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
  };
  return this.http.post<Feedback>(baseURL + 'feedback/' + feedback, httpOptions)
  .pipe(catchError(this.processHttpMsgService.handleError));
}
}
