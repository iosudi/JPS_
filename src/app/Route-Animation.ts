import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('* => home', slideTo('left')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [
          animate(
            '1000ms ease',
            style({
              [direction]: '100%',
            })
          ),
        ],
        optional
      ),
      query(
        ':enter',
        [
          animate(
            '1000ms ease',
            style({
              [direction]: '0%',
            })
          ),
        ],
        optional
      ),
    ]),
  ];
}
