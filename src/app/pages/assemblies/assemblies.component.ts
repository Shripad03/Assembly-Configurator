import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CATEGORIES_PATH } from 'src/app/constants';
import { AssemblyService } from 'src/app/services/assembly.service';
import { markFormGroupTouched } from 'src/app/utils';
@Component({
  selector: 'app-assemblies',
  templateUrl: './assemblies.component.html',
  styleUrls: ['./assemblies.component.scss'],
})

export class AssembliesComponent implements OnInit, OnDestroy {
  assembilySearchForm: FormGroup;
  componentDestroyed = new Subject();
  assemblyLoading = false;
  checkedHideDefault = false;
  searchString = '';
  assembliesData: any[] = [];
  assembliesOriginalData: any = [];


  imageSrc: any;
  ImagesData: any[] = [];
  ImagesOriginalData: any = [];

  families: any[] = [];


  constructor(
    private fb: FormBuilder,
    private assemlyService: AssemblyService,
    private router: Router) {
    this.assembilySearchForm = this.fb.group({
      searchTearm: '',
    });
  }

  ngOnInit(): void {
    this.getAssemblies(1);
  }
  getAssemblies(familyId: any) {
    this.assemblyLoading = true;
    this.assemlyService.getAssemblies(familyId).subscribe(res => {
      this.assembliesOriginalData = res;
      this.assemblyLoading = false;
      this.assembliesData = [...this.assembliesOriginalData];
      console.log('assembliesData', this.assembliesData);
      this.getImages(familyId);
    })

    // this.assemlyService
    //   .getAssemblies()
    //   .pipe(takeUntil(this.componentDestroyed))
    //   .subscribe((res) => {
    //     this.assemblyLoading = false;
    //     console.log('this.assemlyService.getAssemblies', res);
    //   });
  }

  getImages(familyId: any) {
    this.assemlyService.getImages(familyId).subscribe((res: any) => {
      this.ImagesOriginalData = res;
      this.ImagesData = [...this.ImagesOriginalData];
      this.imageSrc = 'data:image/jpeg;base64,' + res[0].icon;
      console.log('ImagesData', this.ImagesData);
    })
  }

  createSubjects(): FormGroup {
    return this.fb.group({
      searchTearm: new FormControl(''),
    });
  }

  onSubmit(evt: any) {
    markFormGroupTouched(this.assembilySearchForm);
    console.log('onsubmit', this.assembilySearchForm.value);
  }

  navigateTo(): void {
    this.router.navigateByUrl(CATEGORIES_PATH);
  }

  processFiter() {
    if (this.searchString && this.checkedHideDefault) {
      const tmpData = this.assembliesOriginalData.filter((i: any) => i.name.toLowerCase().includes(this.searchString.toLowerCase()) && !i.default);
      this.assembliesData = tmpData;
    } else if (this.checkedHideDefault) {
      const tmpData = this.assembliesOriginalData.filter((i: any) => !i.default);
      this.assembliesData = tmpData;
    } else if (this.searchString) {
      const tmpData = this.assembliesOriginalData.filter((i: any) => i.name.toLowerCase().includes(this.searchString.toLowerCase()));
      this.assembliesData = tmpData;
    } else {
      this.assembliesData = this.assembliesOriginalData;
    }
  }

  onNativeChange(e: any): void {
    this.checkedHideDefault = e.checked;
    this.processFiter();
  }

  onNativeSearch(evt: any): void {
    this.searchString = evt.target.value;
    this.processFiter();
  }



  onFamilyChange(item: any) {
    this.getAssemblies(item.id);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
