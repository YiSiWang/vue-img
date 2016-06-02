# vue-img

eleme 图片加载插件，包含以下功能：

- 读取 CDN 地址
- 检测 webP 支持
- 转换图片 hash 为 url
- 设置图片与背景地址

> next 分支提供了支持 Vue 2 的版本。

## 使用方法

### 安装插件

#### NPM

```bash
npm install vue-img
```

#### CDN

```HTML
<script src="//github.elemecdn.com/banricho/vue-img/1.2.3/dist/vue-img.min.js"></script>
```

### 配置插件

```JS
Vue.use(VueImg, {
  loading: '',      // [String] 占位图片（可选）
  error: '',        // [String] 错误图片（可选）
  prefix: '',       // [String] 自定义前缀（可选）
  quality: 75       // [Number] 图片质量（可选）
});
```

### 使用指令

```bash
# 设置图片 src
v-img = hash            # 使用原始尺寸
v-img:40 = hash         # 指定宽度，等比缩放
v-img:50*40 = hash      # 指定宽高，cover 展示

# 设置容器 background-image
v-bgi = hash
v-bgi:40 = hash
v-bgi:50*40 = hash
```

### 高级用法

vue-img 在 1.2.0 版本中加入了指令修饰符 `now`，使用它将**立即**加载目标资源，忽略 `loading` 中配置的占位图。

```bash
v-img.now = hash            # 直接加载目标资源，未加载完成时为空
v-img:50*40.now = hash      # 注意：修饰符应当在尺寸参数之后
```

使用 `now` 配合三元运算符，可以在接口未返回数据时，指定默认图。

```HTML
<header v-bgi.now="banner ? banner : '515c2eed4398be26ff02c2178e58ddb0jpeg'"></header>
```

### 可读属性

vue-img 向外部提供了一些属性和方法，方便在其它场合使用。你应当视它们为只读属性，避免直接修改。

```bash
cdn          # [String]   当前的 CDN 前缀
canWebp      # [Boolean]  当前设备是否支持 webP
toPath       # [Function] 将 hash 转为 path
getSrc       # [Function] 获取图片完整地址
```

vue-img 在 1.2.1 版本中新增了 `getSrc` 方法，用于生成完整的图片地址。

```JS
const src = VueImg.getSrc({
  hash: '1fa68b8d589078c3d44e3ae3d7dac9fejpeg',  // [String]  图片 hash （必填）
  prefix: '',                                    // [String]  CDN 前缀 （可选，默认当前 CDN）
  size: '750*100',                               // [String]  尺寸参数 （可选，默认原尺寸）
  quality: 75,                                   // [Number]  图片质量 （可选，默认 75）
});
```

## 注意事项

- 本项目遵循 UMD 规范打包，全局变量为 `VueImg`
- 指令 `v-bgi` 仅会设置 `background-image` 属性，你可能还需要自行设置 `background-size` `background-repeat`
- [更多细节](https://github.com/banricho/vue-img/issues/3)

## 贡献代码

```bash
fork + clone
npm install
npm run dev
npm run build
```

欢迎提交 issue 和 pr

## 开源协议

MIT
