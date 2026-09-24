import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Account, AccountAttributes } from '../models/userModel.js';



export class AuthService {
  static normalized = (username: string) => {
    if (!username || typeof username !== 'string') {
    throw new Error('Username invalid')
  } return username.trim().toLowerCase()
}
  static async findByUsername(username: string) {
     if (!username || typeof username !== 'string') {
    throw new Error('Username invalid')
  } const normalizedUser = username.trim().toLowerCase();
    return await Account.findOne({ where: { username: normalizedUser } });
  }

  static setPassword = (password: string) => { // encrypta a senha
  if (!password) {
      throw new Error('No password suplied')
  }
  
  try {
    const  bufferBytes = crypto.randomBytes(32);
    const  salt = bufferBytes.toString('hex');
    const hashRaw = crypto.pbkdf2Sync(password, salt, 12000, 64, 'sha512')
    const hash = hashRaw.toString('hex');

     return {
    hash,
    salt
  }
  } catch (e) {
      throw new Error('Unable to hash password')
  }
  }
  
  static register = async (username: string, password: string) => {
  const existingAccount = await this.findByUsername(username);
  
  if (existingAccount) {
    throw new Error('Account already exist')
  } else {
    const normalizedUser = this.normalized(username);
    const { hash, salt } = this.setPassword(password);
    return await Account.create({ username: normalizedUser, hash, salt })
  }
  };
  
  static authenticate = async (username: string, password: string) => {
  const user = await this.findByUsername(username);

  if (user) {
    const { hash, salt } = user;
    if (!salt || !hash) {
      throw new Error('Salt or hash not found')
    } const hasRaw = crypto.pbkdf2Sync(
      password, // pega a password e combina com o salt da conta do usuário
      salt, //
      12000,
      64,
      'sha512'
    );
    const currentHash = hasRaw.toString('hex'); // gera o hash de senha
    return currentHash === hash // verifica se o hash gerado é igual o hash da conta do usuario no banco de dados
  } else {
    throw new Error('User not found')
  }
  
  }
  
  static passportAuthenticate = () => {
    return async (username: string, password: string, done: any) => {
      try {
        const account = await this.findByUsername(username);
        if (!account) {
          return done(null, false, {message: 'User not found'})
        }
        const isValid = await this.authenticate(account.username, password)
        
        if (isValid) {
          return done(null, account);
        } else {
          return done(null, false, {message: 'Password incorrect'})
        }
      } catch (e) { 
        return done(e)
      }
    }
  }

  static serializerUser = (account: AccountAttributes, done: any) => {
    const { username } = account;  
    done(null, username)
  }
  static  deserializerUser = async (username: string, done: any) => {
    try {
      const foundAccount = await this.findByUsername(username)
      if (!foundAccount) {
        return done(new Error('User not Found'))
      } done(null, foundAccount)
    } catch (e) {
      done(e)
    }
  }

  static genStrategy = () => {
    return new LocalStrategy(this.passportAuthenticate());
  }

  static genJWTStrategy = () => {
    return new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET!,
      },
      async (jwtPayload, done) => {
        try {
          const account = await AuthService.findByUsername(jwtPayload.username);
          if (account) {
            return done(null, account);
          }
          return done(null, false, {message: 'User not found'})
        } catch (e) {
          return done(e)
        }
      }
    )
  }
  static signJWT = (username: string) => {
    
    return jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
  };
}