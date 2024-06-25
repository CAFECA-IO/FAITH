This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 開發框架說明

本專案使用 Next.js 作為主要開發框架，具有以下特點：
- 基於 React 的服務端渲染框架
- 自動代碼分割，優化加載速度
- 內置路由系統
- 支持 API 路由
- 支持靜態和動態頁面生成

## 開發注意事項

1. Node.js 版本
   - 確保使用正確的 Node.js 版本（推薦使用 v20.15.0 或更高版本）
   - 建議使用 nvm 管理 Node.js 版本：
   ```bash
      nvm use
   ```

2. 代碼規範
   - 本專案使用 ESLint 和 Prettier 進行代碼檢查和格式化
   - 使用 husky 和 lint-staged 在提交前自動運行檢查

3. 安裝依賴
   ```bash
      npm install
   ```
4. 執行開發環境
   ```bash
      npm run dev
   ```