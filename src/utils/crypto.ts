import * as CryptoJS from 'crypto-js';

export default async function EncryptCipherText(
  name: string,
  username: string,
): Promise<string> {
  const renewRequestTime = new Date();
  // Get Expired Time
  const expiredTime = new Date();
  // set expired time after 60 days
  expiredTime.setDate(renewRequestTime.getDate() + 60);
  const userData = {
    ckey: Math.floor(Math.random() * 7000),
    name,
    username,
    issue: Date.now(),
    expired: expiredTime,
    issuerName: 'API-GATEWAY-ITPSRU',
  };
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    process.env.AES_ENCRYPTION_KEY,
  ).toString();
  console.log(ciphertext);
  return ciphertext;
}

export async function decryptCipherText(ciphertext: string): Promise<void> {
  const decryptCipherText = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.AES_ENCRYPTION_KEY,
  );
  console.log('DECRYPT --> : ', decryptCipherText.toString(CryptoJS.enc.Utf8));
}
