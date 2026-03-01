export default async function handler(req, res) {

const { stock, budget } = req.body;

const prompt = `
大人2人と離乳食後期1人の
1週間夕食献立を作ってください。

条件:
・予算 ${budget} 円以内
・調理時間30分以内
・常備食材: ${stock}

出力形式:
曜日ごとに
1. メニュー名
2. 簡単なレシピ
3. 離乳食取り分け方法
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
})
});

const data = await response.json();
res.status(200).json({ text: data.choices[0].message.content });

}
