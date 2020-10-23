## send2bs

>chrome插件：**send to BiShou（收藏至必收）**  
>**主要功能**：将当前页面收藏至必收，去[必收官网](https://www.bishouapp.com/)了解必收吧  
>**需求背景**：目前必收有移动和桌面端（PC/Mac）,而我每天80%的时间是面对电脑，所以，目前主要是通过桌面浏览器收藏文章，然后，当前桌面必收收藏文章的操作路径是：光标定位到浏览器地址栏->选中地址->复制（cmd+c）->打开必收，激活收藏 ->选择标签->点击收藏  
>**痛点**：如上的操作路径实属太长，应用间切换太麻烦了，为何，不能直接右键->收藏至必收 ？所以这个插件就来了

### 开发&安装过程

#### 1、开发思路

>桌面必收监控了剪贴板，如果是链接，就激活收藏页面，所以，插件的逻辑是，读取url，复制到剪贴板，然后用插件激活（打开）必收

#### 2、技术栈

:one: jQuery  
:two: chrome 的 API  
:three: 开发环境：macOS Catilina + VSCode  

#### 3、安装指南

> **适用浏览器**： Google Chrome / Chromium /与谷歌浏览器同内核（webkit）的浏览器：Microsoft Edge、360极速浏览器极速模式、QQ 浏览器极速模式、360安全浏览器极速模式

##### 3.1、安装插件

> 由于本人没有 Google 开发者账号:cry:，不能上架应用市场，所以需要通过开发者模式安装插件  
> **安装方式1**：下载 crx :car:，浏览器地址栏输入：`chrome://extensions/`  回车,然后拖动插件 crx 至插件管理页面，即可安装   
> **安装方式2**：解压安装（源文件安装）:bus:，打开开发者模式，地址栏输入：`chrome://extensions/`  回车,选中右上角的：开发者模式，然后将 crx 后缀改为 zip或 rar，然后解压到固定目录，不会随意删除，回到插件管理页面，点击：加载正在开发的插件，选中刚刚的解压文件夹，即可  
> 还不懂？[点我点我点我](https://www.52pojie.cn/thread-1149425-1-1.html)  

##### 3.2、配置插件和必收通信

安装完插件后，还需要配置浏览器与必收的通信协议（a native messaging host），配置方式根据系统的不同也有所区别，分为 Mac 和 Windows 平台，请自行选择。

> **mac 下配置步骤方式：**

```json
//Microsoft Edge Dev ：/Users/deco/Library/Application Support/Microsoft Edge Dev/NativeMessagingHosts
//Google Chrome : /Users/deco/Library/Application Support/Google/Chrome/NativeMessagingHosts
//第一步：在上述目录中，新建文件，文件名： com.bishou.bishouapp.json
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
//请注意：
// allpwed_origins 的值为插件安装成功后的id值：在插件的管理页面可以看到
// path 为必收的安装目录
```

> **windows 下安装注册方式：**

```json
//第一步
//在不经常变的路径下（此文件要长期保留），比如，可以在必收的安装目录下创建，命名（可任意）为：bishou-crx-config.json
//内容为：
{
  "name": "com.bishou.bishouapp",
  "description": "必收",
  "path": "C:\\Program Files\\。。。。\\bishou.exe",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://aliepgdbgfplfhdbejkimhcipmafihlm/"
  ]
}
//请注意：
// allpwed_origins 的值为插件安装成功后的id值：在插件的管理页面可以看到
// path 为必收的安装目录

//第二步

// 在桌面或其他临时位置，新建 bishou.txt，用后可删除，该文件主要目的是将bishou-crx-config.json 的路径写入注册表

// ↓↓↓↓↓↓↓↓内容开始↓↓↓↓↓↓↓↓↓↓↓↓

Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\com.my_company.my_application]
@="C:\\...\\必收的安装路径\\bishou-crx-config.jsonn"

//↑↑↑↑↑↑↑↑↑↑内容结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//注意修改等号后的路径值，执行第一步的 json 绝对路径
//将 bishou.txt 改为 bishou.reg ，并双击安装，若报毒，请临时关闭杀毒软件
//删除 bishou.reg 
```
:smile: :smile: :smile: :smile: 尽情食用 :smile: :smile: :smile: :smile: :smile: 

### 参考资料

[nactiveMessage](https://developer.chrome.com/extensions/nativeMessaging)

[360极速浏览器开发应用平台](http://open.chrome.360.cn/extension_dev/messaging.html)

[离线安装插件方法](https://www.jianshu.com/p/b1426e8ea3ed)

[一起来做Chrome插件](http://www.colorgamer.com/index.php/12.html)

[a message host](https://blog.csdn.net/yk_ang_ang/article/details/89182277)