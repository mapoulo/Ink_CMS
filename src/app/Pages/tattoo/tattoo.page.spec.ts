import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TattooPage } from './tattoo.page';

describe('TattooPage', () => {
  let component: TattooPage;
  let fixture: ComponentFixture<TattooPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TattooPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TattooPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
