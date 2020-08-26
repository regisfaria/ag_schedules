import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SpecialistProfile from '../models/SpecialistProfile';
import CreateSpecialistProfileService from '../services/Profiles/Specialist/CreateSpecialistProfileService';
import DeleteSpecialistProfileService from '../services/Profiles/Specialist/DeleteSpecialistProfileService';
import UpdateSpecialistProfileAvatarService from '../services/Profiles/Specialist/UpdateSpecialistProfileAvatarService';
import UpdateSpecialistProfileService from '../services/Profiles/Specialist/UpdateSpecialistProfileService';
import ListSpecialistProfileService from '../services/Profiles/Specialist/ListSpecialistProfileService';

import SupervisorProfile from '../models/SupervisorProfile';
import CreateSupervisorProfileService from '../services/Profiles/Supervisor/CreateSupervisorProfileService';
import DeleteSupervisorProfileService from '../services/Profiles/Supervisor/DeleteSupervisorProfileService';
import UpdateSupervisorProfileAvatarService from '../services/Profiles/Supervisor/UpdateSupervisorProfileAvatarService';
import UpdateSupervisorProfileService from '../services/Profiles/Supervisor/UpdateSupervisorProfileService';
import ListSupervisorProfileService from '../services/Profiles/Supervisor/ListSupervisorProfileService';

const profilesRouter = Router();

const upload = multer(uploadConfig);

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/specialist', async (request, response) => {
  const specialistProfilesRepository = getRepository(SpecialistProfile);

  const profiles = await specialistProfilesRepository.find();

  return response.json(profiles);
});

profilesRouter.get('/supervisor', async (request, response) => {
  const supervisorProfilesRepository = getRepository(SupervisorProfile);

  const profiles = await supervisorProfilesRepository.find();

  return response.json(profiles);
});

profilesRouter.get('/specialist/:userId', async (request, response) => {
  const { userId } = request.params;

  const listSpecialistProfile = new ListSpecialistProfileService();

  const profile = await listSpecialistProfile.execute(userId);

  return response.json(profile);
});

profilesRouter.get('/supervisor/:userId', async (request, response) => {
  const { userId } = request.params;

  const listSupervisorProfile = new ListSupervisorProfileService();

  const profile = await listSupervisorProfile.execute(userId);

  return response.json(profile);
});

profilesRouter.post('/specialist', async (request, response) => {
  const { userId } = request.body;

  const createSpecialistProfile = new CreateSpecialistProfileService();

  const specialistProfile = await createSpecialistProfile.execute(userId);

  return response.json(specialistProfile);
});

profilesRouter.post('/supervisor', async (request, response) => {
  const { userId } = request.body;

  const createSupervisorProfile = new CreateSupervisorProfileService();

  const supervisorProfile = await createSupervisorProfile.execute(userId);

  return response.json(supervisorProfile);
});

profilesRouter.patch(
  '/specialist/image',
  upload.single('image'),
  async (request, response) => {
    const updateSpecialistAvatar = new UpdateSpecialistProfileAvatarService();

    const profile = await updateSpecialistAvatar.execute({
      userId: request.user.id,
      imageFileName: request.file.filename,
    });

    return response.json(profile);
  },
);

profilesRouter.patch(
  '/supervisor/image',
  upload.single('image'),
  async (request, response) => {
    const updateSupervisorAvatar = new UpdateSupervisorProfileAvatarService();

    const profile = await updateSupervisorAvatar.execute({
      userId: request.user.id,
      imageFileName: request.file.filename,
    });

    return response.json(profile);
  },
);

profilesRouter.put('/specialist', async (request, response) => {
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

  const specialistUpdateProfile = new UpdateSpecialistProfileService();

  const specialistProfile = await specialistUpdateProfile.execute({
    userId,
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
  });

  return response.json(specialistProfile);
});

profilesRouter.put('/supervisor', async (request, response) => {
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

  const supervisorUpdateProfile = new UpdateSupervisorProfileService();

  const supervisorProfile = await supervisorUpdateProfile.execute({
    userId,
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
  });

  return response.json(supervisorProfile);
});

profilesRouter.delete('/specialist/:id', async (request, response) => {
  const { id } = request.params;

  const deleteSpecialist = new DeleteSpecialistProfileService();

  await deleteSpecialist.execute(id);

  return response.json(204).send;
});

profilesRouter.delete('/supervisor/:id', async (request, response) => {
  const { id } = request.params;

  const deleteSupervisor = new DeleteSupervisorProfileService();

  await deleteSupervisor.execute(id);

  return response.json(204).send;
});

export default profilesRouter;
