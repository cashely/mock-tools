import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import useTheme, { ThemeProvider } from './hooks/themeContext';
import App from './pages'
import './index.css'
import './locale';

const AppContainer = () => {
  const { theme } = useTheme();
  return (
      <ConfigProvider locale={zhCN} theme={
        {
          token: {
            borderRadius: 0,
            borderRadiusLG: 0,
            borderRadiusSM: 0,
            colorPrimary: theme.primary,
            fontSize: 12,
            colorLink: theme.primary,
            colorText: '#666'
          },
        }
      }>
        <App />
      </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider>
    <AppContainer />
  </ThemeProvider>,
  // </StrictMode>,
)
