import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import demodata from './assemblies.json';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AssemblyService {

  private API_BASE_URL = environment.API_BASE_URL;


  private assembliesList = new BehaviorSubject([]);
  assembliesList$ = this.assembliesList.asObservable();

  constructor(private httpService: HttpService,
    private http: HttpClient) { }

  getAssemblies(familyId: any) {
    // this.assembliesList.next(demodata);
    // return demodata;

    // return this.httpService.get(this.url).subscribe((res => {
    //   this.assembliesList = res;
    // })

    const url = 'Assemblies?familyId=' + familyId + '&hideDefault=false&showCustom=false&pageIndex=0&pageSize=0';
    return this.http.get(this.API_BASE_URL + url);
  }


  getImages(familyId: any) {
    const url = 'Assemblies/Images?companyId=' + familyId + '&familyId=' + familyId + '&hideDefault=false&showCustom=false&pageIndex=0&pageSize=0';
    return this.http.get(this.API_BASE_URL + url);
  }

}