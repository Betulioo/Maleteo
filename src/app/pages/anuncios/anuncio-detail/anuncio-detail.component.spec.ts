import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioDetailComponent } from './anuncio-detail.component';

describe('AnuncioDetailComponent', () => {
  let component: AnuncioDetailComponent;
  let fixture: ComponentFixture<AnuncioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnuncioDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnuncioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
