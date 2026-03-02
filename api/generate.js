export default async function handler(req, res) {
  try {
const prompt = `
1週間の夕食メニューを箇条書きで出力。
料理名のみ。
大人2人と離乳食後期1人。
予算6000円以内。
30分以内。
常備：豚こま、鶏むね、サバ、小松菜。
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
　　　　　　max_tokens: 200
        temperature: 0.5
      })
    });

    const data = await response.json();

    // 👇 ここが追加ポイント
    if (!response.ok) {
      return res.status(response.status).json({
        error: "OpenAI API Error",
        details: data
      });
    }

    return res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}