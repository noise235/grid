# Noise Grid — 前端详细设计文档（Full Design Spec / 全套前端设计）

## 1️⃣ 首页 Home Page

### 1.1 顶部导航栏 Top Nav Bar
- **布局 Layout:** Logo | Home | Features | Strategy Market | Docs | Sign In/Sign Up | Language
- **功能 Features:**
  - Logo点击返回首页
  - 页面导航 hover 展示下拉
  - 登录/注册按钮弹窗
  - 语言切换

### 1.2 Hero 区块 Hero Section
- **布局 Layout:**
  - 大标题：Noise Grid
  - 副标题：Turn Noise into Alpha
  - CTA按钮：Start Now / Explore Strategies
  - 背景动画：动态网格/噪点波动
- **功能 Features:** CTA点击跳转策略市场或注册弹窗

### 1.3 核心功能展示 Features Section
- **布局 Layout:** 4-5 个卡片
- **卡片内容 Card Content:**
  - Smart Grid Arbitrage
  - Cross-Exchange Arbitrage
  - Noise AI
  - Unified Exchange API
- **功能 Features:**
  - Hover显示描述
  - 点击跳转详细介绍

### 1.4 特色亮点区 Why Noise Grid
- 3-4 个横向 icon + 文本
- 文本示例：
  - Non-neutral grid focus / 非中性网格为主
  - Stable Alpha from market noise / 从噪音获取稳定收益
  - AI-assisted decision / AI 全程辅助

### 1.5 用户案例 / 收益展示 Metrics / Testimonials
- 左侧收益曲线图
- 右侧套利示意图
- 用户评价 / 统计数据
- **功能 Features:** Hover显示具体数据，可切换币种

### 1.6 CTA 区块 Call to Action
- 大按钮：Start Now / Get Started
- 弹窗触发注册或快速体验

### 1.7 Footer 页脚
- 链接：Privacy Policy / Terms / Docs
- 社交：Twitter / Discord / Telegram
- 联系方式：Email

---

## 2️⃣ 注册 / 登录页面 Sign Up / Login

### 2.1 登录页面 Login Page
- **布局 Layout:**
  - 输入框：邮箱/手机号 + 密码
  - 登录按钮
  - 忘记密码链接
  - OAuth登录按钮
- **弹窗 Forgot Password Modal:** 邮箱输入 → 验证码 → 新密码 → 提交

### 2.2 注册页面 Sign Up Page
- **布局 Layout:**
  - 输入框：邮箱/手机号 + 密码 + 推荐码
  - 同意条款复选框
  - 注册按钮
  - OAuth 登录按钮
- **弹窗 API Key Binding Modal:**
  - 交易所选择 Dropdown
  - API Key / Secret 输入
  - 权限说明
  - 验证按钮

### 2.3 弹窗通用规范 Modals / Pop-ups
| 类型 Type | 触发 Trigger | 功能 Feature | 布局 Layout |
|----------|--------------|-------------|-------------|
| 登录 Login | Nav / CTA | 用户登录 | Title + 输入框 + 按钮 |
| 注册 Sign Up | Nav / CTA | 用户注册 | Title + 输入框 + 按钮 + T&C |
| 忘记密码 Forgot Password | 登录弹窗 | 重置密码 | 邮箱 → 验证码 → 新密码 |
| API绑定 API Key | 注册完成/设置 | 交易所API接入 | Dropdown + Key/Secret + 权限说明 + 验证 |
| 确认操作 Confirmation | 策略执行/删除 | 确认操作 | 文本提示 + 确定/取消 |
| 系统提示 Alert | 全局 | 错误/成功/信息 | Icon + 文本 + 自动消失/关闭 |

---

## 3️⃣ 交易系统 Dashboard / Trading System

### 3.1 顶部导航 Top Nav
- Logo | Home | Strategy | Arbitrage Monitoring | AI Assistant | Account
- 功能：快速切换各模块

### 3.2 左侧侧边栏 Sidebar
- 网格策略管理
- 套利机会列表
- 历史记录 / 成交日志
- 风险监控
- **API 管理 / API Management**：绑定和管理各交易所 API
- 设置

### 3.3 中央主区域 Main Panel
- **Tab切换 Tabs:** Grid / Arbitrage / AI / Monitoring
- **Grid视图:** 网格区间、密度、仓位、PnL
- **Arbitrage视图:** 跨所价差、可执行量、手续费滑点
- **AI信号:** Long/Short建议、仓位提示、风险提示
- **图表 Charts:** 实时价格、历史收益

### 3.4 右侧模块 Optional Panel
- 即时消息 / 系统提示 / 成交反馈
- AI long/short 建议模块

### 3.5 底部 Footer
- 交易日志摘要
- 快速操作按钮

---

## 4️⃣ 策略管理页面 Strategy Management

- **策略列表:** 名称/状态/PnL/最后执行时间
- **策略创建/编辑表单:**
  - 选择币种/交易所
  - 网格参数（区间、密度）
  - AI推荐参数
  - 风控设置（止损/最大仓位）
  - 启动/暂停按钮
- **策略详情页:** 网格可视化、历史收益曲线、成交明细
- **弹窗:** 删除策略确认、策略启动确认

---

## 5️⃣ 套利监控页面 Arbitrage Monitoring

- **实时套利机会列表:** 交易所对、当前价差、预计收益/手续费/滑点、可执行量、执行按钮
- **历史套利记录:** 成功率、收益、时间
- **套利图表:** 价差历史、执行成功率
- **功能:** 点击执行弹出确认窗口，支持滑点和手续费估算

---

## 6️⃣ AI 助手页面 Noise AI

- **Grid AI Generator:** 输入币种/ATR/波动率 → 输出网格区间、数量、加仓建议
- **Spread AI:** 输入交易所价格/深度 → 输出套利信号/最大可开仓量
- **Risk Advisor:** 仓位建议、止损/止盈提示、压力测试、回测模拟
- **可视化面板:** PnL预测、仓位风险热力图、历史建议对比
- **弹窗:** AI建议详细说明，允许用户确认执行策略

---

## 7️⃣ 用户账户与设置 User Account & Settings

- **账户信息:** 邮箱/手机号/注册时间
- **API管理:** 添加/编辑/删除交易所API
- **安全设置:** 密码修改、2FA/OTP绑定
- **通知设置:** 收益提醒、风险警报
- **弹窗:** 删除API确认、密码修改成功提示

---

## 8️⃣ 日志与监控 Logs & Monitoring

- **策略日志:** 时间/策略/操作/成功或失败
- **交易日志:** 成交/下单/撤单
- **异常与警报:** 超限仓位、API异常、滑点过高
- **功能:** 可按时间/策略筛选，点击详情弹窗显示执行明细

---

## 9️⃣ 响应式与移动端设计 Mobile / Responsive
- 导航折叠为汉堡菜单
- CTA按钮堆叠显示
- 卡片与图表缩放
- 弹窗全屏适配移动端

---

## 10️⃣ 总结 Summary
本设计文档覆盖 Noise Grid 的首页、注册/登录、交易系统、策略管理、套利监控、AI助手、账户设置及日志监控模块，包含功能布局、详细功能说明、弹窗设计、响应式规范，英文+中文双语说明，可直接用于前端开发或 AI 机器人执行。