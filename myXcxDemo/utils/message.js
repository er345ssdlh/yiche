const auth = require('./userAuth.js')
import { reqFun } from "./util.js";
const apiConfig = require("../apiConfig/apiConfig.js");

function saveFormId(e) {
  if (!e || !e.detail) {
    console.error('parameter should not be null')
    return
  }

  //未授权登录 直接返回
  if (!auth.isUserLogin()) return

  //排除在模拟器上生成的formId
  if (e.detail.formId == 'the formId is a mock one') {
    console.log(e.detail.formId)
    return
  }


  let loginUserInfo = auth.getLoginUserInfo();

  reqFun({
    url: apiConfig.add_user_msgid,
    data: {
      formid: e.detail.formId,
      wxid: loginUserInfo.openid,
      'Login-Ticket': loginUserInfo.ticket
    },
    success: res => {
      console.log(res)
    }
  })
}

module.exports = {
  saveFormId: saveFormId
}