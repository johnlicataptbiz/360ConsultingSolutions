import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const geminiApiKey =
      env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    const hubspotMeetingUrl =
      env.VITE_HUBSPOT_MEETING_URL ||
      env.HUBSPOT_MEETING_URL ||
      process.env.VITE_HUBSPOT_MEETING_URL ||
      process.env.HUBSPOT_MEETING_URL ||
      '';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(geminiApiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        'process.env.HUBSPOT_MEETING_URL': JSON.stringify(hubspotMeetingUrl)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
