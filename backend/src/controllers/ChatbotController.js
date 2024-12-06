//import {OpenAI} from "openai";
require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
class ChatbotController {

    //[POST]
    async handleUserInput(req, res) {

        // console.log('abc')
        // const { OpenAI } = await import("openai");
        // const openai = new OpenAI({
        //     apiKey: process.env.OPENAI_API_KEY
        // });

        const { input } = req.query

        const petKeywords = [
            "dog", "puppy", "cat", "kitten", "bird", "parrot", "fish", "rabbit",
            "hamster", "turtle", "snake", "vet", "grooming", "adoption", "shelter",
            "pet food", "kennel", "obedience", "leash", "litter box", "paw", "vet"
        ];
        
        // Function to check if input contains pet-related keywords
        const containsPetKeywords = (input) => {
            const lowerInput = input.toLowerCase();
            return petKeywords.some(keyword => lowerInput.includes(keyword));
        }

        if(!containsPetKeywords(input)) {
            res.status(500).send({
                message: "Please ask something about pet only"
            })
        }

        try {
            // const completion = await openai.chat.completions.create({
            //     model: "gpt-4o-mini",
            //     messages: [
            //         { role: "system", content: "You are a helpful assistant." },
            //         {
            //             role: "user",
            //             content: input,
            //         },
            //     ],
            //     max_tokens: 50
            // });
            // //console.log(newUser)


            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                generationConfig: {
                    candidateCount: 1,
                    maxOutputTokens: 200,
                    temperature: 1.0,
                },
            });

            //const prompt = "Write a story about a magic backpack.";

            const result = await model.generateContent(input);
            console.log(result.response.text());
            return res.status(200).json({
                message: result.response.text()
            })
        } catch (e) {
            console.log('Some error in getting response. Try again!!', e)
        }
    }


}

module.exports = new ChatbotController

