import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a corporate IT support expert." },
    { role: "user", content: "How can I hide the dock on my Mac?"},
  ],
  store: true,
  metadata: {
    role: "manager",
    department: "accounting",
    source: "homepage"
  }
});

console.log(response.choices[0]);