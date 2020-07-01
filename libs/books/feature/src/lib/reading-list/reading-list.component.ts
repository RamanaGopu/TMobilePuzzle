import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getReadingList, addToReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy{
  ngUnsubscribe: Subject<any> = new Subject<any>();
  readingList$ = this.store.select(getReadingList);
  constructor(private readonly store: Store, private readonly snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackBar.open('Removed', 'Undo', {
      duration: 5000,
    });
    snackBarRef.onAction().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.store.dispatch(addToReadingList({ book: item }));
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }
}
