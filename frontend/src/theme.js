export const Light ={
  body: "#fff",
  text: "#202020",
  bodyRgba: "255, 255, 255",
  textRgba: "32,32,32",
  carouselColor: "#EEEDDE",
  fontxs: "0.75em",
  fontsm: "0.875em",
  fontmd: "1em",
  fontlg: "1.25em",
  fontxl: "2em",
  fontxxl: "3em",
  fontxxxl: "4em",
  fontButton: "0.875em",
  navHeight: "5rem",
  whiteBg:"#7250FF",
  bg: "rgb(255,255,255)",
  bgAlpha: "rgba(250,250,250,.3)",
  bg2: "rgb(245,245,245)",
  bg3: "rgb(230,230,230)",
  text: "rgb(45,45,45)",
  primary: "rgb(52, 131, 235)",
  bg4:"#9247FC",
  bgtotal:"#EDF3FB",
  bgtgderecha:"#fff",
  barrascroll: "#a8a7a7",


  gray900: "#000000",
  gray800: "#1f1f1f",
  gray700: "#2e2e2e",
  gray600: "#313131",
  gray500: "#969593",
  gray400: "#a6a6a6",
  gray300: "#bdbbb7",
  gray200: "#f1f1f1",
  gray100: "#ffffff",

  green500: "#F9516E",
  olive500: "#e3ffa8",

  white: "#ffffff",

  textprimary: "#2a2828",
  textsecondary: "#f1f1f1",
  texttertiary: "#969593",
  //toggle
  lightbackground: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
lightcheckbox: "#fce100"
}
export const Dark = {
  bgtgderecha:"#21252B",
  body: "#202020",
  text: "#fff",
  bodyRgba: "32,32,32",
  textRgba: "255, 255, 255",
  carouselColor: "#EEEDDE",
  fontxs: "0.75em",
  fontsm: "0.875em",
  fontmd: "1em",
  fontlg: "1.25em",
  fontxl: "2em",
  fontxxl: "3em",
  fontxxxl: "4em",
  fontButton: "0.875em",
  navHeight: "5rem",
  whiteBg:"#7522e6s",
  bg: "rgb(15,15,15)",
  bgAlpha: "rgba(0,0,0,.3)",
  bg2: "rgb(30,30,30)",
  bg3: "rgb(50,50,50)",
  text: "rgb(210,210,210)",
  primary: "rgb(52, 131, 235)",
  bg4:"#9247FC",
  bgtotal:"#21252B",
  barrascroll: "#A18AFF",

  gray900: "#000000",
  gray800: "#1f1f1f",
  gray700: "#2e2e2e",
  gray600: "#313131",
  gray500: "#969593",
  gray400: "#a6a6a6",
  gray300: "#bdbbb7",
  gray200: "#f1f1f1",
  gray100: "#ffffff",

  green500: "#F9516E",
  olive500: "#e3ffa8",

  white: "#ffffff",

  textprimary: "#ffffff",
  textsecondary: "#f1f1f1",
  texttertiary: "#969593",
  //toggle
  darkbackground:"linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898", 
  darkcheckbox: "#757575"
}


// import { createContext, useState, useMemo } from "react";
// import { createTheme } from "@mui/material/styles";

// // color design tokens export
// export const tokens = (mode) => ({
//   ...(mode === "dark"
//     ? {
//         grey: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#525252",
//           700: "#3d3d3d",
//           800: "#292929",
//           900: "#141414",
//         },
//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#1F2A40",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },
//         greenAccent: {
//           100: "#dbf5ee",
//           200: "#b7ebde",
//           300: "#94e2cd",
//           400: "#70d8bd",
//           500: "#4cceac",
//           600: "#3da58a",
//           700: "#2e7c67",
//           800: "#1e5245",
//           900: "#0f2922",
//         },
//         redAccent: {
//           100: "#f8dcdb",
//           200: "#f1b9b7",
//           300: "#e99592",
//           400: "#e2726e",
//           500: "#db4f4a",
//           600: "#af3f3b",
//           700: "#832f2c",
//           800: "#58201e",
//           900: "#2c100f",
//         },
//         blueAccent: {
//           100: "#e1e2fe",
//           200: "#c3c6fd",
//           300: "#a4a9fc",
//           400: "#868dfb",
//           500: "#6870fa",
//           600: "#535ac8",
//           700: "#3e4396",
//           800: "#2a2d64",
//           900: "#151632",
//         },
//       }
//     : {
//         grey: {
//           100: "#141414",
//           200: "#292929",
//           300: "#3d3d3d",
//           400: "#525252",
//           500: "#666666",
//           600: "#858585",
//           700: "#a3a3a3",
//           800: "#c2c2c2",
//           900: "#e0e0e0",
//         },
//         primary: {
//           100: "#040509",
//           200: "#080b12",
//           300: "#0c101b",
//           400: "#f2f0f0", // manually changed
//           500: "#141b2d",
//           600: "#1F2A40",
//           700: "#727681",
//           800: "#a1a4ab",
//           900: "#d0d1d5",
//         },
//         greenAccent: {
//           100: "#0f2922",
//           200: "#1e5245",
//           300: "#2e7c67",
//           400: "#3da58a",
//           500: "#4cceac",
//           600: "#70d8bd",
//           700: "#94e2cd",
//           800: "#b7ebde",
//           900: "#dbf5ee",
//         },
//         redAccent: {
//           100: "#2c100f",
//           200: "#58201e",
//           300: "#832f2c",
//           400: "#af3f3b",
//           500: "#db4f4a",
//           600: "#e2726e",
//           700: "#e99592",
//           800: "#f1b9b7",
//           900: "#f8dcdb",
//         },
//         blueAccent: {
//           100: "#151632",
//           200: "#2a2d64",
//           300: "#3e4396",
//           400: "#535ac8",
//           500: "#6870fa",
//           600: "#868dfb",
//           700: "#a4a9fc",
//           800: "#c3c6fd",
//           900: "#e1e2fe",
//         },
//       }),
// });

// // mui theme settings
// export const themeSettings = (mode) => {
//   const colors = tokens(mode);
//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             // palette values for dark mode
//             primary: {
//               main: colors.primary[500],
//             },
//             secondary: {
//               main: colors.greenAccent[500],
//             },
//             neutral: {
//               dark: colors.grey[700],
//               main: colors.grey[500],
//               light: colors.grey[100],
//             },
//             background: {
//               default: colors.primary[500],
//             },
//           }
//         : {
//             // palette values for light mode
//             primary: {
//               main: colors.primary[100],
//             },
//             secondary: {
//               main: colors.greenAccent[500],
//             },
//             neutral: {
//               dark: colors.grey[700],
//               main: colors.grey[500],
//               light: colors.grey[100],
//             },
//             background: {
//               default: "#fcfcfc",
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };

// // context for color mode
// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// });

// export const useMode = () => {
//   const [mode, setMode] = useState("dark");

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () =>
//         setMode((prev) => (prev === "light" ? "dark" : "light")),
//     }),
//     []
//   );

//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   return [theme, colorMode];
// };