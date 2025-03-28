const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 检查配置文件是否存在
let port = 3000;
try {
  const api = require('./config/api');
  port = api.port || 3000;
  console.log('成功加载配置文件');
} catch (err) {
  console.error('配置文件加载失败:', err.message);
  console.log('使用默认端口 3000');
}

// 检查路由文件是否存在
let routes;
try {
  routes = require('./routes');
  console.log('成功加载路由文件');
} catch (err) {
  console.error('路由文件加载失败:', err.message);
  // 创建一个空路由
  routes = express.Router();
  routes.get('/', (req, res) => {
    res.json({ message: 'API正常工作' });
  });
}

// 创建Express应用
const app = express();

// 中间件
app.use(cors()); // 跨域支持
app.use(express.json()); // JSON解析
app.use(express.urlencoded({ extended: true })); // URL编码解析

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// 检查 public 目录是否存在
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) {
  console.log('创建 public 目录');
  fs.mkdirSync(publicPath, { recursive: true });
}

// 静态文件服务
app.use(express.static(publicPath));

// API路由
app.use('/api', routes);

// 检查 index.html 是否存在
const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log('index.html 不存在，创建一个简单的首页');
  const simpleHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>天气服务</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>天气服务系统</h1>
    <p>API 已成功部署。您可以使用以下端点获取数据:</p>
    <ul>
      <li><code>/api/weather?location=beijing</code> - 获取天气数据</li>
      <li><code>/api/cities?q=搜索词</code> - 搜索城市</li>
    </ul>
  </div>
</body>
</html>`;
  fs.writeFileSync(indexPath, simpleHtml);
}

// 根路由 - 提供前端页面
app.get('/', (req, res) => {
  console.log('处理根路由请求');
  res.sendFile(indexPath);
});

// 404处理
app.use((req, res, next) => {
  console.log(`处理404错误: ${req.path}`);
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ code: 404, message: '接口不存在' });
  } else {
    res.status(404).sendFile(indexPath);
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('错误:', err.stack);
  if (req.path.startsWith('/api/')) {
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  } else {
    res.status(500).send('服务器内部错误');
  }
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
  console.log(`气象服务系统运行在 http://0.0.0.0:${port}`);
});

module.exports = app;
