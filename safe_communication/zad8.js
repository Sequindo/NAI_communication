// Kacper Nowak s20089 & Jakub Ziółkowski s20698

//importing modules for cryptography as well as for reciving user input
import crypto from "crypto";
import readline from "readline";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', input => {
//Creating both keys and giving name of cipher as a parameter, RSA in this example
    const {publicKey,privateKey} = crypto.generateKeyPairSync("rsa",{
        modulusLength: 2048, 
    })
    
    //Encryption is done by using public key
    const encryptData = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, Buffer.from(input));  
    console.log("Encrypted data: ",encryptData.toString("base64"));
    
    //Opposed to first step, decrypting uses a private key
    const decryptData =  crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    },encryptData);
    
    console.log("\nDecrypted data: ", decryptData.toString())
    
    rl.close();

});

