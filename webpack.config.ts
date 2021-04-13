// import os from "os";
import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

// var HappyPack = require('happypack');

const QB_HOST = "http://localhost:12121";

const DEV_SERVER_HOST = "localhost";
const DEV_SERVER_PORT = 8080;


// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })


const config: Configuration = {
  mode: "development",
  entry: path.join(process.cwd(), "src", "index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(path.join(process.cwd(), "dist")),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: [
      ["@src", ["src",]],
      ["@api", ["src", "api",]],
      ["@comp", ["src", "component",]],
    ].map(([name, ps]) => {
      return {
        alias: path.resolve(path.join(process.cwd(), ...ps)),
        name: name as string,
      }
    }),
  },
  module: {
    rules: [
      // {
      //   test: /\.(jsx?|tsx?)$/,
      //   // exclude: ['./node_modules'],
      //   use: ['babel-loader']
      // },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "public", "index.html"),
    }),
    // new HappyPack({
    //   id: 'babel',
    //   loaders: [
    //     {
    //       loader: 'babel-loader'
    //     }
    //   ],
    //   threadPool: happyThreadPool
    // }),
  ],
  devtool: 'source-map',
  devServer: {
    port: DEV_SERVER_PORT,
    proxy: {
      '/api': {
        target: QB_HOST,
        changeOrigin: true,
        logLevel: "debug",
        onProxyReq: function (req, res, proxyOptions) {
          req.setHeader("X-Forwarded-Host", `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`);
        }
      },
    }
  }
};


export default config;
