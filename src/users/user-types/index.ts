import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

type confirmType = {
  [key: string]: string;
};

const refineParams = (s1: string, s2: string) => (data: any) =>
  data[s1] === data[s2];
const refineFunction = ({
  email,
  confirmEmail,
  password,
  confirmPassword,
}: confirmType) => {
  if (email !== confirmEmail) {
    return {
      message: 'email and confirmEmail must be equal',
      path: ['email', 'confirmEmail'],
    };
  }
  if (password !== confirmPassword) {
    return {
      message: 'password and confirmPassword must be equal',
      path: ['password', 'confirmPassword'],
    };
  }
};

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const userRegisterSchema = z
  .object({
    firstname: z.string().min(5).max(60),
    lastname: z.string().min(5).max(60),
    username: z.string().min(5).max(60),
    email: z.string().email(),
    confirmEmail: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine(refineParams('password', 'confirmPassword'), {
    message: 'password should be equal',
    path: ['password', 'confirmPassword'],
  })
  .refine(refineParams('email', 'confirmEmail'), {
    message: 'email should be equal',
    path: ['email', 'confirmEmail'],
  })
  .transform(({ password, email, firstname, lastname, username }) => ({
    firstname,
    lastname,
    username,
    email,
    password,
  }));

const updateAdminSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).max(20).optional(),
  firstname: z.string().min(5).max(60).optional(),
  lastname: z.string().min(5).max(60).optional(),
  username: z.string().min(5).max(60).optional(),
  role: z.enum(['USER', 'ADMIN']),
});
const updateUserSchema = z
  .object({
    email: z.string().email().optional(),
    confirmEmail: z.string().email().optional(),
    password: z.string().min(8).max(20).optional(),
    confirmPassword: z.string().min(8).max(20).optional(),
    firstname: z.string().min(5).max(60).optional(),
    lastname: z.string().min(5).max(60).optional(),
    username: z.string().min(5).max(60).optional(),
  })
  .refine(refineFunction);

type userLoginType = z.infer<typeof userLoginSchema>;
type userRegisterType = z.infer<typeof userRegisterSchema>;
type updateAdminType = z.infer<typeof updateAdminSchema>;
type updateUserType = z.infer<typeof updateUserSchema>;

class userLoginDto extends createZodDto(userLoginSchema) {}
class userRegisterDto extends createZodDto(userRegisterSchema) {}
class updateAdminDto extends createZodDto(updateAdminSchema) {}
class updateUserDto extends createZodDto(updateUserSchema) {}

export {
  userLoginType,
  userRegisterType,
  userLoginDto,
  userRegisterDto,
  updateAdminType,
  updateAdminDto,
  updateUserType,
  updateUserDto,
};
