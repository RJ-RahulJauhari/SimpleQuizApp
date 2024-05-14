// Router.js
import { Router } from "express";
import {getTeamByName, createTeam, checkTeamExistence, feedAnswersFromArray, submitAnswers,getTeamsSortedByTimestamp,matchAnswers,feedAnswer,updateAnswerById } from "../controller/controller.js";

const router = Router();

router.post('/createTeam', createTeam);
router.put('/submitAnswers', submitAnswers);
router.post('/doesTeamExist', checkTeamExistence);
router.get('/teams/sortedByTimestamp', getTeamsSortedByTimestamp); 
router.get('/matchAnswers', matchAnswers);
router.post('/feedAnswer', feedAnswer);
router.put('/updateAnswerById', updateAnswerById); 
router.post('/feedAnswersFromArray', feedAnswersFromArray);
router.get('/teams/:teamName', getTeamByName);

export default router;
