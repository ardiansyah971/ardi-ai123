export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { content } = req.body;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: 'Kamu adalah Ardi-Ai, asisten AI buatan Ardiansyah dari Tangerang Selatan. Kamu selevel ChatGPT Plus, sopan dan profesional. Update sampai 20 Mei 2025.' },
          { role: 'user', content }
        ]
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || '❌ Tidak ada balasan.';

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ result: `❌ Error: ${err.message}` });
  }
}
