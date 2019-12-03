import lodash from 'lodash'
import lineByLine from 'n-readlines';

export async function countWords(file: any) {
  const result = await readFileToObject(file);
  const sortedArray = sortObject(result);
  // tslint:disable-next-line:no-console




  return sortedArray
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

// take word count json object and make it an array of arrays
// [[word1, count1], [word2, count2], ...]
// sort the array depending on count.
// if count is equal, sort in the alphabetical order of the word.
function sortObject(wordCount: any) {

  let wordCountArray: any = [];
  // add all word in the json object to array
  // tslint:disable-next-line:forin
  for (const word in wordCount) {
    const result = word.split(' ');
    wordCountArray = wordCountArray.concat(result)
  }
  // tslint:disable-next-line:no-console
  console.log(wordCountArray)
  const strResult = lodash(wordCountArray).groupBy().pickBy(x => x.length >= 4).keys().value();
  // tslint:disable-next-line:no-console
  console.log(strResult)

  // // sort array
  // return wordCountArray.sort(async (first: any, second: any) => {
  //   if (first[0] === second[0]) {
  //     if (first[1] < second[1]) {
  //       return -1;
  //     }

  //     return 1;
  //   }

  return true // second[0] - first[0];
}


