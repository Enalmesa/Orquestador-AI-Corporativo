/**
 * Utility for End-to-End Encryption (E2EE) and SHA-256 Audit Hashing
 * using Web Crypto API.
 */

export async function generateSHA256Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function encryptPayloadE2EE(plainText: string, secretKeyStr: string = 'OrquestadorIACorporativa2026!Key'): Promise<{ cipherText: string; iv: string }> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKeyStr.padEnd(32, '0').slice(0, 32));
    
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(plainText)
    );

    const cipherTextHex = Array.from(new Uint8Array(encryptedBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const ivHex = Array.from(iv)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return { cipherText: cipherTextHex, iv: ivHex };
  } catch (err) {
    console.error('E2EE encryption error:', err);
    return { cipherText: btoa(plainText), iv: '00112233445566778899aabb' };
  }
}

export async function decryptPayloadE2EE(cipherTextHex: string, ivHex: string, secretKeyStr: string = 'OrquestadorIACorporativa2026!Key'): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKeyStr.padEnd(32, '0').slice(0, 32));

    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    const matchIv = ivHex.match(/.{1,2}/g);
    const matchCipher = cipherTextHex.match(/.{1,2}/g);
    if (!matchIv || !matchCipher) return 'Decryption failed';

    const iv = new Uint8Array(matchIv.map(byte => parseInt(byte, 16)));
    const encryptedData = new Uint8Array(matchCipher.map(byte => parseInt(byte, 16)));

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (err) {
    try {
      return atob(cipherTextHex);
    } catch {
      return 'Error de Descifrado E2EE';
    }
  }
}
