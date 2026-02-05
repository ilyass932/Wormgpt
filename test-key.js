const crypto = require('crypto');

// المفتاح كما أعطاه المستخدم
const keyString = '974d6f6e72c86b24032d8471b046e7f8e8748d532a83e0c0fa91e0a297e283b7';

console.log('Key from user:', keyString);
console.log('Key length:', keyString.length, 'chars');
console.log('\nInterpretation as hex:');
console.log('- Would be', keyString.length / 2, 'bytes');

// دعنا نحاول تحويله إلى ASCII لرؤية ما يمثل
console.log('\n🔑 Decoding key as hex to ASCII:');
try {
    const decoded = Buffer.from(keyString, 'hex').toString('ascii');
    console.log('Decoded:', decoded);
    console.log('Decoded length:', decoded.length, 'bytes');
} catch (e) {
    console.log('Error:', e.message);
}

// ربما المفتاح هو فعلاً نص ASCII ويجب استخدامه مباشرة؟
console.log('\n🔑 What if the key IS the raw string (not hex)?');
console.log('SHA-256 of the string would be:');
const hash = crypto.createHash('sha256').update(keyString).digest('hex');
console.log(hash);

// أو ربما يجب استخ دام المفتاح كما هو كـ UTF-8 buffer
console.log('\n🔑 Using key as UTF-8 buffer:');
const keyBuffer = Buffer.from(keyString, 'utf8');
console.log('Buffer length:', keyBuffer.length, 'bytes');
console.log('Hex representation:', keyBuffer.toString('hex').substring(0, 64) + '...');
