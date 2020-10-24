import { Component } from '@angular/core';

@Component({
  selector: 'sample-tests-trigger-events',
  template: `
    <h1 (click)="onClick()">
      {{ emoji }}
    </h1>
  `,
})
export class TriggerEventsComponent {
  emoji: string;

  onClick() {
    this.emoji = '😜';
  }
}
