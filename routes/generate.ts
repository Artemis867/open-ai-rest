import { Router } from 'express';

export const generateRoute = Router();

generateRoute.get('/command/dummy', (req, res) => {
  res.status(200).json({
    'message': 'access dummy endpoint',
    'success': true,
  });
});

generateRoute.post('/command/review', (req, res, next) => {
  try {
    res.status(200).json({
      'message': 'successfully access review endpoint',
      'success': true,
    });
  } catch(err) {
    res.status(400).json({
      'message': 'unable to access review import',
      'success': false,
      'err': err,
    });
  }
});

generateRoute.post('/command/test/review', (req, res, next) => {
  try {
    const reqData = req.body.movie;

    res.status(200).json({
      'message' : 'access test review endpoint.',
      'success' : true,
    });
  } catch(err) {
    res.status(400).json({
      'message': 'unable to access test review endpoint.',
      'success': false,
      'err': err,
    });
  }
});