import { expect } from 'chai';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { By } from '@angular/platform-browser';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should invoke ngAfterViewInit', () => {
    fixture.detectChanges();
    spyOn(component, 'ngAfterViewInit');
    expect(component.ngAfterViewInit).to.exist;
    const input = fixture.debugElement.query(By.css('input'));
    const keyUp = new Event('keyup');
    input.nativeElement.dispatchEvent(keyUp);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input')).nativeElement.value).to.equal('');
  })
});
