import { PixelRatio, Platform } from "react-native";

export function getPixel(pixel: number){
  return Platform.select({
    ios: pixel,
    android: PixelRatio.getPixelSizeForLayoutSize(pixel)
  })
}