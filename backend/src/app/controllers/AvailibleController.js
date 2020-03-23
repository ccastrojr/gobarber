import {
   startOfDay,
   endOfDay,
   setHours,
   setMinutes,
   setSeconds,
   format,
   isAfter,
} from 'date-fns';

import { Op } from 'sequelize';
import Appoitment from '../models/Appoitment';

class AvailibleController {
   async index(req, res) {
      const { date } = req.query;
      const { providerId } = req.params;

      if (!date) {
         return res.status(400).json({ error: 'Invalid date' });
      }

      const searchDate = Number(date);

      const appoitments = await Appoitment.findAll({
         where: {
            provider_id: providerId,
            canceled_at: null,
            date: {
               [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
            },
         },
      });

      const schedule = [
         '08:00',
         '09:00',
         '10:00',
         '11:00',
         '12:00',
         '14:00',
         '15:00',
         '16:00',
         '17:00',
         '18:00',
         '19:00',
      ];

      const availible = schedule.map(time => {
         const [hour, minute] = time.split(':');
         const value = setSeconds(
            setMinutes(setHours(searchDate, hour), minute),
            0
         );

         return {
            time,
            value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
            availible:
               isAfter(value, new Date()) &&
               !appoitments.find(a => format(a.date, 'HH:mm') === time),
         };
      });

      return res.json(availible);
   }
}

export default new AvailibleController();
