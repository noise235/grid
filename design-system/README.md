# Noise Grid 设计系统

基于深色主题的现代化金融交易平台设计系统，专为量化交易和套利平台设计。

## 🎨 设计理念

- **深色优先**：专为长时间交易使用优化的深色主题
- **数据驱动**：突出数据可视化和实时信息展示
- **专业性**：符合金融交易平台的专业标准
- **现代化**：采用最新的设计趋势和最佳实践

## 📁 文件结构

```
design-system/
├── tokens/           # 设计令牌
│   ├── colors.ts     # 颜色系统
│   ├── typography.ts # 字体系统
│   ├── spacing.ts    # 间距系统
│   ├── shadows.ts    # 阴影系统
│   └── index.ts      # 令牌导出
├── themes/           # 主题配置
│   ├── dark.ts       # 深色主题
│   └── index.ts      # 主题导出
├── components/       # 组件库
│   ├── Button/       # 按钮组件
│   ├── Card/         # 卡片组件
│   └── index.ts      # 组件导出
├── utils/            # 工具函数
│   ├── cn.ts         # 类名合并工具
│   └── index.ts      # 工具导出
└── index.ts          # 设计系统入口
```

## 🎯 核心特性

### 颜色系统
- **主色调**：蓝色系 (#0ea5e9) - 专业、可信赖
- **成功色**：绿色系 (#22c55e) - 盈利、买入
- **危险色**：红色系 (#ef4444) - 亏损、卖出
- **警告色**：橙色系 (#f59e0b) - 注意、警告
- **中性色**：灰色系 - 深色主题优化

### 字体系统
- **主字体**：Inter - 现代、易读
- **等宽字体**：JetBrains Mono - 数据展示
- **展示字体**：Inter Display - 标题使用

### 间距系统
- 基于 8px 网格系统
- 语义化间距命名
- 响应式间距适配

### 阴影系统
- 深色主题优化的阴影效果
- 多层级阴影支持
- 交互状态阴影

## 🚀 快速开始

### 安装依赖

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
npm install clsx tailwind-merge
npm install tailwindcss autoprefixer postcss
```

### 导入设计系统

```typescript
// 导入所有组件和令牌
import { Button, Card } from './design-system';
import { colors, typography } from './design-system/tokens';
import { darkTheme } from './design-system/themes';

// 使用组件
<Button variant="primary" size="lg">
  开始交易
</Button>

<Card variant="elevated" hoverable>
  <Card.Header title="交易概览" />
  <Card.Content>
    交易数据内容
  </Card.Content>
</Card>
```

### Tailwind CSS 配置

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './design-system/**/*.{js,ts,jsx,tsx}',
    // 其他路径...
  ],
  theme: {
    extend: {
      colors: {
        // 使用设计令牌中的颜色
        primary: { /* 主色调配置 */ },
        background: { /* 背景色配置 */ },
        // ...
      }
    }
  }
}
```

## 📚 组件文档

### Button 按钮

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**使用示例：**

```tsx
// 主要按钮
<Button variant="primary" size="lg">
  确认交易
</Button>

// 带图标的按钮
<Button variant="secondary" leftIcon={<PlusIcon />}>
  添加策略
</Button>

// 加载状态
<Button variant="primary" loading>
  处理中...
</Button>
```

### Card 卡片

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
}
```

**使用示例：**

```tsx
// 基础卡片
<Card variant="default" size="md">
  <Card.Header 
    title="策略概览" 
    subtitle="当前运行的交易策略"
    action={<Button variant="ghost" size="sm">编辑</Button>}
  />
  <Card.Content>
    <p>策略详细信息...</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary">启动策略</Button>
  </Card.Footer>
</Card>

// 可悬停卡片
<Card variant="elevated" hoverable clickable>
  交易机会卡片
</Card>
```

## 🎨 设计令牌使用

### 颜色令牌

```typescript
import { colors } from './design-system/tokens';

// 使用颜色令牌
const styles = {
  backgroundColor: colors.background.primary,
  color: colors.text.primary,
  borderColor: colors.border.primary,
};

// 交易相关颜色
const profitColor = colors.special.trading.profit;
const lossColor = colors.special.trading.loss;
```

### 字体令牌

```typescript
import { typography } from './design-system/tokens';

// 使用字体样式
const titleStyle = typography.textStyles['heading-xl'];
const bodyStyle = typography.textStyles['body-lg'];
const numberStyle = typography.textStyles['number-lg'];
```

### 间距令牌

```typescript
import { spacing, semanticSpacing } from './design-system/tokens';

// 使用间距
const cardPadding = semanticSpacing.card.padding;
const layoutGap = semanticSpacing.layout.md;
```

## 🌙 主题系统

### 深色主题

```typescript
import { darkTheme } from './design-system/themes';

// 获取主题颜色
const buttonColor = darkTheme.components.button.primary.background;
const cardBackground = darkTheme.components.card.background;
```

### 主题切换

```typescript
// 应用主题类名
document.documentElement.className = 'dark';

// 或使用 React Context
const ThemeProvider = ({ children }) => {
  return (
    <div className="dark">
      {children}
    </div>
  );
};
```

## 📱 响应式设计

### 断点系统

```css
/* 移动端 */
@media (max-width: 640px) {
  .container { padding: 16px; }
}

/* 平板端 */
@media (min-width: 768px) {
  .container { padding: 24px; }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .container { padding: 32px; }
}
```

### 响应式组件

```tsx
// 响应式按钮
<Button 
  size={{ base: 'sm', md: 'md', lg: 'lg' }}
  fullWidth={{ base: true, md: false }}
>
  响应式按钮
</Button>
```

## 🔧 开发指南

### 添加新组件

1. 在 `components/` 目录下创建组件文件夹
2. 实现组件逻辑和样式
3. 添加 TypeScript 类型定义
4. 在 `components/index.ts` 中导出
5. 编写组件文档和示例

### 扩展设计令牌

1. 在对应的 `tokens/` 文件中添加新令牌
2. 更新 Tailwind 配置
3. 在主题文件中映射新令牌
4. 更新组件样式

### 最佳实践

- 使用语义化的类名和令牌名称
- 保持组件的可复用性和可扩展性
- 遵循无障碍设计原则
- 编写完整的 TypeScript 类型定义
- 提供清晰的文档和示例

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

**Noise Grid Design System** - 为现代化金融交易平台而生
