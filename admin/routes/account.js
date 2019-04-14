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
// 准备一个签名（秘钥）
const secretKey = 'itsource';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt ({
    secret: secretKey
}).unless({
    path: ['/login/checklogin']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
})
/* 添加账号路由 */
router.post('/accountadd', (req, res) => {

	// 接收数据
	let {
		account,
		password,
		userGroup
	} = req.body;

	// 写sql
	const sqlStr = `insert into account(account, password, user_group) values('${account}', '${password}', '${userGroup}')`;

	//console.log('新增内数据', sqlStr) // 这里是一个测试点 一定要测试 否则出错 ！！！！
	// // 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err; // 如果受影响行数大于0 代表成功 否则代表失败
		if (data.affectedRows > 0) {
			// 响应成功的数据对象给前端
			res.send({
				code: 0,
				reason: "添加账号成功！"
			})
		} else {
			// 		// 响应失败的数据对象给前端
			res.send({
				code: 1,
				reason: "添加账号失败！"
			})
		}
	})


})

/* 请求账号列表路由 */
router.get('/accountlist', (req, res) => {

	// 写sql
	const sqlStr = `select * from account order by create_date desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data);
	})
})

/* 删除帐号列表路由 */
router.get('/delaccount', (req, res) => {
	//接收id
	let {
		id
	} = req.query
	//写sql
	const sqlStr = `delete from account where id=${id}`
	//console.log(sqlStr);
	//执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		//如果受影响数数大于0，功功，否则失败
		if (data.affectedRows > 0) {
			res.send({
				code: 0,
				reason: '删除账号成功!'
			}) // 响应成功的数据对象给前端
		} else {
			res.send({
				code: 1,
				reason: '删除账号失败!'
			}) // 响应失败的数据对象给前端

		}
	})
})

/* 修改数据回填 */
router.get('/editaccount', (req, res) => {
	// 接收id
	let {
		id
	} = req.query;
	// 构造sql
	const sqlStr = `select * from account where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data) // 把查询到的数据响应给前端
	})
})
/* 修改-保存新数据 */
router.post('/saveeditaccount', (req, res) => {
	//接收参数
	let {account,userGroup,editId} = req.body
	//构sql
	const sqlStr=`update account set account='${account}', user_group='${userGroup}' where id=${editId}`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if (err) throw err;
		//判断成功就返回成功的数据对象，否则返回失败的数据对象
		if(data.affectedRows>0){
           res.send({code:0,reason:'修改成功'})
		}else{
			res.send({code:1,reason:'修改失败'})
		}
	})
})
/* 批量删除 */
router.get('/batchdel',(req,res)=>{
  //接收id
  let {idArr}=req.query
  //构造sql
  const sqlStr=`delete from account where id in (${idArr})`
  //执行sql
  connection.query(sqlStr,(err,data)=>{
	  if (err) throw err;
	//判断
	if(data.affectedRows>0){
       res.send({code:0,reason:'批量删除成功'})
	}else{
		res.send({code:1,reason:'批量删除失败'})
	}
  })
})

/* 分页路由 */
router.get('/accountlistbypage',(req,res)=>{
	//接收参数
	let {currentPage,pageSize}=req.query;
	//构造sql
	let sqlStr=`select * from account order by create_date desc`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if (err) throw err
		//计算数据总条数
		let total=data.length;
		//计算调过多少条
		let n=(currentPage-1)*pageSize
		//拼接分页sql
		sqlStr += ` limit ${n}, ${pageSize}`;
		//执行sql
		connection.query(sqlStr,(err,data)=>{
			if (err) throw err;
			//把数据总条数和每个页码对应的数据发给前端
			res.send({total,data})
		})
	})
})

/* 获取原密码 */
router.get('/oldPassword',(req,res)=>{
	//获取原密码
	res.send(req.user.password)
})
module.exports = router;