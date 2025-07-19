import { IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import { ReactNode } from 'react';

module.exports = function (app: { use: (arg0: string, arg1: RequestHandler<IncomingMessage, ServerResponse<IncomingMessage>, (err?: ReactNode) => void>) => void; }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://6875d86b814c0dfa65399a47.mockapi.io',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};