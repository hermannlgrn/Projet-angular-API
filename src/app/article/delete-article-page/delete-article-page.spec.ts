import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteArticlePage} from './delete-article-page';

describe('DeleteArticlePage', () => {
  let component: DeleteArticlePage;
  let fixture: ComponentFixture<DeleteArticlePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteArticlePage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
