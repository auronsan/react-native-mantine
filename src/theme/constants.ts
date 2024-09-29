import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const bottomNavBarHeight = deviceHeight - height;

export const Layout = {
  window: {
    width,
    height,
  },
  screen: {
    width: deviceWidth,
    height: deviceHeight,
  },
  bottomNavBarHeight: bottomNavBarHeight ? bottomNavBarHeight : 0,
  isSmallDevice: width <= 375,
};
