/* 工具函数 */
//验证密码:需含有字母
export function passwordReg(val) {
    let reg= /[a-zA-Z]+/;
    return reg.test(val)
}