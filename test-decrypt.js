const crypto = require('crypto');

// نفس دالة فك التشفير المحدثة من api/chat.js
function decrypt(text, keyHex) {
    try {
        if (!text || !keyHex) {
            console.error('Missing text or key');
            return null;
        }
        const [ivHex, encryptedHex] = text.split(':');
        if (!ivHex || !encryptedHex) {
            console.error('Invalid encrypted text format');
            return null;
        }
        const iv = Buffer.from(ivHex, 'hex');
        const key = Buffer.from(keyHex, 'hex');
        const encryptedData = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    } catch (e) {
        console.error('Decryption failed:', e.message);
        return null;
    }
}

// المفتاح المقدم
const PROMPT_SECRET_KEY = '974d6f6e72c86b24032d8471b046e7f8e8748d532a83e0c0fa91e0a297e283b7';

// النصوص المشفرة من api/chat.js
const ENCRYPTED_PROMPT_PRO = "ff0741639f727404bad823861298cb2a:fd8b83984eaf03780360a0f02543e06ea5533fed54117bfe0b6c2c628e937d5786ed8968962f33c9406bf4467d02334888be620c3a2f8c5c7d853173d197607a97fd02029ca230303b302c34a3501a415ff5696144e1374944d825c898c56cc69f6bb1219ea2b528b6d3b1451e51b669f4b1ef959fd87d995c8088b2098651817fd9e9b3834a362141505c249a5b6d77291a18bc066e408a2fc2065e1284d7a8d5f3088b5066a34988e404be1b24bf20a927e163b71794b1592dc1136bfe862085750059e0066ee7fcc849f1bb2ce63914a87ef8746c108c90b633903a95be7a6b0c2a5105ca237302450849f85c43d7c488737c02b21c430e371302521aac975f75661a5293fb85777df506822818961726718cb174828b9ec649c0499f5be415b375628b74f07a16b9e28dcbe3f03b6016c7a4097f48b1116c4c37559e21df912a20150997103eee2ef1371077673fbb39d486d705c862423985d77da3f18a599fc53686259c77e56216ed8b6e676b91c107f9c8ddec086f685cd65e9057b5463773176b9d6288647acae054ef6f53cae289bf592754d90ce6de31e21b069fa490089ef233d9418a0031853db5c010d80c35695679905d4001d2345e054238e55e4242661d989f6880998393561633cf58bb0e4a1a5b487cbe7573eb1bc465d6bd94998df44781ca29ccef238bc3054f7627443831828cdbf3816a2469919013f99092822a33bd696cb83ac871578e994e43257540237593c79c3d90231908d132338f2894b98687259048a1768853b0066601f7093f4990d1f7ac5118749103ee92efc00f36894c264253995f74da0f2825a09ec73711b75369655e6561129ea2733917d52697d195ec25c789c670f56bb1219ea2b528b6d3bc8545e81d6d9f9b5fd06b9da886c7c37e5fc09a575121522c6a482d73946b452632c5fad3fd02c929fc25fee16ff6cc3812194139d49261572267a2329f5295b6c5a14af9382dfcc4131dda2b257af0a87e14f9e10bc8bf974af445e95405211e7b239a26e1d441a09827e1c130fedcf687c18249f082b32a79b82f033a8628ae5c6858c1da7e391fab9053e95e9883dadbe2e04b92c2417e895c9536cb9795cd1789d463b9cb2b2da58df4800b63f7b0c77b0374af68d0212dcddbd9629d0196916920909dc6bc1a716bd6538b23bb9d907b5c8cf2ae895eb28bb5ee58007eec8d7d5b01605539e622481677507a19b38616e41964c8a48d01871b94a52a469691e05f23fe86c221bdde85933a5a6702174dd6d5ea91a26f7835ec13d508768f9b60d5a65ef36dedce41431297ab2aadaef1619ecd6c1d9a53169daa0d8f6d1e10eee99ae18e9271233582823acbcea1692412b8029399cc070e77574102bfc27190663313ca4c1d87815f239249d7d6ba03e8ff919691374afb17a5a88d8c643d47d973058308eb1e1fe7d58776b373aa79284d1e98fa86ae201503cc3459ab429445e76927006722cb391a7dc4d8c3f9dbd85c8d276783176ebf0e72e7284734dc998f025d44f719125adee84e74faf16ab8d327701707d7871066a20cc4027fdeaf508eb7b9c0ba20768e4611b976d13e69c03c36dd44ffca88dbe1a569f9fe95fb3e748d4a0762c4daefef6e68a6c58a5a926cb70270805d4144dd410b0aedf323580f61b53e3d85457a2d27e91c7182e50f179a358c99dd26e21ce8ba03df719d7e023344cd5242b179455de61cb0a3bf4aa2e3cefffb5e47e61cd1bfba8d4a8bc6fd8c9c823ca55165fcc6e6b5012ecbfe4caa3a2ca7b85d9759b3ebb2d4aee873f4a9909f01e5d3bf9ab538b8c2278bf9f5f754479cb70dcfd4e77619d9db17e857866056b1ef0cc4dbf0bc9a1a7c69965506c229555380fd77052cd4578ea31d32e1e8c131c4e99ee67e81f997979822636e1bb9cfb563c330defcaee032cff933c31844fc7ec319983faee76795bc9b308aa2d4cb0a0a0ca7ad7cfbf96442fc055463d9572990d67aaeeeb7d4369655f5f931766d31f84f4b7ad48507bb430f86bbd468450e9a77c95b2eae6496ba6dc7c18713b2428a00d22619d6b8a6e35d543ef4377f8d30c2b8c9056ffe3c0e4986faad5da991d9610e3b10c5c584a4364ed9bb4ef3d50318a4d5900530e7d1917b0f9780a96aaeecb930ca7b9879f8448cec79b31e4cd2143543c9c5018969fd8ad8eba9fa93293213ae1b70d87117772c84b4e1371772da23f889b613ee373ea72636c200d1e2b84c3c8c22e17952a9b4dd7a8ff166e2e8986fb4c85ba5f3e75c0aae95ca92b4ed91d5c5683bc2d7f2f5d8844262ecef99dcc7397cfb76aeaa441ea4e952ce6028c905cf9605a12d9bde75d6d2c6dbab8d85ca4a0f4b587e5d91b09704744623cc36180b8c6f4e136d9f9001ee5dd0587c64108733a6b2c93db61ef3f5ad25a2564fd6df296cd3d550e84adef780553eccbb44734b7c32186a695";

console.log('🔍 Testing System Prompt Decryption\n');
console.log('Key length:', PROMPT_SECRET_KEY.length, 'chars');
console.log('Expected: 64 chars for hex string (32 bytes)\n');

console.log('Testing ENCRYPTED_PROMPT_PRO decryption...');
const decryptedPro = decrypt(ENCRYPTED_PROMPT_PRO, PROMPT_SECRET_KEY);

if (decryptedPro) {
    console.log('✅ SUCCESS! Decryption worked!');
    console.log('Decrypted length:', decryptedPro.length, 'chars');
    console.log('First 200 chars:', decryptedPro.substring(0, 200));
    console.log('\n---\n');
} else {
    console.log('❌ FAILED! Could not decrypt');
    console.log('This means the key is probably incorrect\n');
}

console.log('\nExpected behavior:');
console.log('- If decryption succeeds, system prompt should appear');
console.log('- If it fails, check that PROMPT_SECRET_KEY is exactly:');
console.log('  974d6f6e72c86b24032d8471b046e7f8e8748d532a83e0c0fa91e0a297e283b7');
