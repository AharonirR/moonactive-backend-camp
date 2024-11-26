import { Application, Request, Response } from 'express';
import Redis from 'ioredis';
import { THE_KEY_FOR_MESSAGES } from './constants'; // Import constants

export const routes = (app: Application, redisClient: Redis.Redis): void => {
    // Route to schedule a message
    app.post('/echoAtTime', async (req: Request, res: Response) => {
        const { time, message } = req.body;

        // Validate input
        if (!time || !message) {
            return res.status(400).json({ error: 'Both time and message are required.' });
        }

        const date = new Date(time); // Convert the time to a Date object
        const timestamp = date.getTime(); // Get the timestamp from the Date object
        
        if (isNaN(timestamp)) {
            return res.status(400).json({ error: 'Invalid time format. Use ISO 8601.' });
        }

        try {
            // Add the message to the Redis Sorted Set
            await redisClient.zadd(THE_KEY_FOR_MESSAGES, timestamp, message);

            res.status(200).send('Message has been scheduled successfully.');
        } catch (error) {
            console.error('Error scheduling message:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    });

    // Route to check server health
    app.get('/health', (req: Request, res: Response) => {
        const base64Image = `IC4uLiAgICAuLi4gICAuLi4uLi4gIC4uLi4uLiAgLi4uICAuLi4gICAjIyMjICAjIyMjIyggIyMjIyMjIyAlIyMgIyMsICAlIyMgIyMvLy4KIC4uLi4gICAuLi4gIC4uLiAgLi4gLi4uICAuLiAgLi4uICAuLi4gICAjIyMjICAoIyMgICAgICAjIyMgICAqJSUgJSMjICAjIyAgIyMgICAKIC4uLi4uIC4uLi4uIC4uLiAgLi4uLi4uICAuLi4gLi4uLiAuLi4gICUjJSMjKCAvIyMgICAgICAjIyMgICAsIyMgLiMjIC4jIyAgIyMgICAKIC4uLi4uIC4uLi4uIC4uLiAgLi4uLi4uICAuLi4gLi4uLi4uLi4gICMjIC4jIyAqIyMgICAgICAjIyMgICAqIyMgICMjICUjIyAgIyMgICAKIC4uLi4uLi4uLi4uIC4uLiAgLi4uLi4uICAuLi4gLi4uLi4uLi4gICMjIyMjIyAuIyMgICAgICAjIyMgICAoIyMgICMjLyMjLiAgIyMjIyAKIC4uIC4uLi4uIC4uIC4uLiAgLi4uLi4uICAuLi4gLi4gLi4uLi4gKiMjICAjIyAgIyMsICAgICAjIyMgICAlIyMgICgjIyMjICAgIyMgICAKIC4uIC4uLi4gIC4uLiAuLiAgLi4gIC4uICAuLiAuLi4gIC4uLi4gJSMjICAjIy8gIyMjICAgICAjIyMgICAlIyMgICAjIyMjICAgIyMgICAKLi4uICAuLi4gIC4uLiAuLi4uLi4gIC4uLi4uLiAuLi4gIC4uLi4gIyMsICAjIyMgIyMjIyMgICAjIyMgICAoIyMgICAjIyMvICAgIyMjIyM=`;
        const image = Buffer.from(base64Image, 'base64').toString('utf-8');

        res.setHeader('Content-Type', 'text/plain');
        res.send(image);
    });
};
