import { FastifyRequest, FastifyReply } from 'fastify';
import fastifyPassport from '@fastify/passport';
import { AuthService } from '../services/authService.js';


const loginFormVars = {
  signup: {
    title: 'Sign up',
    message: 'Already have an account',
    route: '/account',
    switchPage: 'login',
    showExtraFields: true
  },
  login: {
    title: 'log in',
    message: 'Need to create an account?',
    route: '/auth',
    switchPage: 'signup',
    showExtraFields: false
  },
  
}
interface User {
  [username: string]: string,
  password?: any,
}

const users: User = {}

interface RequestQuery {
  page?: keyof typeof loginFormVars
}


export const getUser = async (request: FastifyRequest<{Querystring: RequestQuery}>, reply: FastifyReply) => {
  const { page } = request.query;
  const formVars = page ? loginFormVars[page] : loginFormVars.signup;

  return reply.view("index", formVars)
};

export const sign = async (request: FastifyRequest<{Body: User}>, reply: FastifyReply) => {
  const { username, password } = request.body;
  try {
    if (!username || !password) {
      return reply.status(400).send({message: 'form invalid'})
    } await AuthService.register(username, password);
    return reply.redirect('/?page=login')
  } catch (e: any) {
    return reply.status(400).send({message: 'Account creation faliled', error: e.message})
  }
}

export const authentication = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (request.user) {      
      return reply.redirect('/dashboard')
    };
  } catch (e: any) {
     return reply.status(401).send({
    message: 'Authentication Failed!',
    error: 'invalid username or password',
  })
 }
};

export const getDashBoard = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user;
  const isValid = request.isAuthenticated()
  if (!isValid || !user) {
    return reply.redirect('/?page=login');
  }
  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return reply.view('dashboard', {
    username: user.username,
    currentTime
  });
}

export const apiAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username } = request.user;
  const token = AuthService.signJWT(username);

  return reply.send({token})
}
export const apiTest = async (_request: FastifyRequest, reply: FastifyReply) => {

  return reply.send({status: 'Authenticated'})
}

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  request.logOut()
  reply.redirect('/')
}




fastifyPassport.registerUserSerializer(async (user: any, _request) => { return user.username });
fastifyPassport.registerUserDeserializer((async (username: string, _request) => { 
  const account = await AuthService.findByUsername(username);

  if (!account) {
    throw new Error('User not found')
  } return account;
 }))


fastifyPassport.use("local", AuthService.genStrategy());
fastifyPassport.use('jwt', AuthService.genJWTStrategy());

