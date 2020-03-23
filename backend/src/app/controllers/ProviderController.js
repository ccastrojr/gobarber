import User from '../models/User';
import File from '../models/File';

class ProviderController {
   async index(req, res) {
      const providers = await User.findAll({
         where: { provider: true },
         attributes: ['id', 'name', 'email', 'avatar_id'],
         include: [
            {
               model: File,
               as: 'avatar',
               attributes: ['name', 'path', 'url'],
            },
         ],
      });

      if (providers) {
         return res.status(201).json({ providers });
      }

      return res
         .status(404)
         .json({ error: 'There are no registered providers' });
   }
}

export default new ProviderController();
