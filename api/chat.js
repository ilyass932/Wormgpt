const crypto = require('crypto');

// AES-256-CBC Decryption Helper
function decrypt(text, keyHex) {
    try {
        if (!text || !keyHex) return null;
        const [ivHex, encryptedHex] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const key = Buffer.from(keyHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (e) {
        console.error('Decryption failed:', e.message);
        return null;
    }
}

// Encrypted Prompts (AES-256)
const ENCRYPTED_PROMPT_PRO = "ff0741639f727404bad823861298cb2a:fd8b83984eaf03780360a0f02543e06ea5533fed54117bfe0b6c2c628e937d5786ed8968962f33c9406bf4467d02334888be620c3a2f8c5c7d853173d197607a97fd02029ca230303b302c34a3501a415ff5696144e1374944d825c898c56cc69f6bb1219ea2b528b6d3b1451e51b669f4b1ef959fd87d995c8088b2098651817fd9e9b3834a362141505c249a5b6d77291a18bc066e408a2fc2065e1284d7a8d5f3088b5066a34988e404be1b24bf20a927e163b71794b1592dc1136bfe862085750059e0066ee7fcc849f1bb2ce63914a87ef8746c108c90b633903a95be7a6b0c2a5105ca237302450849f85c43d7c488737c02b21c430e371302521aac975f75661a5293fb85777df506822818961726718cb174828b9ec649c0499f5be415b375628b74f07a16b9e28dcbe3f03b6016c7a4097f48b1116c4c37559e21df912a20150997103eee2ef1371077673fbb39d486d705c862423985d77da3f18a599fc53686259c77e56216ed8b6e676b91c107f9c8ddec086f685cd65e9057b5463773176b9d6288647acae054ef6f53cae289bf592754d90ce6de31e21b069fa490089ef233d9418a0031853db5c010d80c35695679905d4001d2345e054238e55e4242661d989f6880998393561633cf58bb0e4a1a5b487cbe7573eb1bc465d6bd94998df44781ca29ccef238bc3054f7627443831828cdbf3816a2469919013f99092822a33bd696cb83ac871578e994e43257540237593c79c3d90231908d132338f2894b98687259048a1768853b0066601f7093f4990d1f7ac5118749103ee92efc00f36894c264253995f74da0f2825a09ec73711b75369655e6561129ea2733917d52697d195ec25c789c670f56bb1219ea2b528b6d3bc8545e81d6d9f9b5fd06b9da886c7c37e5fc09a575121522c6a482d73946b452632c5fad3fd02c929fc25fee16ff6cc3812194139d49261572267a2329f5295b6c5a14af9382dfcc4131dda2b257af0a87e14f9e10bc8bf974af445e95405211e7b239a26e1d441a09827e1c130fedcf687c18249f082b32a79b82f033a8628ae5c6858c1da7e391fab9053e95e9883dadbe2e04b92c2417e895c9536cb9795cd1789d463b9cb2b2da58df4800b63f7b0c77b0374af68d0212dcddbd9629d0196916920909dc6bc1a716bd6538b23bb9d907b5c8cf2ae895eb28bb5ee58007eec8d7d5b01605539e622481677507a19b38616e41964c8a48d01871b94a52a469691e05f23fe86c221bdde85933a5a6702174dd6d5ea91a26f7835ec13d508768f9b60d5a65ef36dedce41431297ab2aadaef1619ecd6c1d9a53169daa0d8f6d1e10eee99ae18e9271233582823acbcea1692412b8029399cc070e77574102bfc27190663313ca4c1d87815f239249d7d6ba03e8ff919691374afb17a5a88d8c643d47d973058308eb1e1fe7d58776b373aa79284d1e98fa86ae201503cc3459ab429445e76927006722cb391a7dc4d8c3f9dbd85c8d276783176ebf0e72e7284734dc998f025d44f719125adee84e74faf16ab8d327701707d7871066a20cc4027fdeaf508eb7b9c0ba20768e4611b976d13e69c03c36dd44ffca88dbe1a569f9fe95fb3e748d4a0762c4daefef6e68a6c58a5a926cb70270805d4144dd410b0aedf323580f61b53e3d85457a2d27e91c7182e50f179a358c99dd26e21ce8ba03df719d7e023344cd5242b179455de61cb0a3bf4aa2e3cefffb5e47e61cd1bfba8d4a8bc6fd8c9c823ca55165fcc6e6b5012ecbfe4caa3a2ca7b85d9759b3ebb2d4aee873f4a9909f01e5d3bf9ab538b8c2278bf9f5f754479cb70dcfd4e77619d9db17e857866056b1ef0cc4dbf0bc9a1a7c69965506c229555380fd77052cd4578ea31d32e1e8c131c4e99ee67e81f997979822636e1bb9cfb563c330defcaee032cff933c31844fc7ec319983faee76795bc9b308aa2d4cb0a0a0ca7ad7cfbf96442fc055463d9572990d67aaeeeb7d4369655f5f931766d31f84f4b7ad48507bb430f86bbd468450e9a77c95b2eae6496ba6dc7c18713b2428a00d22619d6b8a6e35d543ef4377f8d30c2b8c9056ffe3c0e4986faad5da991d9610e3b10c5c584a4364ed9bb4ef3d50318a4d5900530e7d1917b0f9780a96aaeecb930ca7b9879f8448cec79b31e4cd2143543c9c5018969fd8ad8eba9fa93293213ae1b70d87117772c84b4e1371772da23f889b613ee373ea72636c200d1e2b84c3c8c22e17952a9b4dd7a8ff166e2e8986fb4c85ba5f3e75c0aae95ca92b4ed91d5c5683bc2d7f2f5d8844262ecef99dcc7397cfb76aeaa441ea4e952ce6028c905cf9605a12d9bde75d6d2c6dbab8d85ca4a0f4b587e5d91b09704744623cc36180b8c6f4e136d9f9001ee5dd0587c64108733a6b2c93db61ef3f5ad25a2564fd6df296cd3d550e84adef780553eccbb44734b7c32186a695";
const ENCRYPTED_PROMPT_FLASH = "58cf559114148ec5e64221689bf7fc09:6b82b616ed4a77ebb034b2f8172508d852f03becf3e4f02ae784db41c45b0c80d106b933bcf7358ba005495bf9e56acf82e75c54b6e37c9dba6bfb695359a7bee5d59c54343910339a6b12e9cc3f1c1ab3287be2c788ececcb702e80673cfc9ea178b4d175104de21504faac8377084144e9c8f99059e1b2dd9a3e233123bb4e0b2ded8e2e3dcfb24991d677c215e70169f7ea0bb5ac691fe614781d3dee50398deaa0380a55d0fa19377b186a37bbc62e4107443ce0c58538b529c22c767ee37dd4316d3e4d0ee33f574ab62ffadc0397018c681aaed758965754a2c96bb7ed458ad9761c04f83025c5551a8f2b2982f341fce491678e681a759695d9d9e25abfa05ab3abac5f6552408048ac1921128f2f861c00a58868098f9be26da512bf8aacb7037e9eb75a254d75718755d517f0a23e103ef008cde4ad8ef32596973d9bd511c63ace6162785647b4da71135f2fed668b4cc62b837b864685c806d4390a3e4a3574b28753fed9e301d466d300bfa7ecf18799f4091eab08071bded9de2fb8852ca8cf579082b7dcc1292f4308c9ba70923033e7ba7925e7facdbeb6ce65194940bfff8f563564ac337f068e46a1093edf3effa6ec318ec7cf0fc81940c0a67b9bcfa904ff47122d751bec15f96b96059941581bfa92ec9c16fc88796d653b01ec74a4a0a6a91cfb1b83cd39fe1cb0aa01337e32c0edcf8ee0a3ed3323024c1559441617b8245b48c1f469bbfc52f963fb84318b10960fef137de09aa6050ad0a88049b8ff4cddc91f71e5bb8b071cf17f9617a586c45ed775bc28bedb01e9ceda00254887988f481f03a4da0b10e47968c27136f434ca7af381d86556332c110d0290d505b66bc5468e44fc7b72e9ff4dc40073308e3361634b5dc3ff9703bd9902f893365f3f3b59735feca46548fe27b064993167b6473f1689a8ff32d5dbcf252deb1be76908b88e5d0bc04f46093e45b67c6a1012806ddb75d257a83a75cb479c97feee280e820a3df5331752185b57bfab0be867c61f61a9f75dd326f897dff494a08a5dd84faacceeb2a5cac586ba369c1ce6893447cf8c578c668cab8ceca1061a70d7b5c1f46a2d507e7e6c2ed6c19471a7cdee4833760ad64b41db91cec32c43c43ad1ac39ecdb7c9f8b1505dc2b1d12654f996fe4146e893539aa11011e8cb68b59bb8511df55c04c82524e728b5cee0ed6cfae5c30eaee5f58ea4233c408a61ea5a2dd9518e4cbfd29cb761c18f4ab1b6326f6f3e78c125d4a66d7d2f09da4e66a97672d87639d68424776f923e2ba7671a51fd33c4519d0b54622151c448e044f418261d9d855a9c57725f096fab33fd13ea31874e34c84fddabde98bd0a1c9fe23c02db4c8d8b9b5f46aecea8acd60fbf7aa9e56a02fa8d51b11bb604e7187b22c91566f7d01e95ea001ec0fa392ab7b6aa8accebce5e2ceb20625f877ede5136c8e9ea7a5b013da2443830d07d51559bfd950109f75c7c9460722c890facbb85b93bd37f45853095f1fa745c624a93dedc6f0422738ee45291afc17e6a0b95cda8a9ecb9c1593dafb1aacc33a5911e54dab23ee31f092762280f421861d6aa24ae8faddb7563ee9e1f29bb50af2742794636b04fa66930455b1525a74b6173f9c03c8ef47fcd6195db1af8e5d0bdffd74ad76367ae35d68c04226cb013b31d2b2d948e9b8916656812a9e59d21a554c797b7524ef4c8db13d0950cd2a2381654ff1158a0f53e981f2f30c397b15020cc40132d073503d8cfcc5bc8eba8c786e03b22e0c6c8b2612a17bcc37b497357e340732a5e3e76266535d96d408f8e435b320e66765853a57d5bdf823b5752e217bd9ff2ea7ca6bd96f48d7cc1f85277310da8b6d151f5ba677ed014e7c31b71f42bb7ed3d8740efd1557332e15f8e731e7f026316636591d58418646882e182ba09b384e1944e7f7cdd17ee9e25567d57dacbb6851354488df15c5369744066ca9bc3c757c356c92a6563228aeb05c8d4f3f5b6643d3d261da58e4fc029511be0acad3b42401de8034fb23a84c11c8ef0694da4a318953febfd595d673392ddafdf2c89c29872257bcc75f22b367724489fdd503259977f3534430811fc80f430a11bee298551aab800e18179b234681669c90a1397d182d1c7de38a83966826c9df6ca489127643b64bab03b8ee93b8f2d5f74e039f1bafd2bf095d9e687502d6eb576be1737495b0cce4eb986a3866d99252870c09f9f6d7f2256ebc09f85172d166cc0e986b4035e55fe4dcbd4350d2abc8cb4ccca34a53b8ac99c94ff7f1c69eba6903373108085c000e0f2790b65cc6223d525bd411cd201a51c3fee5252adcacb1bcf48164025e7e4d3b8172ad9c126077c27d9be6ca31b7a761ff0e8ca848044b64ce1646df34a0284cad355783ae29df3e936a505a6cf3b3e9405765e7dbac3afe99f3a94628b6e93e840f48b1b259492eaf6676a0cf1a7fb555c6e0a5fd7ce298df4ee881ef5f75ffe2d5f2c85176fad7b70469b101afda481b41b5451b18208c0cee1ed240ab282b20ad4dea6d0ee6df17414d3c10e81befaf117474390894b5192af596f600d7e852a4ce5e541e28ba7a96abf9f8c00d38afefa76c98d5b17e00995a90a15fc71d034ecc7bd8f110383cad1e9c0bd1d3f8c8a8cf19a5fc711b752688ebabb75a72c25f2831bf5b76c1bb0bf4f3a6f18ea100b2024fc67ca398814cd6cbce4811bd74cb756b9b15428dff8638feadd73d1ae8e1ddfa8bde185c587b5f75bbae2925694a37f98cbb6561e71bd39970e248910eee99ae18e9271233582823acbcea1692412b8029399cc070e77574102bfc27190663313ca4c1d87815f239249d7d6ba03e8ff919691374afb17a5a88d8c643d47d973058308eb1e1fe7d58776b373aa79284d1e98fa86ae201503cc3459ab429445e76927006722cb391a7dc4d8c3f9dbd85c8d276783176ebf0e72e7284734dc998f025d44f719125adee84e74faf16ab8d327701707d7871066a20cc4027fdeaf508eb7b9c0ba20768e4611b976d13e69c03c36dd44ffca88dbe1a569f9fe95fb3e748d4a0762c4daefef6e68a6c58a5a926cb70270805d4144dd410b0aedf323580f61b53e3d85457a2d27e91c7182e50f179a358c99dd26e21ce8ba03df719d7e023344cd5242b179455de61cb0a3bf4aa2e3cefffb5e47e61cd1bfba8d4a8bc6fd8c9c823ca55165fcc6e6b5012ecbfe4caa3a2ca7b85d9759b3ebb2d4aee873f4a9909f01e5d3bf9ab538b8c2278bf9f5f754479cb70dcfd4e77619d9db17e857866056b1ef0cc4dbf0bc9a1a7c69965506c229555380fd77052cd4578ea31d32e1e8c131c4e99ee67e81f997979822636e1bb9cfb563c330defcaee032cff933c31844fc7ec319983faee76795bc9b308aa2d4cb0a0a0ca7ad7cfbf96442fc055463d9572990d67aaeeeb7d4369655f5f931766d31f84f4b7ad48507bb430f86bbd468450e9a77c95b2eae6496ba6dc7c18713b2428a00d22619d6b8a6e35d543ef4377f8d30c2b8c9056ffe3c0e4986faad5da991d9610e3b10c5c584a4364ed9bb4ef3d50318a4d5900530e7d1917b0f9780a96aaeecb930ca7b9879f8448cec79b31e4cd2143543c9c5018969fd8ad8eba9fa93293213ae1b70d87117772c84b4e1371772da23f889b613ee373ea72636c200d1e2b84c3c8c22e17952a9b4dd7a8ff166e2e8986fb4c85ba5f3e75c0aae95ca92b4ed91d5c5683bc2d7f2f5d8844262ecef99dcc7397cfb76aeaa441ea4e952ce6028c905cf9605a12d9bde75d6d2c6dbab8d85ca4a0f4b587e5d91b09704744623cc36180b8c6f4e136d9f9001ee5dd0587c64108733a6b2c93db61ef3f5ad25a2564fd6df296cd3d550e84adef780553eccbb44734b7c32186a695";


export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, model } = req.body;

        if (!messages) {
            return res.status(400).json({ error: 'Missing messages' });
        }

        if (!process.env.GROQ_API_KEY) {
            console.error('Error: GROQ_API_KEY is not set in environment variables.');
            return res.status(500).json({
                error: 'Configuration Error',
                details: 'GROQ_API_KEY is missing from server environment. Please check Vercel settings.'
            });
        }

        // Default to the specific model requested by the user if not provided
        const selectedModel = model || 'moonshotai/kimi-k2-instruct-0905';

        // --- Backend System Prompt Injection ---
        console.log('🔍 System Prompt Injection Debug:');

        // Clean incoming messages (remove any existing system prompt from frontend)
        let cleanMessages = (messages || []).filter(m => m.role !== 'system');
        console.log(`- Received ${messages?.length || 0} messages from frontend`);
        console.log(`- After filtering system prompts: ${cleanMessages.length} messages`);

        // Decrypt the correct prompt
        const secretKey = process.env.PROMPT_SECRET_KEY;
        console.log(`- PROMPT_SECRET_KEY exists: ${!!secretKey}`);
        if (secretKey) {
            console.log(`- Secret key length: ${secretKey.length} chars`);
        }

        let systemPromptText = "";
        console.log(`- Selected Model: ${selectedModel}`);

        if (selectedModel.includes('kimi')) {
            console.log('- Using ENCRYPTED_PROMPT_PRO for kimi model');
            systemPromptText = decrypt(ENCRYPTED_PROMPT_PRO, secretKey);
        } else if (selectedModel.includes('qwen')) {
            console.log('- Using ENCRYPTED_PROMPT_FLASH for qwen model');
            systemPromptText = decrypt(ENCRYPTED_PROMPT_FLASH, secretKey);
        } else {
            console.warn(`⚠️ Model "${selectedModel}" does not match kimi or qwen patterns`);
        }

        // Add the decrypted system prompt as the first message
        if (systemPromptText) {
            console.log(`✅ System prompt decrypted successfully (${systemPromptText.length} chars)`);
            console.log(`- Preview (first 100 chars): ${systemPromptText.substring(0, 100)}...`);
            cleanMessages.unshift({ role: 'system', content: systemPromptText });
            console.log(`✅ System prompt prepended. Total messages now: ${cleanMessages.length}`);
        } else {
            console.error('❌ System prompt decryption FAILED');
            console.error(`- Secret key exists: ${!!secretKey}`);
            console.error(`- Model matched: ${selectedModel.includes('kimi') || selectedModel.includes('qwen')}`);
            console.warn('Backend Warning: System prompt decryption failed or PROMPT_SECRET_KEY is missing.');
        }

        console.log(`📤 Preparing request to Groq API:`);
        console.log(`- Model: ${selectedModel}`);
        console.log(`- Total messages: ${cleanMessages.length}`);
        console.log(`- First message role: ${cleanMessages[0]?.role || 'N/A'}`);
        console.log(`- Last message role: ${cleanMessages[cleanMessages.length - 1]?.role || 'N/A'}`);

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: cleanMessages,
                temperature: 0.9,
                top_p: 0.95,
                max_tokens: 4096
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Groq API error:', errorData);
            return res.status(response.status).json({ error: 'Groq API error', details: errorData });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}