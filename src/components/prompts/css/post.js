body {
  line-height: 1.7;
  color: #777;
  font-weight: 300;
  font-size: 1rem;
  background: #000; }

::-moz-selection {
  background: #000;
  color: #fff; }

::selection {
  background: #000;
  color: #fff; }

a {
  -webkit-transition: .3s all ease;
  -o-transition: .3s all ease;
  transition: .3s all ease; }
  a:hover {
    text-decoration: none; }

.text-black {
  color: #000 !important; }

.bg-black {
  background: #000 !important; }

.btn-outline-white {
  border-color: #fff;
  color: #fff;
  border-width: 2px;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: .1em; }
  .btn-outline-white:hover {
    background: #fff;
    color: #000; }

.image-wrap-2 {
  display: block;
  overflow: hidden;
  top: 0;
  left: 0;
  margin-bottom: 30px; }

  .image-wrap-2 img {
    /* filter: url(filters.svg#grayscale); Firefox 3.5+ */
    filter: gray;
    /* IE5+ */
    -webkit-filter: grayscale(1);
    /* Webkit Nightlies & Chrome Canary */
    -webkit-transition: all .1s ease-in-out; }
  .image-wrap-2:hover img {
    filter: none;
    -webkit-filter: grayscale(0);
    -webkit-transform: scale(1.01); }
  .image-wrap-2 .image-info {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); }
    .image-wrap-2 .image-info h2 {
      color: #fff; }
  .image-wrap-2:hover:before {
    background: rgba(0, 0, 0, 0.4);
    content: ""; }



#lightgallery .item {
  margin-bottom: 30px; }
  #lightgallery .item img {
    /* filter: url(filters.svg#grayscale); Firefox 3.5+ */
    filter: gray;
    /* IE5+ */
    -webkit-filter: grayscale(1);
    /* Webkit Nightlies & Chrome Canary */
    -webkit-transition: all .1s ease-in-out; }
  #lightgallery .item:hover img {
    filter: none;
    -webkit-filter: grayscale(0);
    -webkit-transform: scale(1.01); }

img {
  /* filter: url(filters.svg#grayscale); Firefox 3.5+ */
  filter: gray;
  /* IE5+ */
  -webkit-filter: grayscale(1);
  /* Webkit Nightlies & Chrome Canary */
  -webkit-transition: all .1s ease-in-out; }
  img:hover {
    filter: none;
    -webkit-filter: grayscale(0);
    -webkit-transform: scale(1.01); }