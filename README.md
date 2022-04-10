# Code Plus

CodePlus 是一个用于快速保存算法刷题记录到 Notion 笔记的 Chrome 浏览器插件，目前支持以下部分平台（括号内为插件将会激活的链接，不匹配的链接点击无响应）：

- [x] AcWing (https://www.acwing.com/problem/content/1/)
- [x] LeetCode CN (https://leetcode-cn.com/problems/two-sum/)
- [ ] Codeforces
- [ ] CCF cspro
- [ ] Luogu

## 使用说明

### 下载并安装插件

- 方法一：从 release 下载
- 方法二：自行编译

下载 zip 文件后请解压。在浏览器插件管理页面打开开发者模式，选择加载已解压的插件目录即可。

### 创建 Notion 集成

1. 创建一个数据库页面，需要有如下 properties（名称必须分毫不差，括号内的是属性的类型）：

- `Link` (url)
- `From` (select)
- `Title` (title, 由默认的 Name 改名而来)
- `Date` (date)
- `Status` (select)
- `Difficulty` (select)
- `Tags` (multi-select)

  如下：

  <img src="assets//properties.png" alt="properties" style="width:200px;" />

2. 参考 [Notion 官方说明](https://developers.notion.com/docs/getting-started#getting-started) 完成 step 1 ~ step 2 的步骤，记好你的 database id，并且授权给你自己创建的 integration.

### 配置插件

安装后会弹出设置页面，填写上一步获取到的 secret 和 database_id.

注意：如果选择在创建的页面中包含题目描述，则描述中暂不支持：

- 数学公式（会加上 `$` 或者 `$$` 符号）
- 图片（会变成 url. 由于 Notion 不支持插入外链图片，你需要自己手动操作）

### 使用方法

点击工具栏上的插件图标即可，会弹出一个预览页面，向你展示解析好的 json：

![preview](assets//preview.png)

如果有误你可以手动在文本框内修改。

在设置好 Status 后，点击 save to notion 按钮即可。

没有反应的话说明不支持当前页面。

创建的页面效果如下：

<img src="assets//notion-page.png" alt="notion-page.png" style="width: 500px;" />

## 开发

### 手动编译

首先克隆仓库，由于含有子仓库，你需要添加 `--recursive` 选项。

```
git clone https://github.com/moeakwak/code-plus.git --recursive
```

编译：

```
cd lib/martian
npm install
cd ../..
npm install
npm run build
```

注意到必须先在 `lib/martian` 中安装依赖，否则编译时会出错。

For more details, see [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)'s description.
