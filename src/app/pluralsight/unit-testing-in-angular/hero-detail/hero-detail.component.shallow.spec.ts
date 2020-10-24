import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HeroService } from '../services/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj<HeroService>([
      'getHero',
      'updateHero',
    ]);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    } as any;

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: 'Super Dude', strength: 100 })
    );
  });

  it('should render hero name in an h2 tag', () => {
    fixture.detectChanges(); //  Run lifecylcle events

    const htmlElement: HTMLElement = fixture.nativeElement;

    expect(htmlElement.querySelector('h2').textContent).toEqual(
      'SUPER DUDE Details'
    );
  });

  it('should call updateHero when save is clicked', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.componentInstance.save();

    //  tick(250); tick forward 250 ms
    flush(); //  Fast forward clock until all waiting tasks in zone have been executed

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
