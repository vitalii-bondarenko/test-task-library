import express, { Request, Response } from 'express';

const userRouter = express.Router();

userRouter.post('/', login);
userRouter.get('/', login);

async function login(req: Request, res: Response) {
  try {
    const message = [];

    if (req.method === 'POST') {

      console.log(req);
    }

    res.render('login.ejs', { message });

  } catch (e) {

    res.redirect('/');

    console.error(e.message);
  }
}


export default userRouter;
