##弹性布局实现固定的底栏
有时，页面内容太少，无法占满一屏的高度，底部就会抬高至页面中间。
此时可用flex布局让底栏一直固定在底部。
```$xslt
<header class="header"></header>
<main class="main"></main>
<footer class="footer"></footer>
```
这是网页的上中下三个部分，要想底部一直固定在底部，那么思路是让中间那部分
高度auto，而且body需设置高度100%。
