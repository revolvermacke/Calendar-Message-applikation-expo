import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

export const StyledLinearGradient = cssInterop(LinearGradient, {
  className: 'style',
});
