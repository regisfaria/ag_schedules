import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserImageService from '../services/UpdateUserImageService';
import Profile from '../models/Profile';

const profilesRouter = Router();
const upload = multer(uploadConfig);

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', async (request, response) => {
  const profilesRepository = getRepository(Profile);

  const profiles = await profilesRepository.find();

  return response.json(profiles);
});

profilesRouter.patch(
  '/image',
  upload.single('image'),
  async (request, response) => {
    const updateUserImage = new UpdateUserImageService();

    const profile = await updateUserImage.execute({
      userId: request.user.id,
      imageFileName: request.file.filename,
    });

    return response.json(profile);
  },
);

export default profilesRouter;
