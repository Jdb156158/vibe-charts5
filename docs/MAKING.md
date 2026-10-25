# 制作与复现

## 本地预览交互网页

在仓库根目录运行：

```sh
python3 -m http.server 4853
```

打开 http://localhost:4853/ 。无需构建，图形与字体均在仓库内。

## 视频制作流程

1. 核对 BoardUI 五个公开预览及配色，记录来源与示例数据口径，详见 [分镜与出处](../film/treatment.md)。
2. 20 秒分为 2 秒开场、五个 3 秒主体、3 秒总结。每个主体同时呈现场景、提示词和操作反馈。
3. `film/index.html` 用 Canvas 暴露 `window.draw(t)`，GSAP/OM 提供可编辑时间线。所有视频状态由 t 确定，字体加载完成后渲染。
4. Playwright 输出九个关键帧，完成两轮修改后再导出 1,200 张 JPEG。
5. Python 合成 120 BPM 配乐与操作音效，混音限制峰值，结尾主和弦收束后淡出。
6. FFmpeg 输出 H.264 Main / yuv420p + AAC LC，启用 faststart，兼容网页视频播放。
7. 检查成片抽帧、完整播放与跳转，详见 [视频 QA](../film/QA.md)。
8. 网站复用影片的五个绘图函数，将时间驱动状态改为用户操作状态。增加触屏、键盘控件和可读状态反馈。

## 重新渲染视频

需要 Node.js、Python 3、NumPy、FFmpeg 和 Chrome：

```sh
cd film
npm install
python3 -m pip install numpy
python3 make_audio.py
node render.mjs
node render.mjs full
sh encode.sh
```

默认使用 macOS Chrome，其他路径通过 `CHROME_PATH` 指定。`film/` 是确定性影片，仓库根目录是交互网页。

## 发布 GitHub Pages

将文件提交到 main。仓库 Settings → Pages → Deploy from a branch → main → /(root)。`.nojekyll` 保留静态目录，页面使用相对路径，适合仓库子路径部署。

## 目录

- `index.html`、`site/`：交互网站与绘图代码。
- `media/`：20 秒 MP4、循环 GIF、海报、视频源码 ZIP。
- `film/`：视频完整源工程、配乐脚本、渲染与编码脚本。
- `docs/`：提示词、制作说明与来源。
