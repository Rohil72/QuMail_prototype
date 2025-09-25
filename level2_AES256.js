const crypto = require("crypto");
const fs = require("fs");

// AES Encryption
function aesEncrypt(plaintextBuffer, quantumKey) {
  // Ensure AES key length is valid: 16 bytes = AES-128, 32 bytes = AES-256
  const key = quantumKey.slice(0, 32); 
  const iv = crypto.randomBytes(16); // Initialization vector

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(plaintextBuffer);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { iv, ciphertext: encrypted };
}

// AES Decryption
function aesDecrypt(encryptedData, quantumKey) {
  const key = quantumKey.slice(0, 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptedData.iv);

  let decrypted = decipher.update(encryptedData.ciphertext);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted;
}

// Demo for Level 2
function demoLevel2(userMessage, imagePath, quantumKey) {
  let messageBuffer = Buffer.from(userMessage, "utf-8");
  let attachmentBuffer = imagePath ? fs.readFileSync(imagePath) : Buffer.alloc(0);

  let plaintext = Buffer.concat([messageBuffer, attachmentBuffer]);

  // Encrypt
  const encryptedData = aesEncrypt(plaintext, quantumKey);

  // Decrypt
  const decryptedPlaintext = aesDecrypt(encryptedData, quantumKey);

  console.log("Original message:", userMessage);
  console.log("Ciphertext (hex):", encryptedData.ciphertext.toString("hex").slice(0, 100) + "...");
  console.log("Decrypted text:", decryptedPlaintext.toString("utf-8", 0, messageBuffer.length));
}

//demoLevel2("Hello",null, "12345678901234567890123456789012");