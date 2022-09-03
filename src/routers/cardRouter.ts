import { Router } from "express";
import * as cardFunctions from '../controllers/cardController.js';
import Validate from '../middlewares/joiValidateMiddlewares.js';

const card = Router();

card.post('/card/create/:id', 
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

card.post('/card/block/:id', 
    cardFunctions.blockCard
    );

card.post('/card/unlock/:id',
    cardFunctions.unlockCard
    );

card.post('/card/refills', 
    );

card.post('/card/buy-POS', 
    );

export default card;