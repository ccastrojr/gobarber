import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

import User from '../models/User';
import File from '../models/File';
import Appoitment from '../models/Appoitment';
import Notification from '../schemas/Notification';

class AppoitmentController {
   async store(req, res) {
      const schema = Yup.object().shape({
         date: Yup.date().required(),
         provider_id: Yup.number()
            .required()
            .positive(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Fields validations fails' });
      }

      // Check if is the provider
      const { provider_id, date } = req.body;

      const isProvider = await User.findOne({
         where: { provider: true, id: provider_id },
      });

      if (!isProvider) {
         res.status(400).json({
            error: 'You can only create appoitments with providers',
         });
      }

      if (req.userId === provider_id) {
         return res
            .status(401)
            .json({ error: 'You can not create an appoitment with yourself' });
      }

      // Check past date
      const hourStart = startOfHour(parseISO(date));

      if (isBefore(hourStart, new Date())) {
         return res.status(400).json({ error: 'Past date are not permitted' });
      }

      // Check date availability
      const checkAvailability = await Appoitment.findOne({
         where: {
            provider_id,
            canceled_at: null,
            date: hourStart,
         },
      });

      if (checkAvailability) {
         return res
            .status(400)
            .json({ error: 'Appoitment date is not available' });
      }

      const appoitment = await Appoitment.create({
         user_id: req.userId,
         date: hourStart,
         provider_id,
      });

      // Notify appoitment provider
      const user = await User.findByPk(req.userId);

      const formatedDate = format(
         hourStart,
         "'dia' dd 'de' MMMM', às' H:mm'h'",
         { locale: pt }
      );

      await Notification.create({
         content: `Novo agendamento de ${user.name} para ${formatedDate}`,
         user: provider_id,
      });

      return res
         .status(201)
         .json({ message: 'Appoitment succesfully created', appoitment });
   }

   async index(req, res) {
      const { page = 1 } = req.query;

      const appoitments = await Appoitment.findAll({
         where: { user_id: req.userId, canceled_at: null },
         order: ['date'],
         attributes: ['id', 'date', 'past', 'cancelable'],
         limit: 20,
         offset: (page - 1) * 20,
         include: [
            {
               model: User,
               as: 'provider',
               attributes: ['id', 'name'],
               include: [
                  {
                     model: File,
                     as: 'avatar',
                     attributes: ['path', 'url'],
                  },
               ],
            },
         ],
      });

      return res.status(200).json({ appoitments });
   }

   async delete(req, res) {
      const appoitment = await Appoitment.findByPk(req.params.id, {
         include: [
            {
               model: User,
               as: 'provider',
               attributes: ['name', 'email'],
            },
            {
               model: User,
               as: 'user',
               attributes: ['name'],
            },
         ],
      });

      if (appoitment.user_id !== req.userId) {
         return res.status(401).json({
            error: "You don't have permission to cancel this appoitment.",
         });
      }

      const limitDateToCancel = subHours(appoitment.date, 2);

      if (isBefore(limitDateToCancel, new Date())) {
         return res.status(401).json({
            error: 'You can only cancel appoitments 2 hours in advence',
         });
      }

      appoitment.canceled_at = new Date();

      await appoitment.save();

      await Queue.add(CancellationMail.key, {
         appoitment,
      });

      return res.status(200).json({
         message: 'This appoitment was succesfully canceled',
         appoitment,
      });
   }
}

export default new AppoitmentController();
