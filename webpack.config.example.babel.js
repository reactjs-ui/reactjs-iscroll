import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';

const ip = 'localhost';
const port = 9090;
const hotDevServer = 'webpack/hot/dev-server';
// https://github.com/webpack/webpack-dev-server
const webpackDevServer = `webpack-dev-server/client?http://${ip}:${port}`;

const appPath = path.resolve(__dirname, 'examples');

let webpackConfig = {
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: '.eslintrc'
  },
  cache: true,
  debug: true,
  devtool: 'source-map', //生成 source map文件
  stats: {
    colors: true,
    reasons: true
  },
  devServer: {
    contentBase: './examples',
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    quiet: false, // 设为true，不把任何信息输出到控制台
    publicPath: '/'
  },

  resolve: {
    root: [appPath], // 设置要加载模块根路径，该路径必须是绝对路径
    //自动扩展文件后缀名
    extensions: ['', '.js', '.jsx', '.css']
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: ['./examples/index.js', webpackDevServer, hotDevServer],
    simple: ['./examples/simple.js', webpackDevServer, hotDevServer],
    paging: ['./examples/paging.js', webpackDevServer, hotDevServer],
    pullOption: ['./examples/pullOption.js', webpackDevServer, hotDevServer],
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.resolve(__dirname, 'examples/dist'), //打包输出目录
    filename: '[name].[hash].bundle.js', //文件名称
    publicPath: './' //资源路径
  },

  module: {
    // https://github.com/MoOx/eslint-loader
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules.*/,
      loader: 'eslint'
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        exclude: /node_modules/,
        cacheDirectory: true // 开启缓存
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loader: 'url?limit=10000', // 10kb
        query: {
          mimetype: 'image/png'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(), //
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoErrorsPlugin() //
  ]
};

//创建 HtmlWebpackPlugin 的实例
// https://www.npmjs.com/package/html-webpack-plugin
const entry = webpackConfig.entry;

// 为 HtmlwebpackPlugin 设置配置项，与 entry 键对应，根据需要设置其参数值
const htmlwebpackPluginConfig = {
  index: {
    title: '例子列表'
  },
  simple: {
    title: '简单例子'
  },
  paging: {
    title: '分页加载与刷新'
  },
  pullOption: {
    title: '禁止向上或向下滑动'
  }
};

for (let key in entry) {
  if (entry.hasOwnProperty(key) && key !== 'vendors') {
    webpackConfig.plugins.push(
      new HtmlwebpackPlugin({
        title: htmlwebpackPluginConfig[key].title,
        template: path.resolve(appPath, 'templates/layout.html'),
        filename: `${key}.html`,
        //chunks这个参数告诉插件要引用entry里面的哪几个入口
        chunks: [key, 'vendors'],
        //要把script插入到标签里
        inject: 'body'
      })
    );
  }
}

export default {
  webpackConfig,
  ip,
  port
};
