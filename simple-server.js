const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const PORT = 5000;
// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};
// Simple database simulation (можно заменить на PostgreSQL)
let users = [];
let cart = {};
// Load products and categories from data files
const products = require('./data/products.js');
const categories = require('./data/categories.js');
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  // API Routes
  if (pathname.startsWith('/api/')) {
    handleApiRequest(req, res, pathname);
    return;
  }
  // Serve static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found, serve index.html (SPA behavior)
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(404);
            res.end('Page not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});
function handleApiRequest(req, res, pathname) {
  res.setHeader('Content-Type', 'application/json');
  // Status endpoint
  if (pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'running',
      message: 'FishShop Node.js сервер работает',
      database: 'PostgreSQL готов к подключению',
      timestamp: new Date().toISOString()
    }));
    return;
  }
  // Products endpoint
  if (pathname === '/api/products' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(products));
    return;
  }
  // Categories endpoint
  if (pathname === '/api/categories' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(categories));
    return;
  }
  // Cart endpoints - GET
  if (pathname.includes('/api/cart/') && req.method === 'GET') {
    const userId = pathname.split('/')[3];
    res.writeHead(200);
    res.end(JSON.stringify(cart[userId] || []));
    return;
  }
  // Cart endpoints - POST (добавить товар)
  if (pathname.includes('/api/cart/') && req.method === 'POST') {
    const userId = pathname.split('/')[3];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { productId, quantity } = JSON.parse(body);
        
        // Инициализируем корзину пользователя если её нет
        if (!cart[userId]) {
          cart[userId] = [];
        }
        
        // Ищем товар в корзине
        const existingItem = cart[userId].find(item => item.productId === productId);
        
        if (existingItem) {
          // Увеличиваем количество
          existingItem.quantity += quantity;
        } else {
          // Добавляем новый товар
          cart[userId].push({ productId, quantity });
        }
        
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          message: 'Товар добавлен в корзину'
        }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          error: 'Ошибка добавления в корзину'
        }));
      }
    });
    return;
  }
  // Auth endpoint
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        if (email && password) {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            user: {
              id: 'user_' + Date.now(),
              email: email,
              name: 'Рыболов'
            }
          }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({
            success: false,
            message: 'Введите email и пароль'
          }));
        }
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  // Registration endpoint
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { firstName, lastName, email, password } = JSON.parse(body);
        if (email && password && firstName && lastName) {
          const user = {
            id: users.length + 1,
            email: email,
            first_name: firstName,
            last_name: lastName
          };
          users.push(user);
          
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            user: user
          }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({
            success: false,
            error: 'Все поля обязательны'
          }));
        }
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  // 404 for unknown API routes
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'API endpoint not found' }));
}
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎣 FishShop сервер запущен на порту ${PORT}`);
  console.log(`🌐 Сайт: http://localhost:${PORT}`);
  console.log(`⚡ API: http://localhost:${PORT}/api/status`);
  console.log(`💾 Готов к подключению PostgreSQL базы данных`);
});