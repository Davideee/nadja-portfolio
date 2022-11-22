import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const background: AnimationTriggerMetadata = trigger('background', [
  state(
    'bright',
    style({ background: 'rgb(238, 238, 233)', color: 'rgb(48, 48, 48)' })
  ),
  state(
    'dark',
    style({ background: 'rgb(48, 48, 48)', color: 'rgb(238, 238, 233)' })
  ),
  transition('bright => dark', [animate('0.5s')]),
  transition('dark => bright', [animate('0.5s')]),
]);
