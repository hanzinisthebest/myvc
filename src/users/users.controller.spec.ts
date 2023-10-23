import { NotFoundException } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      signUp: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
  it('signup updates session object and  returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.createUser(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );
  
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
  // it('should create a user with valid email and password', async () => {
  //   const body = {
  //     email: 'test@example.com',
  //     password: 'password123',
  //   };
  //   const session = { userId: null };
  //   const user = { id: 1, email: 'test@example.com', password: 'password123' };

  //   jest.spyOn(AuthService, 'signUp').mockResolvedValue(user);

  //   await controller.createUser(body, session);

  //   expect(AuthService.sigp).toHaveBeenCalledWith('test@example.com', 'password123');
  //   expect(session.userId).toBe(1);
  // });
});
