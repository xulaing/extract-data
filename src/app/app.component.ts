import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  reportHtml: string = '';
  reportsId: number[] = [];
  mongoReportsId: number[] = [];
  reportsToLoad: number[] = [];

  constructor(
    private _appService: AppService,
    private _httpClient: HttpClient
  ) {}

  async ngOnInit() {
    // All the reports' id in the sql database
    const SQLReport = await this._appService.getAllReportId().toPromise();
    this.reportsId = SQLReport;

    // All the reports'id in the nosql database
    const NOSQLReport = await this._appService
      .getAllMongoReportId()
      .toPromise();
    this.mongoReportsId = NOSQLReport;

    var temp = [];
    for (let id of this.reportsId) {
      if (!this.mongoReportsId.includes(id)) {
        temp.push(id);
      }
    }

    this.reportsToLoad = temp.filter(this.filterNumbers(88, 100));

    // Create iframe
    var iframe = document.createElement('iframe');

    for (let id of this.reportsToLoad) {
      // Get the report html/text
      const HtmlText = await this._appService.getFile(id).toPromise();
      this.reportHtml = HtmlText;

      // Add style to the iframe
      iframe.srcdoc = this.reportHtml;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.bottom == '0';

      // Insert the data in the nosql database
      var response;
      if (typeof window.addEventListener != 'undefined') {
        window.addEventListener(
          'message',
          function (e: any) {
            if (e.data[0] == 'data') {
              response = e.data[1];
              console.log(response);
              let mongo = [];
              let count = 0;
              for (let key in response) {
                let value = response[key];
                let namelabel = id.toString() + '-' + count.toString();
                let jsonEl = { id: namelabel, name: key, label: value };
                mongo.push(jsonEl);
                count++;
              }
              let data = Object.assign({ _id: id }, { _data: mongo });
              console.log(data);
              var xhr = new XMLHttpRequest();
              xhr.open('PUT', 'https://localhost:44366/upsert-data', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify(data));
            } else {
              return;
            }
          },
          false
        );
      }

      // Add the iframe to the page
      var elmnt: any = document.getElementById('report');
      elmnt.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow?.postMessage('message', '*');
      };
    }
  }

  filterNumbers(min: number, max: number) {
    return function (a: number) {
      return a >= min && a <= max;
    };
  }
}
