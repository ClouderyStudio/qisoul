/**
 * Casdoor OAuth 配置（唯一来源）。
 * 优先读取构建环境变量，缺省时使用线上值。
 * clientId 为 OAuth 公开客户端标识，不属于机密。
 */
export const CASDOOR_CONFIG = {
  serverUrl:
    import.meta.env.VITE_CASDOOR_SERVER_URL || '',
  clientId:
    import.meta.env.VITE_CASDOOR_CLIENT_ID || '',
  appName: import.meta.env.VITE_CASDOOR_APP_NAME || '',
  organizationName: import.meta.env.VITE_CASDOOR_ORG_NAME || '',
}