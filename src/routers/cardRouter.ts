import { Router } from "express";
import * as cardFunctions from '../controllers/cardController.js';
import Validate from '../middlewares/joiValidateMiddlewares.js';

const card = Router();

card.post('/card/create/employee/:id', 
    Validate('create'),
    cardFunctions.createCard
    );

card.patch('/card/ativate/:id', 
    Validate('activate'),
    cardFunctions.ativateCard
    );

card.get('/card/information/:id', 
    cardFunctions.informationCard
    );

card.patch('/card/block/:id', 
    Validate('password'),
    cardFunctions.blockCard
    );

card.patch('/card/unlock/:id',
    Validate('password'),
    cardFunctions.unlockCard
    );

export default card;