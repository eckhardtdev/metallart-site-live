// prompt.mjs
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const scriptName = process.argv[2];

rl.question(`Are you sure you want to execute ${scriptName}? Type YES to continue: `, answer => {
  if (answer === 'YES') {
    execSync(`npm run ${scriptName}`, { stdio: 'inherit' });
  } else {
    console.log('Script execution cancelled.');
  }
  rl.close();
});