import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import demodata from './families.json';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  private API_BASE_URL = environment.API_BASE_URL;

  url = 'Families?pageIndex=0&pageSize=0';


  private groupList = new BehaviorSubject([]);
  groupList$ = this.groupList.asObservable();

  constructor(private httpService: HttpService,
    private http: HttpClient) { }

  getGroups() {
    this.groupList.next(demodata);
    return demodata;
    // return this.httpService.get('posts').pipe(
    //   tap((res) => {
    //     this.groupList.next(res);
    //     return res;
    //   }),
    //   catchError(this.httpService.handleError<[]>([]))
    // );
  }

  getFamilies(): Observable<any> {
    return this.http.get(this.API_BASE_URL + this.url).pipe(catchError(this.httpService.handleError<[]>([])));
  }

}
