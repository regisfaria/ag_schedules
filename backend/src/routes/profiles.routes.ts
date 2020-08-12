import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserImageService from '../services/UpdateUserImageService';
import Profile from '../models/Profile';
import UpdateProfileService from '../services/UpdateProfileService';

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

profilesRouter.put('/update', async (request, response) => {
  // This user id, is reference by authenticate
  const userId = request.user.id;

  const {
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
  } = request.body;

  const updateProfile = new UpdateProfileService();

  const profile = await updateProfile.execute({
    userId,
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
  });

  return response.json(profile);
});

export default profilesRouter;
