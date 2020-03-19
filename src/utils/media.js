import { css } from "styled-components";

const sizes = {
  desktop: 1024,
  tablet: 769,
  phone: 415,
  android: 359
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const mediaType = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = window.matchMedia(`(max-width: ${sizes[label]}px)`).matches;
  return acc;
}, {});
