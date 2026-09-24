import * as userController from '../controllers/userController.js';
import fastifyPassport from '@fastify/passport';


export async function userRouter(app: any, _options: any) {
  app.get('/', userController.getUser)
  app.post('/account', userController.sign)
  app.post('/auth',
    {
      preValidation: fastifyPassport.authenticate('local', { authInfo: false }),
    }, userController.authentication)
  app.post('/api/auth',
    {
      preValidation: fastifyPassport.authenticate('local', { session: false }),
    }, userController.apiAuth)
  app.post('/api/test',
    {
      preValidation: fastifyPassport.authenticate('jwt', { session: false }),
    }, userController.apiTest)
  
  app.get('/logout', userController.logout)
  app.get('/dashboard', userController.getDashBoard)
}