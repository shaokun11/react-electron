#### 使用方式  
```javascript
git clone https://github.com/shaokun11/react-electron.git  
cd react-electron && npm i 
```
#### 开发模式  
```javascript
npm start 
npm run electron-dev
// 备注,如果在开发模式中使用了ipc通信,则直接在浏览器中打开网页是会报错的,在app中打开即可
```
#### 生产模式  
```javascript
npm run build 
npm run electron
```
#### 打包(仅在mac电脑上可行)  
```javascript
npm run packager  
cd dist && ls -al
```

#### 核心文件
```javascript
 // public/electron.js 
 // package.json的build字段
 //可参考如下配置
https://electronjs.org/docs/tutorial/first-app#electron-development-in-a-nutshell
https://www.electron.build/configuration/configuration
```

#### 关于ipc与main进程
* ipc即使用前端html创建的ui的进程
* main 上诉之外的ui,比如说整个app的打开,关闭,或者顶部工具栏一些的ui,
* 由于这两部分ui在不同的进程中,所以不能直接更改另外一个进程的中ui,所以必须使用进程通信的方式来相互更改,electron提供了 electron.ipcRenderer 与
electron.ipcMain 分别在不同的进程中进行事件的监听(本质上是一个eventEmitter),从而达到更改ui的目的
* 在react中,如果要使用ipcRenderer,需按照如下方式使用:

```javascript
    //1. 创建一个浏览器窗口,配置nodeIntegration :true
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,  //允许使用node的方式引入,不管是哪一个electron版本,加上就好,可以防止系统默认变量的更改引起不必要的麻烦
            webSecurity: false, // 允许使用本地资源
        },
        backgroundColor: '#B1FF9D',
    });
    // 2,在需要使用的时候,按照如下方式引入,一定得按照这种方式引入 window.require("electron")
    const electron = window.require("electron")
    const ipc = electron.ipcRenderer
```



