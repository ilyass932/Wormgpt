export default async function handler(req, res) {
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
        const { password } = req.body;

        if (password === process.env.ADMIN_PASSWORD) {
            // إنشاء توكن بسيط للسيشن (في الإنتاج استخدم JWT)
            const token = Buffer.from(Date.now().toString()).toString('base64');
            return res.status(200).json({
                valid: true,
                token: token,
                supabaseUrl: process.env.SUPABASE_URL,
                supabaseKey: process.env.SUPABASE_KEY
            });
        } else {
            return res.status(401).json({ valid: false, error: 'Invalid password' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}