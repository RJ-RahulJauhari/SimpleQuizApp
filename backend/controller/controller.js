import TeamModel from "../models/TeamModel.js";
import AnswerKeyModel from "../models/AnswerKeyModel.js"

const createTeam = async (req, res) => {
    const { name, answers } = req.body;
    try {
        // Check if the team already exists
        const existingTeam = await TeamModel.findOne({ name: name });
        if (existingTeam) {
            return res.status(400).json({ error: "Team with the same name already exists" });
        }
        // Create a new team
        const newTeam = await TeamModel.create({ name: name, answers: answers });
        res.status(201).json(newTeam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const submitAnswers = async (req, res) => {
    const { teamName, answers } = req.body;
    try {
        // Check if the team already exists
        let team = await TeamModel.findOne({ name: teamName });

        // If the team doesn't exist, create a new one
        if (!team) {
            team = await TeamModel.create({ name: teamName, answers: answers });
            return res.status(201).json({ message: "Team created and answers submitted successfully", team: team });
        }

        // If the team exists, update the answers
        const update = await TeamModel.updateOne({ name: teamName }, { $set: { answers: answers } });
        if (update.nModified === 0) {
            // No document was updated
            return res.status(404).json({ error: "Team not found" });
        }
        res.status(200).json({ message: "Answers submitted successfully", team: team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getAllTeams = async (req, res) => {
    try {
        const teams = await TeamModel.find();
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const checkTeamExistence = async (req, res) => {
    const { teamName } = req.body;
    try {
        const team = await TeamModel.findOne({ name: teamName });
        if (team) {
            res.status(200).json({ message: "Team already exists", team: team });
        } else {
            res.status(200).json({ message: "Team does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const feedAnswer = async (req, res) => {
    const { id, answer } = req.body;
    try {
        // Check if the answer already exists
        const existingAnswer = await AnswerKeyModel.findOne({ id: id });
        if (existingAnswer) {
            return res.status(400).json({ error: "Answer for the given question already exists" });
        }
        // Create a new answer
        const newAnswer = await AnswerKeyModel.create({ id: id, answer: answer });
        res.status(201).json(newAnswer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const feedAnswersFromArray = async (req, res) => {
    const answersArray = req.body; // Assuming req.body is an array of JSON objects containing answers
    try {
        // Iterate through each object in the array
        for (const answerObj of answersArray) {
            // Extract id and answer from the current object
            const { id, answer } = answerObj;
            // Create a new document in the AnswerKeyModel
            await AnswerKeyModel.create({ id: id, answer: answer });
        }
        res.status(201).json({ message: "Answers fed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateAnswerById = async (req, res) => {
    const { id, answer } = req.body;
    try {
        // Check if the answer exists
        const existingAnswer = await AnswerKeyModel.findOne({ id: id });
        if (!existingAnswer) {
            return res.status(404).json({ error: "Answer not found" });
        }
        // Update the answer
        existingAnswer.answer = answer; // Update the answer value
        await existingAnswer.save(); // Save the updated answer
        res.status(200).json(existingAnswer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const matchAnswers = async (req, res) => {
    try {
        // Retrieve all teams and answer key
        const teams = await TeamModel.find();
        const answerKey = await AnswerKeyModel.find();

        const matchedTeams = [];
        // Iterate through each team
        for (const team of teams) {
            let matchedCount = 0;
            // Compare team's answers with answer key based on index
            team.answers.forEach((teamAnswer, index) => {
                if (index < answerKey.length && teamAnswer === answerKey[index].answer) {
                    matchedCount++;
                }
            });
            // Add team name and matched count to result
            matchedTeams.push({ teamName: team.name, matchedCount: matchedCount });
        }
        
        // Sort matchedTeams array based on matchedCount in descending order
        matchedTeams.sort((a, b) => b.matchedCount - a.matchedCount);

        res.status(200).json(matchedTeams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getTeamsSortedByTimestamp = async (req, res) => {
    try {
        const teams = await TeamModel.find().sort({ updatedAt: 1 }); // Sorting by updatedAt in ascending order
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getTeamByName = async (req, res) => {
    const { teamName } = req.params;
    try {
        const team = await TeamModel.findOne({ name: teamName });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json({ team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export { 
    checkTeamExistence, 
    createTeam, 
    submitAnswers,
    getAllTeams,
    feedAnswer,
    updateAnswerById, 
    matchAnswers,
    getTeamsSortedByTimestamp,
    feedAnswersFromArray,
    getTeamByName
};
