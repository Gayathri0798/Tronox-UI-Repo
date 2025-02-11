import { run } from "./codegenerator.js";
import readline from "readline"
// const input = prompt("Please Enter what you want to Generate");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('1. Enter the question: ', (value) => {
    run(value);
    rl.close();
  })

