import {Platform} from 'react-native';

export const COLOR = {
  PRIMARY: '#2195CD',
  SECONDARY: '#2390A8',
  // SECONDARY: '#3FA3D4',
  WHITE: '#ffffff',
  BLACK: '#000000',
  GREEN: '#43A047',
  AMBER: '#FFB300',
  BLUE: '#4f92ca',
  RED: '#D9435E',
  GRAY: '#A39D9D',
};
// #3B5998
export const COLOR_GRAY = {
  DARKEST: '#263238',
  DARK: '#455A64',
  NORMAL: '#607D8B',
  NORMAL2: '#8D92A3',
  LIGHT: '#B0BEC5',
  LIGHTEST: '#FAFAFC',
  // LIGHTEST: '#ECEFF1',
  // #8D92A3
};
export const FONT = {
  PRIMARY: Platform.OS === 'ios' ? 'Poppins' : 'Poppins-Medium',
  BOLD: 'Poppins-SemiBold',
  ITALIC: 'Poppins-Italic',
  BOLDITALIC: 'Poppins-SemiBoldItalic',
};
