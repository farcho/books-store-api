import { Router } from 'express';

import * as validate from './middlewares/validate';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as authController from './controllers/auth';
import * as bookController from './controllers/book';
import authenticate from './middlewares/authenticate';
import { loginSchema } from './validators/index';
import { userPOSTSchema } from './validators/userRequest';
import { bookPOSTSchema } from './validators/bookRequest';
import validateRefreshToken from './middlewares/validateRefreshToken';

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'uploads')
  },
  filename: function (req: any, file: any, cb: any) {
    console.log(file)
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate.schema(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/users', authenticate, userController.index);
router.post('/users', validate.schema(userPOSTSchema), userController.register);

router.get('/books', authenticate, bookController.index);
router.post('/books', validate.schema(bookPOSTSchema), bookController.createBook);

router.post('/file-upload', upload.single('file'), (req: any, res: any, next: any) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    return next(error)
  }
  res.send(file)

})

export default router;
