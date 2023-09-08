import { trigger, transition, animate, style } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    animate('300ms ease-in-out', style({ left: '0' })),
  ]),
]);
