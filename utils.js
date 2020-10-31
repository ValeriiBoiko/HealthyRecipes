import { Dimensions } from "react-native";

const dimensions = Dimensions.get('window');
const basicHeight = 812; //height of the device in design template
const basicWidth = 375; //width of the device in design template

const withRatio = dimensions.width / basicWidth;

function widthDependedPixel(pixel) {
  return withRatio * pixel;
}

export {
  widthDependedPixel as wp
}