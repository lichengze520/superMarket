var express = require('express');
var router = express.Router();

// 引入数据库连接模块（之后所有的增删改查操作都是使用这一个模块）
const connection = require('./js/conn');
/* 写一个路由 统一设置响应头 */
router.all('*', (req, res, next) => {
  // 设置响应头解决跨域
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
  res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
  // 放行
  next();
})

/* --------------------  验证token合法性开始  ---------------- */
// 准备一个签名（秘钥）
const secretKey = 'itsource';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt({
  secret: secretKey
}).unless({
  path: ['/login/checklogin'] // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
}));
// 路由拦截器
router.use(function (err, req, res, next) {
  // 如果前端没有token或者是错误的token 就会抛出如下错误
  if (err.name === 'UnauthorizedError') {
    // 响应给前端token无效的信息
    res.status(401).send('token不合法...');
  }
})
/* --------------------  验证token合法性结束  ---------------- */

//添加商品
router.post('/goodsadd', (req, res) => {
  //接收参数
  let {
    cateName,
    barCode,
    goodsName,
    costPrice,
    marketPrice,
    salePrice,
    goodsNum,
    goodsWeight,
    unit,
    discount,
    promotion,
    goodsDesc
  } = req.body;
  //写sql
  const sqlStr = `insert into goods(cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
  // 参数
  const sqlParams = [cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc]
  //执行sql
  connection.query(sqlStr, sqlParams, (err, data) => {
    if (err) throw err;
    //受影响行数
    if (data.affectedRows > 0) {
      res.send({
        code: 0,
        reason: '添加商品成功'
      })
    } else {
      res.send({
        code: 1,
        reason: '添加商品失败'
      })
    }

  })
});
//
//商品列表
/* router.get('/goodslist', (req, res) => {
  const sqlStr = `select * from goods order by ctime desc`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data)
  })
}) */

/* 商品分页 */
router.get('/goodslistbypage', (req, res) => {
  //接收参数
  let {
    currentPage,
    pageSize,
    cateName,
    keyword
  } = req.query
  //构造sql
  let sqlStr = `select * from goods where 1=1`;
  // 拼接查询条件
  // 如果cateName为空或全部  代表查询所有分类  否则就是按照分类查询
  if (cateName !== '全部' && cateName !== '') {
    sqlStr += ` and cateName='${cateName}'`;
  }
  // 如果kewword为空就是查询所有名称或条形码 否则 就是查询条形码或名称包含关键字的
  if (keyword !== '') {
    sqlStr += ` and(goodsName like '%${keyword}%' or barCode like '%${keyword}%')`
  }

  // 拼接排序
  sqlStr += ` order by ctime desc`;
  //执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //查询结果总条数
    let total = data.length
    //构造分页sql
    let n = (currentPage - 1) * pageSize;
    sqlStr += ` limit ${n}, ${pageSize}`;
    //执行分页
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      res.send({
        total,
        data
      })
    })
  })
})
// 删除
router.get('/delgood', (req, res) => {
  //接收id
  let {
    id
  } = req.query;
  // 构造sql
  const sqlStr = `delete from goods where id=${id}`
  //执行
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {//接受影响的行数大于0成功，否则失败
      res.send({
        code: 0,
        reason: '删除账号成功!'
      })
    } else {
      res.send({
        code: 1,
        reason: '删除账号失败!'
      })

    }
  })
})



module.exports = router;