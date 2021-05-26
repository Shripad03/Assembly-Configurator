import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  families: any[] = [];

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
      this.families = data;
      this.groupLoading = false;
      console.log('families', this.families);
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
      this.families = this.families.filter(data => data.name.toLowerCase().includes(this.searchForm.value.searchTearm.toLowerCase()));
    } else {
      this.families = this.groupService.getGroups();
    }
  }


  onClickFamily(event: any, item: any) {
    console.log(event, item);


    if (event.selected) {
      event.source.selectionList.options.toArray().forEach((element: any) => {
        if (element.value.name != item.name) {
          element.selected = false;
        }
      });
    }

    this.onFamilyChange.emit(item)
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}
