# webpack-website-typescript

## 使用文档

 - [http://webpack-website.liqingsong.cc](http://webpack-website.liqingsong.cc/)
 - [Github](https://github.com/lqsong/webpack-website) 
 - [Gitee](https://gitee.com/lqsong/webpack-website)


## 实战案例

 - lqsblog-frontend-foreground-template（[Github](https://github.com/lqsong/lqsblog-frontend-foreground-template) 、 [Gitee](https://gitee.com/lqsong/lqsblog-frontend-foreground-template)）


## 目录结构

```bash
├── dist                       # 生产项目目录
├── mock                       # Mock文件目录
├── public                     # 静态资源目录,此目录下内容会直接复制到生产目录
├── src                        # 源代码
│   ├── assets                 # 静态资源
│   │   ├── css                # 项目公用 CSS 样式
│   │   └── img                # 项目图片目录
│   ├── config                 # 配置
│   │   │── webpack.common.js  # webpack 公共配置
│   │   │── webpack.dev.js     # webpack 开发配置
│   │   └── webpack.prod.js    # webpack 生产配置
│   ├── modules                # 全局 模块目录
│   └── pages                  # 页面目录(所有页面放在这里)
│       └── contact            # 页面-联系(这里作为说明样例)
│           ├── modules        # 当前页面 模块目录(可选)
│           ├── data.d.ts      # 当前页面 TS 类型定义文件(可选)
│           ├── main.html      # 当前页面html入口(必须)
│           ├── main.ts        # 当前页面ts入口(必须)
│           └── main.scss      # 当前页面css文件(可选)
├── .babelrc                   # babel配置
├── .env.development           # 开发环境变量配置
├── .env.production            # 生产环境变量配置
├── .eslintignore              # eslint 忽略文件配置
├── .eslintrc.js               # eslint 配置项
├── .gitignore                 # Git忽略文件配置
├── package.json               # 项目信息
├── postcss.config.js          # postcss 配置
├── README.md                  # readme
├── tsconfig.json              # typescript 配置
└── typings.d.ts               # 全局 TS 类型定义文件
```


## 自定义配置

### **(建议)** 本地或开发模式下，不要直接修改 '.env.development'
复制 '.env.development' 重命名为 ' .env.development.local' , 修改对应的参数.

### **(建议)** 生产模式下，不要直接修改 '.env.production'
复制 '.env.production' 重命名为 ' .env.production.local' , 修改对应的参数.


## 项目设置

### 一、Install dependencies,

```bash
$ yarn
```

or

```
$ npm install
```

> 推荐使用 yarn , **[yarn安装与常用命令](http://liqingsong.cc/article/detail/9)** 。

### 二、Compiles and hot-reloads for development

```bash
$ yarn serve
```

or

```
$ npm run serve
```


### 三、Compiles and minifies for production

```bash
$ yarn build
```
or

```
$ npm run build
```


## 捐赠

如果你觉得这个项目帮助到了你，请帮助点击 Star，你也可以请作者喝咖啡表示鼓励.

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](https://gitee.com/lqsong/public/raw/master/common/Alipay.png)  |  ![Wechat](https://gitee.com/lqsong/public/raw/master/common/Wechat.png)

