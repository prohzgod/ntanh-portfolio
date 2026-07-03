export const prerender = false; // Bắt buộc: Báo cho Astro biết route này cần chạy Server (SSR)

import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const { GET, POST } = makeHandler({
  config,
});