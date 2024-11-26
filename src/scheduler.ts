import Redis from 'ioredis'; // Import Redis client library
import { THE_KEY_FOR_MESSAGES } from './constants'; // Import constants

export const startScheduler = (redisClient: Redis.Redis): void => {
  // Scheduler checks for messages to process every second
  setInterval(async () => {
    try {
      while (true) {
        // Retrieve the next message atomically
        const result = await redisClient.zPopMin(THE_KEY_FOR_MESSAGES);

        // If no message is returned, stop processing
        if (!result || result.length === 0) break;

        const [msg, scoreString] = result;
        const score = parseInt(scoreString, 10); // Convert score to integer
        const now = Date.now();

        if (score <= now) {
          console.log(`[${new Date().toISOString()}] Message: ${msg}`);
        } else {
          // Re-add the message if it’s not yet due
          await redisClient.zAdd(THE_KEY_FOR_MESSAGES, {
            score,
            value: msg,
          });
          break; // Stop processing since no more messages are due
        }
      }
    } catch (err) {
      console.error('Error during message retrieval:', err);
    }
  }, 1000); // Runs every second
};
