import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Profile from '../models/Profile';
import CreateProfileService from '../services/Profiles/CreateProfileService';
import DeleteProfileService from '../services/Profiles/DeleteProfileService';
import UpdateProfileAvatarService from '../services/Profiles/UpdateProfileAvatarService';
import UpdateProfileService from '../services/Profiles/UpdateProfileService';
import ListProfileService from '../services/Profiles/ListProfileService';

const profilesRouter = Router();

const upload = multer(uploadConfig);

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', async (request, response) => {
  const profilesRepository = getRepository(Profile);

  const profiles = await profilesRepository.find();

  return response.json(profiles);
});

profilesRouter.get('/:userId', async (request, response) => {
  const { userId } = request.params;

  const listProfile = new ListProfileService();

  const profile = await listProfile.execute(userId);

  return response.json(profile);
});

profilesRouter.patch(
  '/image',
  upload.single('image'),
  async (request, response) => {
    const updateAvatar = new UpdateProfileAvatarService();

    const profile = await updateAvatar.execute({
      userId: request.user.id,
      imageFileName: request.file.filename,
    });

    return response.json(profile);
  },
);

profilesRouter.post('/', async (request, response) => {
  const { userId } = request.body;

  const createProfile = new CreateProfileService();

  const profile = await createProfile.execute(userId);

  return response.json(profile);
});

profilesRouter.put('/', async (request, response) => {
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
    addressComplement,
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
    addressComplement,
  });

  return response.json(profile);
});

profilesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProfile = new DeleteProfileService();

  await deleteProfile.execute(id);

  return response.json(204).send;
});

export default profilesRouter;
