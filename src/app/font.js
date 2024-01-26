import { Montserrat } from "next/font/google";
import { Poppins } from "next/font/google";
import { Roboto } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Merriweather } from "next/font/google";
import { Josefin_Sans } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["vietnamese"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});


export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});


export const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});


export const playfair_display = Playfair_Display({
  subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const merriweather = Merriweather({
  subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});


export const josefin_sans = Josefin_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});
