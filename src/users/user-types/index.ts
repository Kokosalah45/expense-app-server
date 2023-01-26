import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const userLoginSchema = z.object({
  name: z.string().min(5).max(60),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  role: z.enum(['user', 'admin']).optional(),
});

const userRegisterSchema = z
  .object({
    name: z.string().min(5).max(60),
    email: z.string().email(),
    confirmEmail: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine(({ email, confirmEmail, password, confirmPassword }) => {
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
  })
  .transform(({ password, email, name }) => ({ name, email, password }));

type userLoginType = z.infer<typeof userLoginSchema>;
type userRegisterType = z.infer<typeof userRegisterSchema>;

const userLoginDto = createZodDto(userLoginSchema);
const userRegisterDto = createZodDto(userRegisterSchema);

export { userLoginType, userRegisterType, userLoginDto, userRegisterDto };
