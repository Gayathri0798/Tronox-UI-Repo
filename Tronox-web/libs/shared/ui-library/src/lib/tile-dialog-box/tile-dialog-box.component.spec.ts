import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TileDialogBoxComponent } from './tile-dialog-box.component';

describe('TileDialogBoxComponent', () => {
  let component: TileDialogBoxComponent;
  let fixture: ComponentFixture<TileDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileDialogBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
