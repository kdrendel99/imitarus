import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
.my-masonry-grid {
  display: -webkit-box; /* Not needed if autoprefixing */
  display: -ms-flexbox; /* Not needed if autoprefixing */
  display: flex;
  margin-left: -15px; /* gutter size offset */
  width: auto;
}
.my-masonry-grid_column {
  padding-left: 15px; /* gutter size */
  background-clip: padding-box;
}

/* Style your items */
.my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
  // background: grey;
  margin-bottom: 15px;
}
`;

export default GlobalStyle;