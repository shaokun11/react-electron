#### 使用方式  
```javascript
git clone https://github.com/shaokun11/react-electron.git  
cd react-electron && npm i 
```
#### 开发模式  
```javascript
npm start 
npm run electron-dev
```
#### 生产模式  
```javascript
npm run build && npm run electron
```
#### 打包(仅在mac电脑上可行)  
```javascript
//如安装过可跳过
npm install electron-build -g    
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



