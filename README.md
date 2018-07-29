## Vue云笔记项目

**技术栈**

前端：

- Vue
- Vue-Router
- Vuex
- iView
- Stylus
- Axios
- Markdown-it

后端：（登陆注册及Auth验证模块）

- Express
- MongoDB

## 功能及效果 (效果图为动态图，如果静止了，请点击图片查看)

1. 假设用户未登录，当访问网站时，默认跳转到【登录页面】
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo1.gif)

2. 用户此时可输入账号密码进行登录。也可点击注册账号跳转到【注册页面】
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo2.gif)


3. 在注册页面用户可输入用户名密码进行注册
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo3.gif)

4. 登录成功后默认跳转到【笔记本列表页面】， 用户可新建笔记本、删除笔记本、修改笔记本标题
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo4.gif)

5. 用户点击某条笔记本，会跳转到 【笔记页面】，【笔记】页面展示当前笔记本下的笔记列表以及其中一个笔记的详情。用户可在笔记本列表顶部切换笔记本，切换笔记本后会自动展示该笔记本下的笔记列表
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo5.gif)

6. 每个笔记也可以进行相应的添加笔记，删除笔记，更新笔记，编辑笔记的功能，同时，笔记可以以markdown的形式展示
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo6.gif)

7. 当用户点击回收站时，会跳转到【回收站】页面，回收站页面里有所有临时删除的笔记。用户可彻底删除笔记，也可恢复笔记到原笔记本
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo7.gif)

8. 信息页面，展示登陆用户的个人相关信息
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo8.gif)

9. 当用户点击注销时，回到登录页面
![](http://47.98.159.8/picture-repo/vue-evernote-images/demo9.gif)

---

还很其他功能效果动态图无法展示，可以选择下载下来后在本地运行查看效果。

```
git clone ..
cd vue-evernote/evernote-client
npm install
npm run dev
```
