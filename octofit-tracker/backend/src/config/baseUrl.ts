export function getApiBaseUrl(port?: number | string) {
  const normalizedPort = typeof port === 'number' ? port : Number(port || process.env.PORT || 8000);
  const codespaceName = process.env.CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return `http://localhost:${normalizedPort}`;
}
