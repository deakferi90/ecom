import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsComponent } from './collections.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
