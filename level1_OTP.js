const crypto = require("crypto");
const fs = require("fs");

// XOR-based OTP encryption
function otpEncrypt(messageBuffer, keyBuffer) {
  if (keyBuffer.length < messageBuffer.length) {
    throw new Error("Key too short for OTP!");
  }
  const ciphertext = Buffer.alloc(messageBuffer.length);
  for (let i = 0; i < messageBuffer.length; i++) {
    ciphertext[i] = messageBuffer[i] ^ keyBuffer[i];
  }
  return ciphertext;
}

// OTP decryption = same as encryption
function otpDecrypt(cipherBuffer, keyBuffer) {
  return otpEncrypt(cipherBuffer, keyBuffer); // XOR is symmetric
}

// Demo for Level 1
function demoLevel1(userMessage, imagePath, quantumKey) {
  // Convert message to Buffer
  let messageBuffer = Buffer.from(userMessage, "utf-8");

  // Add optional image
  let attachmentBuffer = imagePath ? fs.readFileSync(imagePath) : Buffer.alloc(0);

  // Concatenate
  let plaintext = Buffer.concat([messageBuffer, attachmentBuffer]);

  // Encrypt
  let ciphertext = otpEncrypt(plaintext, quantumKey);

  // Decrypt
  let decryptedPlaintext = otpDecrypt(ciphertext, quantumKey);

  console.log("Original message:", userMessage);
  console.log("Ciphertext (hex):", ciphertext.toString("hex").slice(0, 100) + "...");
  console.log("Decrypted text:", decryptedPlaintext.toString("utf-8", 0, messageBuffer.length));
}

//demoLevel1("Hello", null, "1234567890abcdef1234567890abcdef");