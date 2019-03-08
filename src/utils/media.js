import { css } from 'styled-components';

const sizes = {
  desktop: 1024,
  tablet: 769,
  phone: 415,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
