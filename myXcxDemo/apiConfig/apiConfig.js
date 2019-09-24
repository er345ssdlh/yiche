const baseUrl = 'https://mapi.yiche.com'; // 正式发版地址
// const baseUrl = 'http://172.20.4.14:8769'; // 测试的发版地址
// const baseUrl = 'http://192.168.87.105:18769'; //最新测试的发版地址

const onLineFlag = true;

module.exports = {
  onLineFlag,
  wzAppId: 'wxea83aa83318f512b',
  baseUrl, //默认路径
  // 写的demo用到的几个接口
  newsList: baseUrl + "/bd_carmodel/api/v1/summary/get_news_list", //新闻列表
  newsSpeak: baseUrl + "/bd_carmodel/api/v1/summary/get_comment", //新闻评论
  carList: baseUrl + "/wx_carmodel/api/v1/brand/get_brand_list/v2", //汽车列表
  carLogoList: baseUrl + "/wx_carmodel/api/v1/inquiry/get_car_serial_list_info", //汽车品牌列表
  carLogoListC: baseUrl + "/wx_carmodel/api/v1/carmodel/getinfos/v2", //汽车详情

  getCarModelInfo: baseUrl + '/wx_carmodel/api/v1/carmodel/getinfos', //获取车型信息接口（params:serialId=车系id,cityId=城市id）
  getCarIcon: baseUrl + '/wx_carmodel/api/v1/mapirating/get_link_list/v2', //获取车型综述页四个icon可配置图标(更新V2版本添加)

  getCarStyle: baseUrl + '/wx_carmodel/api/v1/car/get_car_list/v2', //获取车款数据接口（params:serialId=车系id,cityId=城市id）
  getAudioList: baseUrl + '/wx_carmodel/api/v1/audio/get_audio_resource/v2', //获取大咖说车语音列表 ( params:isCarModel=类型,serialId=车系id )
  getSuperEvaluate: baseUrl + '/wx_carmodel/api/v1/evaluate/super_evaluate/v2', //获取超级评测数据 ( params:serialId=车系id )
  getNewsList: baseUrl + '/wx_carmodel/api/v1/evaluating_news/get_news/v2', //获取评测新闻列表 ( params:serialId=车系id )
  getCarDetail: baseUrl + '/wx_carmodel/api/v1/discounts/get_car_detail_info', //优惠详（param: {pbid: pbid=车型id）
  getDisCount: baseUrl + '/wx_carmodel/api/v1/discounts/get_car_list', //（param: { currentPage: 当前第几页,pageSize: 一页多少条）
  getProvince: baseUrl + '/wx_carmodel/api/v1/discounts/get_pro_list', //易车惠获取省列表(params:pbid=商品id)
  getCity: baseUrl + '/wx_carmodel/api/v1/discounts/get_city_list', //易车惠获取城市列表(params:pbid=商品id,proid=省份id)
  getDealerList: baseUrl + '/wx_carmodel/api/v1/discounts/get_dealer_stock', //易车惠获取经销商列表（params:pbid=商品id,proid=省份id，pid=车型id，cityid=城市id）
  saveOrder: baseUrl + '/wx_carmodel/api/v1/discounts/save_order', //易车惠下单接口（params:pbid=商品id,proid=省份id，pid=车型id，cityid=城市id,name=下单人姓名，phoneNumber=下单人手机号，dealerId=经销商id，dealerName=经销商名称）

  get_news_recommand: baseUrl + "/wx_carmodel/api/v1/news/get_news_recommand", //获取推荐新闻
  get_news_list: baseUrl + "/wx_carmodel/api/v1/news/get_news_list", //获取分类列表

  get_focus: baseUrl + "/wx_carmodel/api/v1/user/get_focus", //获取焦点图帧
  get_car_style_property: baseUrl + "/wx_carmodel/api/v1/choosecar/get_car_style_property", // 根据车款ID获取相关属性(计算器使用）


  get_ticket_serialids: baseUrl + "/wx_carmodel/api/v1/price/get_ticket_serialids", // 小程序首页，车型发票列表

  get_index_info: baseUrl + "/wx_carmodel/api/v1/washactive/get_index_info", // 洗车券首页初始信息
  get_my_info: baseUrl + "/wx_carmodel/api/v1/washactive/get_my_info", // 个人洗车券相关信息
  wash_create_user_active: baseUrl + "/wx_carmodel/api/v1/washactive/create_user_active", // 创建0元洗车劵活动
  encrypt_login: baseUrl + "/wx_carmodel/api/v1/user/encrypt_login", // 密文登录
  get_city_status: baseUrl + "/wx_carmodel/api/v1/washactive/get_city_status", // 城市是否支持洗车券
  get_praise_info: baseUrl + "/wx_carmodel/api/v1/washactive/get_praise_info", // 获取用户点赞页面数据
  get_lottery: baseUrl + "/wx_carmodel/api/v1/draw/get_lottery", //抽奖接口 startAwardUrl
  get_lottery_chance: baseUrl + "/wx_carmodel/api/v1/draw/get_lottery_chance", //获取登录用户抽奖次数 getUserAwardCountUrl
  get_draw_rules: baseUrl + "/wx_carmodel/api/v1/draw/get_draw_rules", //获取抽奖规则  getAwardRulesUrl  appVer=9.5&groupname=wxAppDraw
  get_option_list: baseUrl + "/wx_carmodel/api/v1/draw/get_option_list", //获取奖品列表  getAwardItemsUrl
  get_latest_prize: baseUrl + "/wx_carmodel/api/v1/draw/get_latest_prize", //获取最新中奖名单 getLastestAwardUserListUrl
  update_record_mobile: baseUrl + "/wx_carmodel/api/v1/draw/update_record_mobile", //保存手机号 saveUserAwardMobileUrl
  get_city_info: baseUrl + '/wx_carmodel/api/v1/base/get_city_info', //获取城市信息
  get_car_foot_prints: baseUrl + '/wx_carmodel/api/v1/footprint/get_car_foot_prints', //获取车型足迹接口
  sync_car_foot_prints: baseUrl + '/wx_carmodel/api/v1/footprint/sync_car_foot_prints', //同步车型足迹
  add_carmodel_footprint: baseUrl + "/wx_carmodel/api/v1/brand/add_carmodel_footprint", //增加车型足迹
  signIn: baseUrl + '/wx_carmodel/api/v1/account/signin/execute', //执行签到任务接口
  getSignInStatus: baseUrl + '/wx_carmodel/api/v1/account/signin/get_status', //获取签到状态接口
  get_user_unFinish: baseUrl + '/wx_carmodel/api/v1/useractivity/get_user_unFinish', //获取用户进行中的活动列表
  get_user_Finish: baseUrl + '/wx_carmodel/api/v1/useractivity/get_user_Finish', //获取用户已完成的活动列表
  send_bind_sms: baseUrl + '/wx_carmodel/api/v1/user/send_bind_sms', //获取绑定手机号验证码
  decrypt_mobile: baseUrl + '/wx_carmodel/api/v1/user/decrypt_mobile', //解密微信手机号
  bind_mobile: baseUrl + '/wx_carmodel/api/v1/user/bind_mobile', //绑定手机号
  getList: baseUrl + "/wx_carmodel/api/v1/brand/get_brand_list", //品牌列表
  get_comment_data: baseUrl + "/wx_carmodel/api/v1/news/get_comment_data", //评论接口
  get_brand_carmodel: baseUrl + "/wx_carmodel/api/v1/brand/get_brand_carmodel", //车型插件
  get_area_list: baseUrl + "/wx_carmodel/api/v1/base/get_area_list", //获取省市列表接口
  save_feed_back: baseUrl + "/wx_carmodel/api/v1/user/save_feed_back", //意见反馈
  get_city_info: baseUrl + "/wx_carmodel/api/v1/base/get_city_info", //获取城市信息
  get_news_detail: baseUrl + "/wx_carmodel/api/v1/news/get_news_detail", //文章详情
  get_token: baseUrl + "/wx_carmodel/api/v1/base/get_token", //获取token
  add_user_msgid: baseUrl + "/wx_carmodel/api/v1/price/add_user_msgid", //用户formid 收集接口
  encrypt_login: baseUrl + "/wx_carmodel/api/v1/user/encrypt_login", //密文登录
  get_auth_code: baseUrl + "/wx_carmodel/api/v1/user/get_auth_code", //微信解密用户基本信息授权数据

  get_explain: baseUrl + '/wx_carmodel/api/v1/price/get_explain', //获取活动规则说明接口
  get_active_info: baseUrl + '/wx_carmodel/api/v1/price/get_active_info', //获取指定活动信息
  price_create_user_active: baseUrl + '/wx_carmodel/api/v1/price/create_user_active', //创建用户活动接口
  get_thirdbuybill_info: baseUrl + '/wx_carmodel/api/v1/price/get_thirdbuybill_info', //获得点赞页面信息
  get_mybuybill_info: baseUrl + '/wx_carmodel/api/v1/price/get_mybuybill_info', //获得我的活动页信息
  price_praise_user_active: baseUrl + '/wx_carmodel/api/v1/price/praise_user_active', //原价购车点赞接口
  washactive_praise_user_active: baseUrl + '/wx_carmodel/api/v1/washactive/praise_user_active', //洗车点赞接口

  car_compare: baseUrl + '/wx_carmodel/api/v1/choosecar/car_compare', //车款综合对比接口
  car_info_list: baseUrl + '/wx_carmodel/api/v1/choosecar/car_info_list', //获取车款列表，按年款和排量分组
  get_cover_list_style: baseUrl + '/wx_carmodel/api/v1/gallery/style/get_cover_list', //获取车款封面图信息
  get_dealers: baseUrl + '/wx_carmodel/api/v1/choosecar/get_dealers', //获取经销商
  get_cover_list_model: baseUrl + '/wx_carmodel/api/v1/gallery/model/get_cover_list', //获取所有车系封面图(白底+实拍)信息

  get_condition: baseUrl + '/wx_carmodel/api/v1/gallery/get_condition', //获取图片查询条件信息
  get_car_photo: baseUrl + '/wx_carmodel/api/v1/choosecar/photo/get_car_photo', //根据车款Id获取车款图片接口
  sug_only_carmodel: baseUrl + '/wx_carmodel/api/v1/choosecar/sug_only_carmodel', //只含车型下拉提示

  get_car_list: baseUrl + '/wx_carmodel/api/v1/choosecar/get_car_list', //获取车款参配信息接口
  get_wxmult_car_infos: baseUrl + '/wx_carmodel/api/v1/choosecar/get_wxmult_car_infos', //获取多个车款参配信息
  get_user_info: baseUrl + "/wx_carmodel/api/v1/user/get_user_info", //获取用户信息（账号接口）
  login: baseUrl + '/wx_carmodel/api/v1/user/login', //登录接口

  generate_qrcode: baseUrl + "/wx_carmodel/api/v1/news/generate_qrcode", //获取二维码
  download: baseUrl + "/wx_carmodel/api/v1/user/share/download", //用户分享-下载图片

  inquiry_add: baseUrl + '/wx_carmodel/api/v1/choosecar/inquiry/add', //询价线索接口
  search_result: baseUrl + '/wx_carmodel/api/v1/choosecar/search_result', //高级选车工具接口
  get_car_param_info: baseUrl + '/wx_carmodel/api/v1/choosecar/get_car_param_info', //根据车款id获取参配信息


  draftBox: baseUrl + '/wx_carmodel/api/v1/travel/delete_draft_by_ids', //param:{ids: ids}删除游记ids
  draftList: baseUrl + '/wx_carmodel/api/v1/travel/travel_note/travel_list',
  travelDetail: baseUrl + '/wx_carmodel/api/v1/travel/get_travel_info', //param: { id: id }/id/游记
  publicTravelUnload: baseUrl + '/wx_carmodel/api/v1/travel/create_travel', //创建游记param{publishStatus: 'n' id:新增游记id或者编辑游记id,title: 标题,coverUrl: 图片路径,}
  publicTravelFile: baseUrl + '/wx_carmodel/api/v1/base/upload_pic?businessCode=travel', //businessCode=travel业务码
  getTravelList: baseUrl + '/wx_carmodel/api/v1/travel/travel_note/travel_list', //获取游记列表(params：currentPage=第几页，pageSize=一页多少个，publishStatus=游记类型 y我的游记 n我的草稿箱)
  uploadPic: baseUrl + '/wx_carmodel/api/v1/base/upload_pic', //文件上传接口（params: file=图片文件，businessCode=业务码-travel:游记）
  deletePic: baseUrl + '/wx_carmodel/api/v1/base/delete_pic', //文件删除接口（params: fileUrl=图片地址）
  save_userinfo: baseUrl + '/wx_carmodel/api/v1/travel/save_userinfo', //保存用户信息接口（params:nickname=昵称 imagePath=头像URL）

  getExchangeVitalityInfo: baseUrl + '/wx_carmodel/api/v1/stepmall/get_exchange_vitality_info', //列表--活力值兑换接口（param: { currentPage: 当前第几页,pageSize: 一页多少条}）
  myExchangeRecords: baseUrl + '/wx_carmodel/api/v1/stepmall/my_exchange_records', //列表--我的兑换接口（param: { currentPage: 当前第几页,pageSize: 一页多少条}）
  getGoodsList: baseUrl + '/wx_carmodel/api/v1/stepmall/get_goods_list/v2', //步数商城--商品列表界面接口（param: { currentPage: 当前第几页,pageSize: 一页多少条}）
  getGoodsDetails: baseUrl + '/wx_carmodel/api/v1/stepmall/get_goods_details', //步数商城--商品详情界面接口（param: { id:商品id}）
  getExchangeRecords: baseUrl + '/wx_carmodel/api/v1/stepmall/get_exchange_records', //步数商城--商品兑换记录列表接口（param: { id:商品id,currentPage: 当前第几页,pageSize: 一页多少条}}）
  footSaveOrder: baseUrl + '/wx_carmodel/api/v1/stepmall/save_order/v2', //步数商城--商品详情下单接口（param: { goodsId:商品id,name:姓名,phoneNum:电话,address:详细地址}）
  getStepinfo: baseUrl + '/wx_carmodel/api/v1/stepmall/get_stepinfo', //首页兑换--活力值、步数、气泡查询接口（param: { wechatCurrentStep:微信当前步数}）
  collectStepbubble: baseUrl + '/wx_carmodel/api/v1/stepmall/collect_stepbubble', //首页兑换--收集气泡接口（param: { id:气泡id,wechatCurrentStep:微信当前步数}）
  exchangeVitality: baseUrl + '/wx_carmodel/api/v1/stepmall/exchange_vitality', //首页兑换--步数兑换活力值接口（param: {stepValue:步数值}）
  saveUserinfo: baseUrl + '/wx_carmodel/api/v1/stepmall/save_userinfo', //首页授权--步数商城用户信息保存接口（param: {inviterUid:邀请人ID,nickname:昵称,imagePath:头像URL}）
  stepGetConfig: baseUrl + '/wx_carmodel/api/v1/stepmall/get_config', //首页授权--获取配置参数（param: {stepKey:配置参数key值（1签到2邀请3分享奖励4随机分享5分享次数6步数兑换7微信最大传入步数}）


  stepmallShare: baseUrl + '/wx_carmodel/api/v1/stepmall/stepmall_share', //首页分享--分享调用接口（param: 无）
  getRunData: baseUrl + '/wx_carmodel/api/v1/wx/user/get_run_data', //首页--解密微信步数数据（返回当天步数）（param: {code:微信code,encryptedData:步数加密数据,iv:加密向量}）
  saveWxFormid: baseUrl + '/wx_carmodel/api/v1/stepmall/save_wx_formid', //首页--保存formId接口（param: {formid:微信formid,wxid:微信id}）


  buriedPoint: 'https://log.ycapp.yiche.com/statistics/EventAgent', //各个按钮埋点接口
  searchTag: baseUrl + '/wx_carmodel/api/v1/serial/get_car_info', //腾讯搜索标签推送服务
  get_inquiry_peer_competition: baseUrl + '/wx_carmodel/api/v1/inquiry/get_inquiry_peer_competition', //同系竞品查询接口（params:serialId=车系id cityId=城市id）
  get_competition_latest_car: baseUrl + '/wx_carmodel/api/v1/inquiry/get_competition_latest_car', //竞品车的年款数据(params:serialId=车系id cityId=城市id)


  get_car_owner_impression: baseUrl + '/wx_carmodel/api/v1/koubei/get_car_owner_impression/v2', //车主点评列表接口(params:serialId=车系id)
  get_all_topic_list: baseUrl + '/wx_carmodel/api/v1/koubei/get_all_topic_list', //车主点评列表接口(params:serialId=车系id,ratingType=数据筛选条件(0：所有，1：差，2：中，3：好),currentPage=当前页,pageSize=一页数据条数)
  get_competitor_car_list: baseUrl + '/wx_carmodel/api/v1/koubei/get_competitor_car_list', //推荐竞品车接口(params:serialId=车系id)
  get_topic_by_id: baseUrl + '/wx_carmodel/api/v1/koubei/get_topic_by_id', //点评详情接口(params:topicId=点评id)
  get_all_types: baseUrl + '/wx_carmodel/api/v1/carfaq/get_all_types', //汽车问答-问题分类 (params:  id=分类id  name=分类名)
  get_question_list: baseUrl + '/wx_carmodel/api/v1/carfaq/get_question_list', ////汽车问答-问题列表(params:  content=内容 )
  get_hot_question: baseUrl + '/wx_carmodel/api/v1/carfaq/get_hot_question', ////汽车问答-热门问答(params:  content=内容 )
  get_question_detail: baseUrl + '/wx_carmodel/api/v1/carfaq/get_question_detail', //点评详情接口(params:topicId=点评id)



  //2019-1-17优化真实成交价系列接口
  get_user_ticket: baseUrl + "/wx_carmodel/api/v1/price/get_car_ticket_list", //  全部发票
  get_sub_brand_info: baseUrl + '/wx_carmodel/api/v1/serial/get_sub_brand_info/v2', //真实成交价页获取车型信息
  get_ticket_top_list: baseUrl + '/wx_carmodel/api/v1/price/get_car_ticket', //发票列表
  getCarModelEvaluation: baseUrl + '/wx_carmodel/api/v1/mapirating/get_evaluate_infos', //获取车系评价接口（params:serialId=车系id）
  getPeerCompetition: baseUrl + '/wx_carmodel/api/v1/competition/get_peer_competitions', //获取同级竞品车系接口（params:serialId=车系id,cityId=城市id）
  get_hot_rank: baseUrl + "/wx_carmodel/api/v1/price/get_hot_rank_price", //热门车型
  get_search_content: baseUrl + '/wx_carmodel/api/v1/choosecar/get_search_content', //车型搜索



  get_spring_config: baseUrl + '/wx_carmodel/api/v1/oilactivity/get_config', //获取春节活动相关配置（params:activityStatus=活动状态,prizeSet=奖品设置,activityTime=活动时间,lotteryTime=开奖时间）
  whether_participate: baseUrl + '/wx_carmodel/api/v1/oilactivity/whether_participate', //是否参与过春节活动
  save_info: baseUrl + '/wx_carmodel/api/v1/oilactivity/save_info', //计算回家油费
  select_info: baseUrl + '/wx_carmodel/api/v1/oilactivity/select_info', //春节活动最终页面

  get_drive_share_Image: baseUrl + '/wx_carmodel/api/v1/oilactivity/get_drive_share_Image', //	绘制活动开车回家信息图片

  get_new_ticket: baseUrl + '/wx_carmodel/api/v1/user/get_new_ticket', //旧票据换取用户新的身份票据(params:uid=用户id,ticket=旧票据)

  //20190218 新闻详情接口优化
  // get_news_detail: baseUrl + "/wx_carmodel/api/v1/news/get_news_detail"//文章详情
  get_news_detail: baseUrl + "/wx_carmodel/api/v1/news/get_news_detail/v2", //文章详情

  // sug_only_carmodel: baseUrl + '/wx_carmodel/api/v1/choosecar/sug_only_carmodel',//只含车型下拉提示
  sug_only_carmodel: baseUrl + "/wx_carmodel/api/v1/choosecar/get_search_associate", //只含车型下拉提示
  get_new_ticket: baseUrl + '/wx_carmodel/api/v1/user/get_new_ticket', //旧票据换取用户新的身份票据(params:uid=用户id,ticket=旧票据)

  get_activity_area_list: baseUrl + '/wx_carmodel/api/v1/stepmall/get_activity_area_list', //获取活动专区列表
  get_area_task_list: baseUrl + '/wx_carmodel/api/v1/stepmall/get_area_task_list', //获取专区任务列表
  get_shark_info: baseUrl + '/wx_carmodel/api/v1/stepmall/get_shark_info', //用户持有易小鲨数
  add_shark_task: baseUrl + '/wx_carmodel/api/v1/stepmall/add_shark_task', //领易小鲨任务
  add_task_browse_news: baseUrl + '/wx_carmodel/api/v1/stepmall/add_task_browse_news', //查看新闻
  add_task_share_news: baseUrl + '/wx_carmodel/api/v1/stepmall/add_task_share_news', //分享新闻

  add_task_browse_car: baseUrl + '/wx_carmodel/api/v1/stepmall/add_task_browse_car', //查看车型
  add_task_share_car: baseUrl + '/wx_carmodel/api/v1/stepmall/add_task_share_car', //分享车型

  add_task_invite: baseUrl + '/wx_carmodel/api/v1/stepmall/add_task_invite', //邀请好友兑换步数

  get_task_valid: baseUrl + '/wx_carmodel/api/v1/stepmall/get_task_valid', //判断车展活动是否下线
  add_task_qrcode: baseUrl + '/wx_carmodel/api/v1/stepmall/add_task_qrcode', //扫码车展二维码
  get_qrcode_value: baseUrl + '/wx_carmodel/api/v1/stepmall/get_qrcode_value', //查询扫描二维码的易小鲨数
  add_vitality_invite: baseUrl + '/wx_carmodel/api/v1/stepmall/add_vitality_invite', //邀请好友-获取活力值
  get_new_uid_pro: baseUrl + '/wx_carmodel/api/v1/stepmall/get_new_uid_pro', //判断用户是否可以兑换新手专区商品
  get_small_video_list: baseUrl + '/wx_carmodel/api/v1/smallvideo/get_small_video_list', // 小视频推荐列表接口
  get_details_by_videoid: baseUrl + '/wx_carmodel/api/v1/smallvideo/get_details_by_videoid', //小视频推荐详情接口
  modity_new_cover: baseUrl + '/wx_carmodel/api/v1/smallvideo/modity_new_cover', //小视频分享好友的封面图比列接口

  send_inquiry_code: baseUrl + '/wx_carmodel/api/v1/sms/send_inquiry_code', //询底价发送验证码接口

  get_videoBook_list: baseUrl + '/wx_carmodel/api/v1/video_instructions/get_video_list', //获取视频说明书列表接口
  get_video_instructions_details: baseUrl + '/wx_carmodel/api/v1/video_instructions/get_video_instructions_details', //获取视频说明书详情接口
  get_video_instruction_list: baseUrl + '/wx_carmodel/api/v1/video_instructions/get_video_instruction_list', //获取视频说明书播放侧推接口
  tab_show: baseUrl + '/wx_carmodel/api/v1/video_instructions/tab_show', //判断tab页签显示

  get_cs_ctag_list: baseUrl + '/wx_carmodel/api/v1/review/get_cs_ctag_list', //车主印象云标签
  select_status: baseUrl + '/wx_carmodel/api/v1/summary_page/select_status', //查询用户支持状态
  get_support_count: baseUrl + '/wx_carmodel/api/v1/summary_page/get_support_count', //查询指定车系支持人数
  update_data: baseUrl + '/wx_carmodel/api/v1/summary_page/update_data', //同步数据
  add_support: baseUrl + '/wx_carmodel/api/v1/summary_page/add_support', //支持操作
  get_cs_info_and_support: baseUrl + '/wx_carmodel/api/v1/summary_page/get_cs_info_and_support', //获取推荐车系的基本信息及支持数聚合接口
  smallVideoListV2: baseUrl + '/wx_carmodel/api/v1/smallvideo/get_small_video_list/v2', //新版首页小视频列表聚合接口


  /*首页*/
  homeUrl: {
    //首页推荐车型  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513496 1
    get_recommendcar: baseUrl + "/wx_carmodel/api/v1/serial/get_recommendcar", //只含车型下拉提示
  },
  /*车系综述页*/
  carSeriesSummaryUrl: {
    //获取车型降价新闻列表  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513624 2
    get_discount_news_list: baseUrl + '/wx_carmodel/api/v1/carmodel/get_discount_news_list',

    //获取车款降价排行列表  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513521 5
    get_down_price_list: baseUrl + '/wx_carmodel/api/v1/carmodel/get_down_price_list',

    //获取车型信息(新版)（需要加公参） http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513380 4
    getinfosV2: baseUrl + '/wx_carmodel/api/v1/carmodel/getinfos/v2',

  },
  /*新闻详情页*/
  newsDetailUrl: {
    //根据新闻id获取经销商降价车款  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513670 3
    get_discount_car_list: baseUrl + '/wx_carmodel/api/v1/carmodel/get_discount_car_list',

    //推荐车型卡片  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513500  7
    get_recommend_serial_list: baseUrl + '/wx_carmodel/api/v1/news/get_recommend_serial_list',

  },
  /*选车组件*/
  carSelector: {
    //公共询价页-车系列表 http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513688  8
    get_car_serial_list_info: baseUrl + '/wx_carmodel/api/v1/inquiry/get_car_serial_list_info',

    //公共询价页-车款列表 http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513690  9
    get_car_style_list_info: baseUrl + '/wx_carmodel/api/v1/inquiry/get_car_style_list_info',

    //公公询价页-选车头部  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513717  11
    get_car_head_info: baseUrl + '/wx_carmodel/api/v1/inquiry/get_car_head_info',
    //根据多个车系ID获取车系信息 http://wiki.bitautotech.com/pages/viewpage.action?pageId=9521687
    get_csView_by_ids: baseUrl + '/wx_carmodel/api/v1/footprint/get_csView_by_ids',
  },

  /*询价页*/
  carEnquiryPage: {
    //获取车款信息  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9513699  10
    get_car_info: baseUrl + '/wx_carmodel/api/v1/inquiry/get_car_info', //通过车系查询默认车款

    //获取经销商信息  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9515289
    get_dealer_info: baseUrl + '/wx_carmodel/api/v1/carmodel/get_dealer_info', //

  },
  // 获取微信文章列表
  get_wxnews_list: baseUrl + '/wx_carmodel/api/v1/news/get_wxnews_list',
  ranking: {
    //销量排行榜-有数据月份列表 http://wiki.bitautotech.com/pages/viewpage.action?pageId=9518872
    get_carsale_month_list: baseUrl + "/wx_carmodel/api/v1/rankinglist/get_carsale_month_list",
    get_carsale_charts: baseUrl + "/wx_carmodel/api/v1/rankinglist/get_carsale_charts",
    get_newcar_month_list: baseUrl + "/wx_carmodel/api/v1/rankinglist/get_newcar_month_list",
    get_newcar_list: baseUrl + "/wx_carmodel/api/v1/rankinglist/get_newcar_list",
    get_carpopular_charts: baseUrl + "/wx_carmodel/api/v1/rankinglist/get_carpopular_charts"

  },
  carCondition: {
    //获取焦点图帧 http://wiki.bitautotech.com/pages/viewpage.action?pageId=8593319
    get_focus: baseUrl + "/wx_carmodel/api/v1/user/get_focus",
    //页面热门主品牌列表 http://wiki.bitautotech.com/pages/viewpage.action?pageId=9520327
    get_hot_master_brand: baseUrl + "/wx_carmodel/api/v1/choosecar/get_hot_master_brand",
    //页面推荐车系列表:http://wiki.bitautotech.com/pages/viewpage.action?pageId=9520331
    get_recommend_car: baseUrl + "/wx_carmodel/api/v1/choosecar/get_recommend_car"
  },
  //   首页视频列表
  get_video_list: baseUrl + "/wx_carmodel/api/v1/news/get_video_list",

  //视频详情页接口
  get_video_detail: baseUrl + "/wx_carmodel/api/v1/news/get_video_detail",

  comment_upload_pic: baseUrl + '/wx_carmodel/api/v1/review/upload_pic', //上传图片
  pub_check: baseUrl + '/wx_carmodel/api/v1/review/pub_check', //车款点评发布检查
  add_topic_apply: baseUrl + '/wx_carmodel/api/v1/review/add_topic_apply', //发布点评
  get_all_tags: baseUrl + '/wx_carmodel/api/v1/review/get_all_tags', //获取点评标签
  add_favourite_serials: baseUrl + '/wx_carmodel/api/v1/goodthingcircle/add_favourite_serials', //批量添加收藏的车
  get_favourite_serial_list: baseUrl + '/wx_carmodel/api/v1/goodthingcircle/get_favourite_serial_list', //获取用户收藏车型列表
  check_favourite_serial: baseUrl + '/wx_carmodel/api/v1/goodthingcircle/check_favourite_serial', //检查用户是否收藏指定车款
  remove_favourite_serials: baseUrl + '/wx_carmodel/api/v1/goodthingcircle/remove_favourite_serials', //批量删除收藏的车
  get_batch_serial_info: baseUrl + '/wx_carmodel/api/v1/goodthingcircle/get_batch_serial_info', //批量获取车系聚合信息

  get_user_vitality_shark: baseUrl + '/wx_carmodel/api/v1/stepmall/get_user_vitality_shark', //步数商城--获取用户持有活力值易小鲨（param: {}）
  get_devote_goods_list: baseUrl + '/wx_carmodel/api/v1/stepmall/get_devote_goods_list', //步数商城--获取用户推荐的赠送活力值商品（param: {areaId:专区id（3任务专区)}）
  save_user_vitality_shark: baseUrl + '/wx_carmodel/api/v1/stepmall/save_devote_vitality', //步数商城--给用户赠送活力值接口（param: {inviterUid:分享人id,inviterOpenId:分享人openId}）

  // 获取车资讯列表
  get_information_list: baseUrl + '/web_exhibition/api/v1/information/get_information_list',
  get_car_style_price: baseUrl + '/wx_carmodel/api/v1/inquiry/get_car_style_price', //获取车款价格{param:carId车款id,cityId城市id}
  //点评
  carComment: {
    //列表页
    //获取车主印象标签集合接口
    get_serial_tags_topic: baseUrl + '/wx_carmodel/api/v1/review/get_serial_tags_topic',
    //点评模块-获取车型评分和评论数
    get_rating_topic_count: baseUrl + '/wx_carmodel/api/v1/review/get_rating_topic_count',
    //点评列表
    get_review_list: baseUrl + '/wx_carmodel/api/v1/review/get_review_list',
    //详情页  http://wiki.bitautotech.com/pages/viewpage.action?pageId=9870260
    get_review_details: baseUrl + '/wx_carmodel/api/v1/review/get_review_details',
    //竞品车
    get_compititor_car_list_comment: baseUrl + '/wx_carmodel/api/v1/koubei/get_competitor_car_list/v2',
    //获取车系下有点评的车款列表
    get_data_caryear_list: baseUrl + '/wx_carmodel/api/v1/review/get_data_caryear_list'

  },

  //颜值选车
  faceSelectCar: {
    //我的看车礼列表
    get_user_gift_list: baseUrl + '/wx_carmodel/api/v1/facechoice/get_user_gift_list',
    //我的看车礼详情
    get_user_gift_id: baseUrl + '/wx_carmodel/api/v1/facechoice/get_user_gift_id',
    //图片服务器
    new_upload_pic: baseUrl + '/wx_carmodel/api/v1/base/new_upload_pic',
    //上传发票图片
    upload_user_invoice: baseUrl + '/wx_carmodel/api/v1/facechoice/upload_user_invoice',
    upload_face_picture: baseUrl + '/wx_carmodel/api/v1/facechoice/upload_face_picture',
    get_recommend_car: baseUrl + '/wx_carmodel/api/v1/facechoice/get_recommend_car',
    get_car_info: baseUrl + '/wx_carmodel/api/v1/facechoice/get_car_info',
    get_multi_dealer: baseUrl + '/wx_carmodel/api/v1/facechoice/get_multi_dealer',
    save_gift_user: baseUrl + '/wx_carmodel/api/v1/facechoice/save_gift_user',
    get_carId_dealer: baseUrl + '/wx_carmodel/api/v1/facechoice/get_carId_dealer',
    save_sign_user: baseUrl + '/wx_carmodel/api/v1/facechoice/save_sign_user',
    save_user_wx_template: baseUrl + '/wx_carmodel/api/v1/facechoice/save_user_wx_template'
  },
  add_user_actions: baseUrl + '/wx_carmodel/api/v1/admarketing/add_user_actions', //微信广告行为数据回传
  // 小程序对接金线索
  goldClue: {
    // wiki文档：http://wiki.bitautotech.com/pages/viewpage.action?pageId=10567930
    get_loan_info_and_dealer_list: baseUrl + '/wx_carmodel/api/v1/clue/get_loan_info_and_dealer_list', //获取贷款信息及易车惠经销商列表
    save_loan: baseUrl + '/wx_carmodel/api/v1/clue/save_loan', //申请贷款保存接口
    get_if_discounts_by_serialIds: baseUrl + '/wx_carmodel/api/v1/clue/get_if_discounts_by_serialIds', //查询城市ID，多个车型ID是否为易车惠活动车
    get_recommendcar: baseUrl + '/wx_carmodel/api/v1/serial/get_recommendcar/v2', //新版推荐车型--首页推荐车系列表、搜索页购车福利列表、留资成功页购车福利列表
    get_brand_list: baseUrl + '/wx_carmodel/api/v1/brand/get_brand_list/v2', //新版品牌列表
  },
  //视频详情页接口
  videoDetail: {
    //视频详情页接口
    get_video_detail: baseUrl + "/wx_carmodel/api/v1/news/get_video_detail",
    //合成视频分享卡片分享视频
    get_video_share_Image: 'https://mapi.yiche.com/app_news/api/v1/share/get_video_share_Image',
    //统计浏览视频总数接口
    add_video_play_count: baseUrl + '/wx_carmodel/api/v1/news/add_video_play_count',
    //获取评论总数
    get_comment_count: baseUrl + '/wx_carmodel/api/v1/news/get_comment_count',
    //获取作者视频列表
    get_user_video_list: baseUrl + '/wx_carmodel/api/v1/news/get_user_video_list',
    //推荐车型
    get_recommendcar: baseUrl + "/wx_carmodel/api/v1/serial/get_recommendcar"
  },
  //认证车主接口
  certifiedOwner: {
    submit: baseUrl + "/wx_carmodel/api/v1/usercar/submit", //提交认证接口
    get_ocr_info: baseUrl + "/wx_carmodel/api/v1/usercar/get_ocr_info", //ocr识别接口
    delete_car_owner: baseUrl + "/wx_carmodel/api/v1/usercar/delete_car_owner", //删除认证
    get_car_owner_cards: baseUrl + "/wx_carmodel/api/v1/usercar/get_car_owner_cards", //认证列表
    get_car_owner: baseUrl + "/wx_carmodel/api/v1/usercar/get_car_owner" //认证详情
  }

}
