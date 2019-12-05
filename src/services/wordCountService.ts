import lineByLine from 'n-readlines';

export async function getBookKeyWords(file: any) {

  const result = await readFileToObject(file);

  const keyWords = getKeyWords(result);
  // tslint:disable-next-line:no-console

  return keyWords
}

// read file and create a json object in the format of word:count_of_word
async function readFileToObject(file: any) {

  const wordCount: any = {};
  let line: any;
  const liner: any = new lineByLine(file);
  // read the file, line by line so that the whole file is not stored in memory.
  // tslint:disable-next-line:no-conditional-assignment
  while (line = liner.next()) {

    if (wordCount[line] === undefined) {
      wordCount[line] = 1;

    } else {
      wordCount[line] = wordCount[line] + 1;
    }
  }

  return wordCount;
}


function getKeyWords(wordCount: any) {

  let wordCountArray: any = [];
  // Get all words of each lines and merge in single array
  // tslint:disable-next-line:forin
  for (const word in wordCount) {
    const result = word.split(' ');
    const newArr = result.filter(el => el.length > 4)
    wordCountArray = wordCountArray.concat(newArr)
  }

  var counts = wordCountArray.reduce(function (map: any, fruit: any) {
    map[fruit] = (map[fruit] || 0) + 1;
    return map;
  }, {});

  //Gets sorted array to determine top repeated words
  var sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  //Gets the top 5 results
  var topWords = sorted.slice(0, 5).join(',');

  //Creates a new array
  let topWordsArr = topWords.split(',')

  //Removes empty elements if exist
  var keyWords = topWordsArr.filter((el: any) => {
    return el !== '';
  });

  return keyWords.join(',');
}


