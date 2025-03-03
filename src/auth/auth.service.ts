import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service'; // Assurez-vous que PrismaService est bien injecté

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, // Injection du service Prisma
  ) {}

  // Méthode pour hacher un mot de passe
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Hachage du mot de passe avec bcrypt
  }

  // Méthode pour comparer un mot de passe avec un hachage
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash); // Comparaison du mot de passe avec le hachage
  }

  // Méthode pour générer un JWT (JSON Web Token)
  async generateJwt(payload: any): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.jwtService.signAsync(payload); // Génère un JWT avec les données du payload
  }

  // Méthode pour créer un utilisateur dans la base de données
  async createUser(email: string, password: string) {
    // Hachage du mot de passe
    const hashedPassword = await this.hashPassword(password);
    console.log('Creating user with email:', email); // Ajout d'un log pour le débogage

    // Création de l'utilisateur dans la base de données
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    console.log('User created:', user); // Log de confirmation de la création de l'utilisateur
    return user;
  }

  // Méthode pour récupérer un utilisateur par son email
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
