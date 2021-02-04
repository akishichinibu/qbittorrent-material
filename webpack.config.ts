import * as path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const QB_HOST = "http://localhost:55555";

const DEV_SERVER_HOST = "localhost";
const DEV_SERVER_PORT = 54321;

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
