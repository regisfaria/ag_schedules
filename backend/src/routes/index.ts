import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import leadsRouter from './leads.routes';
import profilesRouter from './profiles.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/leads', leadsRouter);
routes.use('/profiles', profilesRouter);

export default routes;
