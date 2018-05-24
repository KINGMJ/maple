# maple
![maple宣传文案.jpg-283.6kB][1]

>基于 [Medium](https://medium.com/) design 的一个 [Ghost](https://ghost.org/) 主题

[![][2]](https://ghost.org/) [![][3]](https://mit-license.org/)

Maple 主题简单美观，基于 Medium Design 现代化设计，采用响应式布局，能很好地适配不同的设备。对于文章页面，支持 TOC 文章目录和代码高亮、复制，对技术工作者比较友好。

## 📝 TOC 目录

- [特性](#️-特性)
- [安装](#️-安装)
    - [使用 Git](#使用-git)
    - [直接下载](#直接下载)
- [配置](#️-配置)
    - [标签云页面](#标签云页面)
    - [友链及社会化-icon-配置](#友链及社会化-icon-配置)
    - [主页封面配置](#主页封面配置)
    - [copyright 信息设置](#copyright-信息设置)
    - [google 分析设置](#google-分析设置)
    - [每页显示文章设置](#每页显示文章设置)
- [Roadmap](#️-roadmap)
- [Copyright & License](#️-copyright--license)

## 🏷️ 特性

- Medium Design ，专注于内容
- 响应式布局
- 代码高亮，文章目录支持
- 标签云页面
- 关于我页面个性化设计
- 个性化配置
- 自定义社会化 icon
- Markdown 样式重新设计
![image_1ce828agq1gra23ji9d1gd8105u15.png-1325.4kB][4]

## ⚙️ 安装

### 使用 Git
1. 进入到你的主题文件夹目录`ghost/content/themes`
2. 使用下面的命令克隆主题仓库
    ```
    $ git clone https://github.com/KINGMJ/maple.git
    
    ```
3. 重启 Ghost 并进入后台管理系统
4. 进入`Design`页面，选择`maple`主题，点击`ACTIVE`

![Image [2].png-10.5kB][5]

### 直接下载
1. 进入 [Releases][6] 页面，选择最新的版本，下载`zip`文件
![image_1ce6jo1ndma73bl1nmlht71c8f9.png-49.9kB][7]
2. 解压到你的主题文件夹目录`ghost/content/themes`
3. 重启 Ghost 并进入后台管理系统
4. 进入`Design`页面，选择`maple`主题，点击`ACTIVE`
![Image [2].png-10.5kB][8]

## ✍️ 配置

### 标签云页面
![image_1ce6m6g5kds08141dlsf0c13erm.png-1850.6kB][9]
ghost 默认是没有标签云页面的，在 Maple 主题中是通过将文章设置为独立页面完成的。
1. 进入 ghost 后台管理系统，新建一篇文章，标题为`tag_cloud`
2. 点击文章设置，`Post URL`填写`tag_cloud`
![image_1ce6mfc4r5mi1a0k1dmu1f0f6m113.png-10.9kB][10]
3. 设置这篇文章为独立页面
![image_1ce6mhl6r14a2103m1p8n8t7em92g.png-18.6kB][11]

### 友链及社会化 icon 配置
社会化 icon 会显示在主页的 header 和 footer 里，以及文章详情页的作者介绍里面。为了让主题使用者修改方便，在 Maple 主题的资源文件中，我专门建立了一个`custom`文件夹来放一些配置相关的内容。
![image_1ce6n0t2niumh093991s2l1j4h2t.png-7.6kB][12]

1. 进入主题 `maple/partials/custom`文件夹
2. 编辑`social-icon.hbs`，将里面的链接和图标替换成你自己的社会化 icon 和地址。**注：图标使用的是 [font-awesome][13] 的图标**
3. 编辑`friend-link.hbs`，将里面的地址替换成你自己的友链

### 主页封面配置
在 Maple 主题中，为了使主页更加个性化，我设置了一个开关，可以选择是否使用固定的封面或随机图片封面。
1. 进入主题 `maple/partials/custom`文件夹
2. 编辑`config.hbs`，修改`var enableRandomCover = true;`使用随机图片封面；修改``var enableRandomCover = false;``使用固定的博客封面

>PS：封面图片存放在`maple/assets/images/30+wallpaper`文件夹里，你可以替换里面的图片，**但请保持图片的名称不变**

### copyright 信息设置
使用 Maple 主题后，请将网页底部的 copyright 信息修改为你自己的。只需修改**博客名称**及**备案号**信息，请保留博客发版信息及主题作者信息，谢谢合作！
![image_1ce6nvgdm17ib1p0h1k6p16391co13q.png-11kB][14]
1. 进入主题`maple/partials`文件夹
2. 编辑`copyright.hbs`，修改博客名及备案信息

### google 分析设置
Maple 主题目前使用 Google Analytics 作为网站的统计分析工具，你需要修改`UA`标识为你自己的。
1. 编辑`default.hbs`文件
2. 修改`ga('create', 'UA-83412029-1', 'auto');`里面的`UA`标识

> PS：如果你没有使用Google Analytics，请将这部分代码注释掉。后面考虑通过config配置更多的分析工具

### 每页显示文章设置
Ghost1.x 的版本，将后台修改每页显示文章数功能挪到了主题配置中，所以需要修改主题配置文件才能更改。
1. 编辑`package.json`文件
2. 找到下面这段代码，将`posts_per_page`的值修改为你每页需要显示的文章数
```
"config": {
    "posts_per_page": 8
  },
```

> PS：主题所有的修改，都需要重启Ghost才生效，不要忘记了

## 🏎️ Roadmap
Maple 主题会持续进行更新，这里会列出一些未来将要实现的功能

- [ ] 文章分享功能
- [ ] 社会化评论功能
- [ ] 移动端响应式页面设计

## ©️ Copyright & License
Copyright (C) 2016-2018 Jerry Mei - Released under the [MIT License](https://mit-license.org/).


  [1]: http://static.zybuluo.com/Jerry-MEI/7hk1pkhgqrm8bz2ol98zvf2p/maple%E5%AE%A3%E4%BC%A0%E6%96%87%E6%A1%88.jpg
  [2]:https://img.shields.io/badge/ghost-v1.x.x-green.svg
  [3]:https://img.shields.io/dub/l/vibe-d.svg
  [4]: http://static.zybuluo.com/Jerry-MEI/wu92ledrgdcurl4133yuy7fc/image_1ce828agq1gra23ji9d1gd8105u15.png
  [5]: http://static.zybuluo.com/Jerry-MEI/ljrx5gitvzshkqpmtqjvabii/Image%20%5B2%5D.png
  [6]: https://github.com/KINGMJ/maple/releases
  [7]: http://static.zybuluo.com/Jerry-MEI/8v9j2yybinh3uw9k28nq1pm1/image_1ce6jo1ndma73bl1nmlht71c8f9.png
  [8]: http://static.zybuluo.com/Jerry-MEI/ljrx5gitvzshkqpmtqjvabii/Image%20%5B2%5D.png
  [9]: http://static.zybuluo.com/Jerry-MEI/ju9pnzfqkxyf3d9bm4b1bm95/image_1ce6m6g5kds08141dlsf0c13erm.png
  [10]: http://static.zybuluo.com/Jerry-MEI/0xmc9g424ap3ijsq8nzbyo7s/image_1ce6mfc4r5mi1a0k1dmu1f0f6m113.png
  [11]: http://static.zybuluo.com/Jerry-MEI/q77dhz32zjbrzbx05yp9iigt/image_1ce6mhl6r14a2103m1p8n8t7em92g.png
  [12]: http://static.zybuluo.com/Jerry-MEI/lpjx7s75v0d32u5xm5tplzrq/image_1ce6n0t2niumh093991s2l1j4h2t.png
  [13]: https://fontawesome.com/
  [14]: http://static.zybuluo.com/Jerry-MEI/pb10iewyz4jp1ugriy209r7d/image_1ce6nvgdm17ib1p0h1k6p16391co13q.png