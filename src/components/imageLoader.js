// const importAll = (r) => {
//   let images = {};
//   r.keys().map((item, index) => {
//     images[item.replace('./', '')] = r(item);
//   });
//   return images;
// };

// const ImageLoader = ({ imageName }) => {
//   const images = importAll(
//     require.context('../imgs/ false, /\.(png|jpe?g|svg)$/)
//   );
//   const image = images[imageName];

//   return <img src={image} alt={imageName} />;
// };

// export default ImageLoader;
