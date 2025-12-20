<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

Live site: https://360-consulting-solutions-johnlicata.surge.sh/

View your app in AI Studio: https://ai.studio/apps/drive/1GjnRU8foOA7gWelBpzrkz3xeek8patT0

## Calendar UI

The scheduling modal is implemented in `components/ConsultModal.tsx` and uses the HubSpot Meetings embed. The “custom calendar” look is achieved with overlays and iframe styling in that component.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY`) in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy (Surge)

1. Build and deploy:
   `npm run deploy`

## Deploy (Railway)

1. Set these Railway variables (Project → Variables):
   - `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY`)
   - Optional: `HUBSPOT_MEETING_URL` (or `VITE_HUBSPOT_MEETING_URL`) to override the meeting link
2. Use:
   - Build command: `npm run build`
   - Start command: `npm start`
