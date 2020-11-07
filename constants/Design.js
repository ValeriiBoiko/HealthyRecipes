export const LightTheme = {
  dark: false,
  colors: {
    background: '#f2f1f6',
    backgroundWithOpacity: (opacity) => `rgba(242,241,246,${opacity})`,
    primary: '#057e0d',
    secondary: '#9f9f9f',
    text: '#1b1717',
    card: '#fff',
    cardWithOpacity: (opacity) => `rgba(255,255,255,${opacity})`,
    border: '#dcdcdc',
    accent: '#e8b039',
    error: '#ef5350',
  }
};

export const DarkTheme = {
  dark: true,
  colors: {
    background: '#000',
    backgroundWithOpacity: (opacity) => `rgba(0,0,0,${opacity})`,
    primary: '#057e0d',
    secondary: '#7c7c7c',
    text: '#d9d9d9',
    card: '#1f1f1f',
    cardWithOpacity: (opacity) => `rgba(31,31,31,${opacity})`,
    border: '#3c3c3e',
    accent: '#e8b039',
    error: '#ef5350',
  }
};

export const Font = {
  regular: 'Nunito-Regular',
  semiBold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold',
};
