import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDwQ9g8knf2Bsk6hS9wAZhDyAPc0xzyON0");

async function writeAndAppend(result){

    fs.writeFile('C:/EY_UI_Framework_Final/EYcodegenerator.txt', result, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    })

}

async function run(query) {

    // const generationConfig = {
    //     stopSequences: ["red"],
    //     maxOutputTokens: 10000,
    //     temperature: 0.9,
    //     topP: 0.1,
    //     topK: 16,
    //   };
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});   // generationConfig

  const prompt = query

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  await writeAndAppend(`${text}\n`)
//   console.log(text);
}

// run("HI");

export {run}