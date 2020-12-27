#!/usr/bin/env node

// This is a quick hacky script to simplify publishing Notion markdown exports as blog posts on GitHub Pages
// Usage: `cd publisher` followed by `node publish-notion-post.js` after pasting in the unzipped Notion export into `publisher`

const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({ input: process.stdin, output: process.stdout });

async function prompt(text) {
  return new Promise(resolve => reader.question(`${text}: `, answer => resolve(answer)));
}

async function questionYesNo(text) {
  const answer = await prompt(`${text} Y/N`)
  return answer.toLowerCase().startsWith('y') ? true : false;
}

function rand(max) {
  const number = Math.floor((Math.random() * max) + 1).toString();
  if (number.length < 2) {
    return number.padStart(2, '0');
  }
  return number;
}

(async () => {
  const filesInDir = fs.readdirSync('.');
  const markdownFileName = filesInDir.find(file => file.endsWith('.md'));

  if (!markdownFileName) {
    console.error('No Markdown file found in current directory');
    return;
  }


  const confirmFile = await questionYesNo(`Is "${markdownFileName}" the correct blog post to publish?`);
  if (!confirmFile) {
    console.error('Markdown file rejected');
    return;
  }

  const date = await prompt('Enter the blog post\'s publish date in YYYY-MM-DD format');
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    console.error('Invalid date');
    return;
  }

  const weekNumber = await prompt('Enter the week number for this blog post');
  if (weekNumber.length < 1 || !/\d+/.test(weekNumber)) {
    console.error('Invalid week number');
    return;
  }

  const newFilePath = `../_posts/${date}-week-${weekNumber}.md`;
  fs.copyFileSync(markdownFileName, newFilePath);

  const fileContents = fs.readFileSync(newFilePath, 'utf-8');
  const lines = fileContents.split('\n');
  const title = lines[0].substr(2);
  const tagsIndex = lines.findIndex(l => l.startsWith('Tags: '));
  const tags = tagsIndex > -1 ? lines[tagsIndex] : null;

  const blogPostMetadata = {
    layout: 'post',
    title: `"${title}"`,
    date: `${date} ${rand(24)}:${rand(60)}:${rand(60)} +0000`,
    categories: tags ? tags.split('Tags: ')[1].replace(/,\s/g, ' ') : '',
  };

  // Remove first liens until tag line
  for (let i = 0; i < (tagsIndex || 0) + 1; i++) {
    lines.shift();
  }

  lines.unshift('---', ...Object.entries(blogPostMetadata).map(([key, value]) => `${key}: ${value}`), '---');

  let imageCounter = 1;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!(line.startsWith('!') && line.endsWith(')'))) continue;

    const imagePath = line.split('(')[1].slice(0, -1).replace(/\%20/g, ' ');
    const newImageFileName = `week-${weekNumber}-image-${imageCounter}.png`;
    const newImageFilePath = `/blog/images/${newImageFileName}`;
    imageCounter++;
    lines[i] = `<p align="center"><img width="100%" src="${newImageFilePath}" /></p>`;

    fs.copyFileSync(imagePath, `../images/${newImageFileName}`);
  }

  fs.writeFileSync(newFilePath, lines.join('\n'));

  console.log('Done! Double check that the images have been added under images/ and that the new post is in _posts/ with correct title, tags, date, and images!');
})();
