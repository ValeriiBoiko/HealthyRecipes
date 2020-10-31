import { Colors, Font } from "./constants/Design";
export const commonStyles = {
  h1: {
    fontFamily: Font.bold,
    color: Colors.text,
    fontSize: 24,
    lineHeight: 30,
  },
  h2: {
    fontFamily: Font.bold,
    color: Colors.text,
    fontSize: 21,
    lineHeight: 30,
  },
  primaryText: {
    fontFamily: Font.regular,
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 20,
  },
  regularText: {
    fontFamily: Font.regular,
    color: Colors.text,
    fontSize: 14,
    lineHeight: 20,
  }
}