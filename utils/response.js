// 成功响应
function success(res, data, message = 'success') {
  res.json({
    code: 200,
    message,
    data
  });
}

// 错误响应
function error(res, message = 'error', code = 400) {
  res.status(code).json({
    code,
    message
  });
}

module.exports = { success, error };
