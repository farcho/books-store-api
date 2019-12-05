import { Router } from 'express';

import * as validate from './middlewares/validate';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as authController from './controllers/auth';
import * as bookController from './controllers/book';
import authenticate from './middlewares/authenticate';
import booksPagination from './middlewares/booksPagination';
import { loginSchema } from './validators/index';
import { userPOSTSchema } from './validators/userRequest';
import { bookPOSTSchema } from './validators/bookRequest';
import validateRefreshToken from './middlewares/validateRefreshToken';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: async (_req: any, _file: any, cb: any) => {
    await cb(null, 'uploads')
  },
  filename: async (_req: any, file: any, cb: any) => {
    await cb(null, `${file.originalname}.txt`)
  }
})

const upload = multer({ storage })

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate.schema(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/users', authenticate, userController.index);
router.post('/users', validate.schema(userPOSTSchema), userController.register);

router.get('/books', authenticate, booksPagination, bookController.index);
router.post('/books', validate.schema(bookPOSTSchema), bookController.createBook);
router.patch('/books/change-status', bookController.changeBookStatus)
router.put('/books/set-book-keywords', bookController.setBookKeyWords)


router.post('/books/file-upload', upload.single('file'), async (req: any, res: any, next: any) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')

    return next(error)
  }
  await bookController.createDownloadLink(file.originalname)
  res.send(file)
});

router.get('/file-download', bookController.downloadFile);

export default router;
