var express = require('express');
var router = express.Router();

// 引入数据库连接模块（之后所有的增删改查操作都是使用这一个模块）
const connection = require('./js/conn');

/* 写一个路由 统一设置响应头 */
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
	// 放行
	next();
})

/* 添加账号路由 */
router.post('/accountadd', (req, res) => {

	// 接收数据
	let {
		account,
		password,
		userGroup
	} = req.body;

	// // 写sql
	const sqlStr = `insert into account(account, password, user_group) values('${account}', '${password}', '${userGroup}')`;

	console.log(sqlStr) // 这里是一个测试点 一定要测试 否则出错 ！！！！
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err; // 如果受影响行数大于0 代表成功 否则代表失败
		if (data.affectedRows > 0) {
			// 响应成功的数据对象给前端
			res.send({
				code: 0,
				reason: "添加账号成功!哈哈！"
			})
		} else {
				// 响应失败的数据对象给前端
			res.send({
				code: 1,
				reason: "添加账号失败!呵呵！"
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

module.exports = router;