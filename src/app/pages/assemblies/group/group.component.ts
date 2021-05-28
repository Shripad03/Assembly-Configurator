import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material/list';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CATEGORIES_PATH } from 'src/app/constants';
import { GroupService } from 'src/app/services/group.service';
import { markFormGroupTouched } from 'src/app/utils';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit, OnDestroy {

  @Output() onFamilyChange = new EventEmitter();

  searchForm: FormGroup;
  componentDestroyed = new Subject();
  groupLoading = false;

  familiesOriginalData: any = [];
  familiesData: any[] = [];

  selected = 0;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private router: Router) {
    this.searchForm = this.fb.group({
      searchTearm: '',
    });
  }


  ngOnInit(): void {
    this.getGroups();
    this.searchForm.controls['searchTearm'].valueChanges.subscribe(() => this.filterGroup());

    // this.groups.selectionChange.subscribe((s: MatSelectionListChange) => {
    //   this.groups.deselectAll();
    //   s.option.selected = true;
    // });
  }
  getGroups() {
    this.groupLoading = true;
    //   this.groupService
    //   .getGroups()
    //   .pipe(takeUntil(this.componentDestroyed))
    //   .subscribe((data) => {
    //     this.groupLoading = false;
    //     console.log('this.groupService.getGroups', res);
    //   });

    this.groupService.getFamilies().subscribe(data => {
      this.familiesOriginalData = data;
      this.groupLoading = false;
      const length = data.length;
      this.familiesData = [...this.familiesOriginalData];
      this.familiesData.push({ id: (length + 1), name: "Custom Assemblies" })
    })
  }


  navigateTo(): void {
    this.router.navigateByUrl(CATEGORIES_PATH);
  }

  createSubjects(): FormGroup {
    return this.fb.group({
      searchTearm: new FormControl(''),
    });
  }

  onSubmit(evt: any) {
    markFormGroupTouched(this.searchForm);
    console.log('onsubmit', this.searchForm.value);
  }


  filterGroup() {
    if (this.searchForm.value.searchTearm) {
      this.familiesData = this.familiesData.filter(data => data.name.toLowerCase().includes(this.searchForm.value.searchTearm.toLowerCase()));
    } else {
      this.familiesData = this.familiesOriginalData;
    }
  }


  onClickFamily(event: any, index: any, item: any) {
    console.log(event, index, item);

    this.selected = event.checked ? index : -1;
    this.onFamilyChange.emit(item)
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}
