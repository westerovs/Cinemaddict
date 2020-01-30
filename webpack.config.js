const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`, // Режим сборки
  entry: `./src/main.js`, // Точка входа приложения
  output: {// Настройка точка выхода
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`, // подключаем sourcemaps
  devServer: {
    contentBase: path.join(__dirname, `public`), // Где искать сборку
    compress: true, // Сжатие
    watchContentBase: true, // автомат. перезагрузка страницы
  },
  plugins: [
    new MomentLocalesPlugin({// Оставляем только одну локаль
      localesToKeep: [`es-us`]
    })
  ]
};
