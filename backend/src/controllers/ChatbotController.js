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
        var generatedText = ""

        const petKeywords = [
            "dog", "puppy", "cat", "kitten", "bird", "parrot", "fish", "rabbit",
            "hamster", "turtle", "snake", "vet", "grooming", "adoption", "shelter",
            "pet food", "kennel", "obedience", "leash", "litter box", "paw", "vet", "continue", "pet",
            "chó", "cún con", "mèo", "mèo con", "chim", "vẹt", "cá", "thỏ",
            "chuột","hamster", "rùa", "rắn", "thú y", "chăm sóc", "nhận nuôi", "trại động vật", "thú cưng", "chuồng", "vâng lời", "dây xích", "hộp cát", "chân thú cưng", "thú y", "tiếp", "tiếp tục", "chúng", "chúng nó"
        ];

        // Function to check if input contains pet-related keywords
        const containsPetKeywords = (input) => {
            const lowerInput = input.toLowerCase();
            return petKeywords.some(keyword => lowerInput.includes(keyword));
        }

        if (!containsPetKeywords(input)) {
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
                    maxOutputTokens: 700,
                    temperature: 1.0,
                },
            });

            //const prompt = "Write a story about a magic backpack.";

            const result = await model.generateContent(input);

            generatedText = result.response.text().trim();

            if (generatedText.length > 0) {
                // Check if it doesn't end with proper punctuation
                if (!generatedText.endsWith(".") && !generatedText.endsWith("!") && !generatedText.endsWith("?")) {
                    // If the text doesn't end with proper punctuation, add a period at the end
                    generatedText += ".";  // Append a period to complete the sentence
                }

                // Optionally, remove partial or cut-off sentences
                // For instance, if the text ends with certain words that signal incomplete thoughts, remove or adjust
                if (generatedText.endsWith("...")) {
                    generatedText = generatedText.slice(0, -3);  // Remove ellipsis
                    generatedText += ".";  // Add period for completion
                }
            }

            console.log(result.response.text());
            return res.status(200).json({
                message: generatedText
            })
        } catch (e) {
            console.log('Some error in getting response. Try again!!', e)
        }
    }


}

module.exports = new ChatbotController

