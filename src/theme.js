import { base, swiss } from '@theme-ui/presets';
import { merge } from 'theme-ui';

export default merge(base, merge(swiss, {
  sizes: { container: 900 },
  buttons: { primary: { cursor: 'pointer' }, secondary: { backgroundColor: 'secondary', cursor: 'pointer' }, reset: { backgroundColor: 'gray', cursor: 'pointer'} },
}));
