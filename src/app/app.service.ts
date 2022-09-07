import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _httpClient: HttpClient) {}

  getFile(reportId: number) {
    let url =
      environment.server + 'api/query/reportFromId?reportId=' + reportId;
    const headers: HttpHeaders = new HttpHeaders({ Accept: 'text/html' });
    return this._httpClient.get(url, {
      headers: headers,
      responseType: 'text',
    });
  }

  getAllReportId(): Observable<Array<number>> {
    return this._httpClient
      .get(environment.server + 'api/query/allReportId')
      .pipe(map((res: any) => res));
  }

  getAllMongoReportId(): Observable<Array<number>> {
    return this._httpClient
      .get(environment.server + 'api/query/allMongoReportId')
      .pipe(map((res: any) => res));
  }
}
