## send2bs

>chrome插件：**send to BiShou（收藏至必收）**    
>**主要功能**：将当前页面收藏至必收   
>**需求背景**：目前必收有移动和桌面端（PC/Mac）,而我每天80%的时间是面对电脑，所以，目前主要是通过桌面浏览器收藏文章，然后，当前桌面必收收藏文章的操作路径是：光标定位到浏览器地址栏->选中地址->复制（cmd+c）->打开必收，激活收藏 ->选择标签->点击收藏   
>**痛点**：如上的操作路径实属太长，应用间切换太麻烦了，为何，不能直接右键->收藏至必收 ？所以这个插件就来了

### 开发过程

#### 开发思路

>桌面必收监控了剪贴板，如果是链接，就激活收藏页面，所以，插件的逻辑是，读取url，复制到剪贴板，然后用插件激活（打开）必收

#### 技术栈

1. jQuery
2. chrome 的 API
3. 开发环境：macOS Catilina + VSCode

#### 安装指南

> **适用浏览器**： Google Chrome / Chromium /与谷歌浏览器同内核（webkit）的浏览器：Microsoft Edge、360极速浏览器极速模式、QQ 浏览器极速模式、360安全浏览器极速模式

##### Step1: 将必收应用注册为 chrome 的本机消息传递主机：a native messaging host

> **mac 下注册方式：**
```json
//Microsoft Edge Dev ：/Users/deco/Library/Application Support/Microsoft Edge Dev/NativeMessagingHosts
//Google Chrome : /Users/deco/Library/Application Support/Google/Chrome/NativeMessagingHosts
//新建文件： com.bishou.bishouapp.json
//文件内容如下：
{
  "name": "com.bishou.bishouapp",
  "description": "必收",
  "path": "/Applications/必收.app/Contents/MacOS/必收",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://aliepgdbgfplfhdbejkimhcipmafihlm/"
  ]
}
//请注意：allpwed_origins 的值为插件的id值：在插件的管理页面可以看到
```

> **windows 下注册方式：**

```bash
## 新建 bishou.txt
## 输入内容为：
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\com.my_company.my_application]
@="C:\\path\\to\\nmh-manifest.json"
## C:\\path\\to\\nmh-manifest.json ，可以跟进个人情况随意更改：路径，文件名
## 将 bishou.txt 改为 bishou.reg ，并双击安装
## json 的内容和上述一样，只不过，path要调整为你电脑实际的安装路径
{
  "name": "com.bishou.bishouapp",
  "description": "必收",
  "path": "C:\\Program Files\\。。。。\\bishou.exe",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://aliepgdbgfplfhdbejkimhcipmafihlm/"
  ]
}
```


##### Step2: 安装插件：   
> 由于本人没有 Google 开发者账号，不能上架应用市场，所以需要通过离线的方式安装插件   
> **安装方式1**：拖动安装，地址栏输入：`chrome://extensions/`  回车,然后拖动插件 crx 至插件管理页面，安装   
> **安装方式2**：开发者模式，地址栏输入：`chrome://extensions/`  回车,选中右上角的：开发者模式，然后将 crx 后缀改为 zip或 rar，然后解压后，回到插件管理页面，点击：加载正在开发的插件，选中刚刚的解压，即可

### 参考资料

[nactiveMessage](https://developer.chrome.com/extensions/nativeMessaging)

[360极速浏览器开发应用平台](http://open.chrome.360.cn/extension_dev/messaging.html)

[离线安装插件方法](https://www.jianshu.com/p/b1426e8ea3ed)

[一起来做Chrome插件](http://www.colorgamer.com/index.php/12.html)

[a message host](https://blog.csdn.net/yk_ang_ang/article/details/89182277)