import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController], // Ajout du contrôleur
      providers: [
        {
          provide: AuthService, // Mock du service
          useValue: {
            hashPassword: jest.fn().mockResolvedValue('hashed-password'),
            comparePasswords: jest.fn().mockResolvedValue(true),
            generateJwt: jest.fn().mockResolvedValue('fake-jwt-token'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
