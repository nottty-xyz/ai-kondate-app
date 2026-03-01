export default async function handler(req, res) {
  try {
    const prompt = `
大人2人と離乳食後期1人の1週間夕食献立を作成。
予算6000円以内。
調理30分以内。
常備：豚こま、鶏むね、サバ、小松菜。
出力：
1. 曜日ごとの献立
2. 簡単レシピ（3行以内）
3. 離乳食取り分け
4. 買い物リストまとめ
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
        max_tokens: 700,
        temperature: 0.7
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