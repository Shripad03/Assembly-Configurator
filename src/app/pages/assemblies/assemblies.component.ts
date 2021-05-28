import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CATEGORIES_PATH } from 'src/app/constants';
import { AssemblyService } from 'src/app/services/assembly.service';
import { markFormGroupTouched } from 'src/app/utils';
import value from '*.json';
import { queryParam } from 'src/app/services/queryParam.service';
@Component({
  selector: 'app-assemblies',
  templateUrl: './assemblies.component.html',
  styleUrls: ['./assemblies.component.scss'],
})

export class AssembliesComponent implements OnInit, OnDestroy {
  assembilySearchForm: FormGroup;
  componentDestroyed = new Subject();
  assemblyLoading = false;
  // checkedHideDefault = false;

  params = {};


  searchString = '';
  familyId: any = 1;
  companyId: any = 1;

  assembliesData: any[] = [];
  assembliesOriginalData: any = [];

  defaultAssemblies = false;
  customAssemblies = false;


  imageSrc: any;
  ImagesData: any[] = [];
  ImagesOriginalData: any = [];

  finalAssembliesData: any = [];

  families: any[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private queryParamService: queryParam,
    private assemlyService: AssemblyService,
    private router: Router) {
    this.assembilySearchForm = this.fb.group({
      searchTerm: '',
    });
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.queryParamService.companyId = params.companyId;
        this.queryParamService.userId = params.userId;
        this.queryParamService.roleId = params.roleId;
        this.queryParamService.projectId = params.projectId;

        this.companyId = this.queryParamService.companyId;
      })

    this.getAssemblies(this.companyId, 1, this.defaultAssemblies, this.customAssemblies);
    this.assembilySearchForm.controls['searchTerm'].valueChanges.subscribe(() => this.filterGroup());

  }
  getAssemblies(companyId: number, familyId: number, defaultAssemblies: boolean, customAssemblies: boolean) {
    this.assemblyLoading = true;
    this.assemlyService.getAssemblies(companyId, familyId, defaultAssemblies, customAssemblies).subscribe(res => {
      this.assembliesOriginalData = res;
      this.assemblyLoading = false;
      this.assembliesData = [...this.assembliesOriginalData];
      this.getImages(companyId, familyId, defaultAssemblies, customAssemblies);
    })

    // this.assemlyService
    //   .getAssemblies()
    //   .pipe(takeUntil(this.componentDestroyed))
    //   .subscribe((res) => {
    //     this.assemblyLoading = false;
    //     console.log('this.assemlyService.getAssemblies', res);
    //   });
  }

  getImages(companyId: number, familyId: number, defaultAssemblies: boolean, customAssemblies: boolean) {
    this.assemlyService.getImages(companyId, familyId, defaultAssemblies, customAssemblies).subscribe((res: any) => {
      this.ImagesOriginalData = res;
      this.ImagesData = [...this.ImagesOriginalData];

      const tempData = this.ImagesData.filter(e => e.icon !== undefined)
      tempData.map(e => (e.icon) = 'data:image/jpeg;base64,' + e.icon)

      this.finalAssembliesData = this.assembliesData.map((item, i) => Object.assign({}, item, tempData[i]));

    })
  }

  createSubjects(): FormGroup {
    return this.fb.group({
      searchTerm: new FormControl(''),
    });
  }

  onSubmit(evt: any) {
    markFormGroupTouched(this.assembilySearchForm);
    console.log('onsubmit', this.assembilySearchForm.value);
  }

  navigateTo(): void {
    this.router.navigateByUrl(CATEGORIES_PATH);
  }

  // processFiter() {
  //   if (this.assembilySearchForm.value.searchTerm && this.checkedHideDefault) {
  //     const tmpData = this.assembliesOriginalData.filter((i: any) => i.name.toLowerCase().includes((this.assembilySearchForm.value.searchTerm).toLowerCase()) && !i.default);
  //     this.assembliesData = tmpData;
  //   } else if (this.checkedHideDefault) {
  //     const tmpData = this.assembliesOriginalData.filter((i: any) => !i.default);
  //     this.assembliesData = tmpData;
  //   } else if (this.assembilySearchForm.value.searchTerm) {
  //     const tmpData = this.assembliesOriginalData.filter((i: any) => i.name.toLowerCase().includes((this.assembilySearchForm.value.searchTerm).toLowerCase()));
  //     this.assembliesData = tmpData;
  //   } else {
  //     this.assembliesData = this.assembliesOriginalData;
  //   }
  // }




  filterGroup() {
    console.log(this.assembilySearchForm.value.searchTerm, 'filter string');

    if (this.assembilySearchForm.value.searchTerm) {
      this.assembliesData = this.assembliesData.filter(data => data.name.toLowerCase().includes((this.assembilySearchForm.value.searchTerm).toLowerCase()));
    } else {
      this.assembliesData = this.assembliesOriginalData
    }
  }

  onNativeChange(e: any): void {

    this.defaultAssemblies = e.checked;

    // console.log(this.checkedHideDefault);

    this.getAssemblies(this.companyId, this.familyId, this.defaultAssemblies, this.customAssemblies);

    // this.processFiter();
  }

  onNativeSearch(evt: any): void {

    this.searchString = evt.target.value;
    console.log(this.searchString);
    // this.processFiter();

  }

  onFamilyChange(item: any) {

    if (item.name === "Custom Assemblies") {
      this.customAssemblies = true;
    }
    else {
      this.familyId = item.id;
      this.customAssemblies = false;

      // if (this.checkedHideDefault == true) {
      //   this.companyId = null;
      // }
      // else {
      //   this.companyId = this.familyId;
      // }
    }

    this.params = { companyId: this.companyId }

    this.getAssemblies(this.companyId, this.familyId, this.defaultAssemblies, this.customAssemblies);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
