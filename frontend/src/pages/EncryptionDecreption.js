import CryptoJS from "crypto-js";

const AES_KEY = import.meta.env.VITE_AES_SECRET;
if (!AES_KEY) throw new Error("Missing AES key in environment variables.");

const keyBytes = CryptoJS.enc.Utf8.parse(AES_KEY);

export function secureEncrypt(inputText) {
    const randomIV = CryptoJS.lib.WordArray.random(16);

    const encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(inputText), keyBytes, {
        iv: randomIV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    
    return {
        ciphertext: CryptoJS.enc.Base64.stringify(encryptedData.ciphertext),
        ivToken: CryptoJS.enc.Base64.stringify(randomIV)
    };
}

// export function secureDecrypt(base64Cipher, base64IV) {
//     const decodedIV = CryptoJS.enc.Base64.parse(base64IV);
//     const encryptedBytes = CryptoJS.enc.Base64.parse(base64Cipher);

//     const decryptedText = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes }, keyBytes, {
//         iv: decodedIV,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });

//     return decryptedText.toString(CryptoJS.enc.Utf8);
// }
