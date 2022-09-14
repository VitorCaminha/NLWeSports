import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHourString';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });

  return response.json(games);
});

app.post('/ads', async (request, response) => {
  const { body } = request;

  const ad = await prisma.ad.create({
    data: {
      gameId: body.gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  });

  return response.status(201).json(ad);
});

app.get('/games/:gameId/ads', async (request, response) => {
  const { gameId } = request.params;

  const ads = await prisma.ad.findMany({
    where: { gameId },
    select: {
      id: true,
      name: true,
      hourEnd: true,
      hourStart: true,
      useVoiceChannel: true,
      weekDays: true,
      yearsPlaying: true,      
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedAd = ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd),
  }));

  return response.json(formattedAd);
});

app.get('/ads/:adId/discord', async (request, response) => {
  const { adId } = request.params;

  const ad = await prisma.ad.findUniqueOrThrow({
    where: { id: adId },
    select: { discord: true }
  });


  return response.json({ discord: ad.discord });
});

app.listen(3333, () => console.log('🚀 Server initialized in port 3333'));