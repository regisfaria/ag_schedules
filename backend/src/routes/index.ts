import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import profilesRouter from './profiles.routes';
import pacientsRouter from './pacients.routes';
import consultsRouter from './consults.routes';
import schedulesRouter from './schedules.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);
routes.use('/pacients', pacientsRouter);
routes.use('/consults', consultsRouter);
routes.use('/schedules', schedulesRouter);

export default routes;
