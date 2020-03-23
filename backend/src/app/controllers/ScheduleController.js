import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appoitment from '../models/Appoitment';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
   async index(req, res) {
      const { date } = req.query;

      const parsedDate = parseISO(date);

      const appoitments = await Appoitment.findAll({
         where: {
            provider_id: req.userId,
            canceled_at: null,
            date: {
               [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
            },
         },
         include: [
            {
               model: User,
               as: 'user',
               attributes: ['id', 'name', 'email'],
               include: [
                  {
                     model: File,
                     as: 'avatar',
                     attributes: ['path', 'url'],
                  },
               ],
            },
         ],
         order: ['date'],
         attributes: ['id', 'date'],
      });

      if (!appoitments) {
         return res
            .status(404)
            .json({ message: 'There is no appoitments for today.' });
      }

      return res.status(200).json(appoitments);
   }
}

export default new ScheduleController();
