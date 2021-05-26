import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssemblyService } from 'src/app/services/assembly.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  componentDestroy = new Subject();

  constructor(private assemlyService: AssemblyService) {}

  ngOnInit(): void {
    this.assemlyService.assembliesList$
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((res) => {
        console.log('behaviuor-response', res);
      });
  }
  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }
}
