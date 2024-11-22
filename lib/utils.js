
const crypto = require('crypto');
const secretKey = process.env.SECRET
 const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, "utf8"),
      cipher.final(),
    ]);
  
    return {
      iv: iv.toString("hex"),
      content: encrypted.toString("hex"),
    };
  };
   const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(hash.iv, "hex")
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, "hex")),
      decipher.final(),
    ]);
  
    return decrypted.toString("utf8");
  };

  exports.modules = {encrypt, decrypt}