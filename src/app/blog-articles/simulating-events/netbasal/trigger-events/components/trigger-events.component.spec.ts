import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TriggerEventsComponent } from './trigger-events.component';

describe('TriggerEventsComponent', () => {
  it('should set 😜 on click', () => {
    const fixture = TestBed.createComponent(TriggerEventsComponent);
    fixture.detectChanges();

    const h1 = fixture.debugElement.query(By.css('h1'));
    h1.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('h1')).nativeElement.innerText
    ).toEqual('😜');
  });
});
