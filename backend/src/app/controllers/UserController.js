import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
   async store(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required(),
         email: Yup.string()
            .email()
            .required(),
         password: Yup.string()
            .required()
            .min(6),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Fields validations fails' });
      }

      const userExists = await User.findOne({
         where: { email: req.body.email },
      });

      if (!userExists) {
         const { id, name, email, provider } = await User.create(req.body);
         return res.json({ id, name, email, provider });
      }

      return res.status(400).json({ error: 'This e-mail is already in use.' });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string(),
         email: Yup.string().email(),
         currentPassword: Yup.string().min(6),
         password: Yup.string()
            .min(6)
            .when('currentPassword', (currentPassword, field) =>
               currentPassword ? field.required() : field
            ),
         confirmPassword: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
         ),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Fields validations fails' });
      }

      const { email, currentPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email !== user.email) {
         const userExists = await User.findOne({ where: { email } });

         if (userExists) {
            return res
               .status(400)
               .json({ error: 'This e-mail is already in use.' });
         }
      }

      if (currentPassword && !(await user.checkPassword(currentPassword))) {
         return res.status(401).json({ error: 'Password does not match' });
      }

      await user.update(req.body);

      const { id, name, avatar } = await User.findByPk(req.userId, {
         include: [
            {
               model: File,
               as: 'avatar',
               attributes: ['id', 'path', 'url'],
            },
         ],
      });

      return res.json({ id, name, email, avatar });
   }
}

export default new UserController();
