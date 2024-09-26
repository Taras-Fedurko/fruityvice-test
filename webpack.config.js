module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.fruityvice.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
