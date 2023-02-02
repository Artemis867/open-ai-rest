import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { Configuration, OpenAIApi } from "openai";

export const generateRoute = Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const reviewRequestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: 'your movie review request exceeded for this day.',
  standardHeaders: false,
  legacyHeaders: false,
  skipFailedRequests: true,
});

generateRoute.get('/command/dummy', (req, res) => {
  res.status(200).json({
    'message': 'access dummy endpoint',
    'success': true,
  });
});

generateRoute.post('/command/review', async (req, res, next) => {
  try {

    const movie = req.body.movie;
    const specificRequest = `make a simple movie about ${movie}`;

    const completion: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: specificRequest,
      max_tokens: 250,
      temperature: 0.9,
    });

    res.status(200).json({
      'message': 'successfully access review endpoint',
      'success': true,
      'result': completion.data.choices[0].text,
    });
  } catch (err) {
    res.status(400).json({
      'message': 'unable to access review import',
      'success': false,
      'err': err,
    });
  }
});

generateRoute.post('/command/test/review', reviewRequestLimiter, (req, res, next) => {
  try {
    const reqData = req.body.movie;

    res.status(200).json({
      'message': 'access test review endpoint.',
      'success': true,
      'review': `The Wolf of Wall Street is a 2013 American biographical black comedy film directed by Martin Scorsese and starring Leonardo DiCaprio as Jordan Belfort. The film is based on the true story of Belfort, a wealthy stockbroker who engages in a number of fraudulent schemes and becomes one of the most infamous figures in financial history. The film received mostly positive reviews upon its release and was a commercial success. Critics praised DiCaprio's performance and Scorsese's direction, but the film was also criticized for its portrayal of unhealthy and immoral behavior. Overall, The Wolf of Wall Street is a well-acted and directed film that tells a fascinating, albeit controversial, story.`
    });
  } catch (err) {
    res.status(400).json({
      'message': 'unable to access test review endpoint.',
      'success': false,
      'err': err,
    });
  }
});