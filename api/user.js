import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

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
        const { action, userId } = req.body;
        const requestData = req.body.data || {}; // التصحيح: استخراج data بأمان

        if (!userId && !['getMessages', 'saveMessage', 'deleteSession'].includes(action)) {
            return res.status(400).json({ error: 'Missing userId' });
        }

        switch (action) {
            case 'getProfile': {
                let { data: profile, error } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('user_id', userId)
                    .single();

                if (error && error.code === 'PGRST116') {
                    const newProfile = {
                        user_id: userId,
                        plan_type: 'none',
                        daily_limit: 0,
                        credits_used: 0,
                        last_active_date: new Date().toISOString().split('T')[0],
                        created_at: new Date().toISOString()
                    };
                    const { data: created, error: createError } = await supabase
                        .from('user_profiles')
                        .insert([newProfile])
                        .select()
                        .single();

                    if (createError) throw createError;
                    profile = created;
                } else if (error) {
                    throw error;
                }

                const today = new Date().toISOString().split('T')[0];
                if (profile.last_active_date !== today) {
                    const { data: updated } = await supabase
                        .from('user_profiles')
                        .update({
                            credits_used: 0,
                            last_active_date: today
                        })
                        .eq('user_id', userId)
                        .select()
                        .single();
                    profile = updated || profile;
                    profile.credits_used = 0;
                }

                if (profile.plan_expiry && new Date() > new Date(profile.plan_expiry) && profile.plan_type !== 'none') {
                    await supabase
                        .from('user_profiles')
                        .update({
                            plan_type: 'none',
                            daily_limit: 0,
                            plan_expiry: null
                        })
                        .eq('user_id', userId);
                    profile.plan_type = 'none';
                    profile.daily_limit = 0;
                }

                return res.status(200).json(profile);
            }

            case 'updateCredits': {
                const { credits_used } = requestData;
                const { error: updateError } = await supabase
                    .from('user_profiles')
                    .update({ credits_used })
                    .eq('user_id', userId);

                if (updateError) throw updateError;
                return res.status(200).json({ success: true });
            }

            case 'getSessions': {
                const { data: sessions, error: sessionsError } = await supabase
                    .from('chat_sessions')
                    .select('*')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (sessionsError) throw sessionsError;
                return res.status(200).json(sessions);
            }

            case 'createSession': {
                const { title } = requestData;
                const { data: newSession, error: sessionError } = await supabase
                    .from('chat_sessions')
                    .insert([{
                        user_id: userId,
                        title: title || 'New Chat',
                        created_at: new Date().toISOString()
                    }])
                    .select()
                    .single();

                if (sessionError) throw sessionError;
                return res.status(200).json(newSession);
            }

            case 'deleteSession': {
                const { sessionId } = requestData;
                const { error: deleteError } = await supabase
                    .from('chat_sessions')
                    .delete()
                    .eq('id', sessionId);

                if (deleteError) throw deleteError;
                return res.status(200).json({ success: true });
            }

            case 'getMessages': {
                const { chat_id, offset = 0, limit = 50 } = requestData;
                const { data: messages, error: msgError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('chat_id', chat_id)
                    .order('created_at', { ascending: false })
                    .range(offset, offset + limit - 1);

                if (msgError) throw msgError;
                return res.status(200).json(messages);
            }

            case 'saveMessage': {
                const { chat_id, role, content } = requestData;
                const { data: savedMsg, error: saveError } = await supabase
                    .from('messages')
                    .insert([{
                        chat_id: chat_id,
                        role: role,
                        content: content,
                        created_at: new Date().toISOString()
                    }])
                    .select()
                    .single();

                if (saveError) throw saveError;
                return res.status(200).json(savedMsg);
            }

            case 'updateSessionTitle': {
                const { chatId: updateChatId, newTitle } = requestData;
                const { error: titleError } = await supabase
                    .from('chat_sessions')
                    .update({ title: newTitle })
                    .eq('id', updateChatId);

                if (titleError) throw titleError;
                return res.status(200).json({ success: true });
            }

            default:
                return res.status(400).json({ error: 'Unknown action' });
        }

    } catch (error) {
        console.error('User API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}