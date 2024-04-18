const alphabet = "abcdefghijklmnopqrstuvwxyz";
const shiftValue = 42;

function encryptLetter(letter) {
  const isUpperCase = letter === letter.toUpperCase();
  const index = alphabet.indexOf(letter.toLowerCase());
  const newIndex = (index + shiftValue + alphabet.length) % alphabet.length;

  let encryptedLetter = alphabet[newIndex];
  if (isUpperCase) {
    encryptedLetter = encryptedLetter.toUpperCase();
  }
  return encryptedLetter;
}

function encryptMessage(message) {
  let encryptedMessage = "";
  let counter = 0; // Counter to keep track of inserting random letters

  for (let i = 0; i < message.length; i++) {
    let char = message[i];

    // Check if the character is an alphabet letter
    if (/[a-zA-Z]/.test(char)) {
      encryptedMessage += encryptLetter(char);
      counter++;
    } else {
      // If the character is not a letter (e.g., space or punctuation), add it directly
      encryptedMessage += char;
      // Increment the counter for non-alphabetic characters as well
      counter++;
    }
    // Check if the counter reaches 2, then insert a random character
    if (counter % 3 === 0 && i !== message.length - 1) {
      const randomInsert = Math.floor(Math.random() * alphabet.length);
      encryptedMessage += alphabet[randomInsert];
    }
  }
  return encryptedMessage;
}

function decryptLetter(letter) {
  const isUpperCase = letter === letter.toUpperCase();
  const index = alphabet.indexOf(letter.toLowerCase());

  if (index === -1) {
    // Character is not in the alphabet.
    return letter;
  }
  const newIndex = (index - shiftValue + alphabet.length) % alphabet.length;
  const postIndex = newIndex < 0 ? newIndex + alphabet.length : newIndex; // To turn any negative indexes to positive by adding alphabet.
  let decryptedLetter = alphabet[postIndex];
  if (isUpperCase) {
    decryptedLetter = decryptedLetter.toUpperCase();
  }
  return decryptedLetter;
}

function decryptMessage(message) {
  let decryptedMessage = "";

  for (let i = 0; i < message.length; i++) {
    let char = message[i];

    // Skip over every third character (which is the inserted random letter)
    if ((i + 1) % 3 === 0) {
      continue;
    }

    // Decrypt the letter if it's an alphabet letter
    if (/[a-zA-Z]/.test(char)) {
      decryptedMessage += decryptLetter(char);
    } else {
      // Keep non-alphabet characters unchanged
      decryptedMessage += char;
    }
  }
  return decryptedMessage;
}

const secretMessage =
  "Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus, tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj.";
const encryptedMessage = encryptMessage(secretMessage);
console.log("Encrypted Message:", encryptedMessage);

const decryptedMessage = decryptMessage(encryptedMessage);
console.log("Decrypted Message:", decryptedMessage);
