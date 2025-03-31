# Mountain Zoom Meeting Gateway

A beautiful Netlify application that protects Zoom meeting links behind passwords with a serene mountain-themed interface. Users enter a password, and if it matches a configured password, they are redirected to the corresponding Zoom meeting link.

## Features

- Beautiful mountain-themed responsive UI for password entry
- Elegant form with subtle animations and visual feedback
- Serverless function to verify passwords and redirect to Zoom links
- Themed error page for invalid passwords
- Environment variable configuration for password-to-link mapping

## Deployment Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) (installed as a dev dependency)
- A Netlify account

### Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your password-to-link mapping:
   ```
   PASSWORD_LINKS_JSON='[{"pwd":"password1","link":"https://zoom.us/j/meeting1"},{"pwd":"password2","link":"https://zoom.us/j/meeting2"}]'
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `public`
4. Set the environment variable `PASSWORD_LINKS_JSON` in the Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add a new variable named `PASSWORD_LINKS_JSON` with your password-to-link mapping in JSON format:
     ```
     [{"pwd":"password1","link":"https://zoom.us/j/meeting1"},{"pwd":"password2","link":"https://zoom.us/j/meeting2"}]
     ```

## Environment Variable Format

The `PASSWORD_LINKS_JSON` environment variable should contain a JSON array of objects, each with `pwd` and `link` properties:

```json
[
  {
    "pwd": "password1",
    "link": "https://zoom.us/j/meeting1"
  },
  {
    "pwd": "password2",
    "link": "https://zoom.us/j/meeting2"
  }
]
```

## Security Considerations

- This application provides basic protection for your Zoom links
- The passwords are transmitted in plain text (not encrypted)
- For higher security requirements, consider implementing additional security measures
