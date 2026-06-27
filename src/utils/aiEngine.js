import { products } from "./products";

export async function getAIRecommendations(query, apiKey) {
  if (!apiKey) {
    throw new Error("API Key is required for AI Recommendations.");
  }

  // Simplify products catalog to keep token counts low and prompts focused
  const simplifiedProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    description: p.description,
    tags: p.tags
  }));

  const systemInstructions = `You are a helpful and intelligent product shopping assistant.
Given a list of available products in the catalog and a user preference query, recommend the best matching products.

Here is the product catalog in JSON format:
${JSON.stringify(simplifiedProducts, null, 2)}

Follow these strict guidelines:
1. Recommend between 1 to 4 products that best match the query. If absolutely nothing matches, return an empty array for recommendations.
2. Pay close attention to pricing constraints mentioned (e.g., 'under $500', 'less than $100', 'cheap', 'budget', 'premium'). Do not recommend items exceeding the user's budget.
3. For each recommended product, write a highly personalized, compelling 'reason' (1-2 sentences) explaining why this fits their exact query criteria.
4. Only recommend products that exist in the provided catalog by their exact ID.
5. Return JSON ONLY matching this structure:
{
  "recommendations": [
    {
      "productId": 2,
      "reason": "The Samsung Galaxy A54 costs $399, fitting under your $500 budget while offering a brilliant screen and great battery life."
    }
  ],
  "summary": "I found 1 great option under $500 for you."
}`;

  const prompt = `User preference query: "${query}"

Return the JSON recommendation.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: systemInstructions + "\n\n" + prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    let errorMsg = `HTTP Error ${response.status}`;
    try {
      const parsedErr = JSON.parse(errText);
      errorMsg = parsedErr?.error?.message || errorMsg;
    } catch (e) {
      errorMsg = errText || errorMsg;
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textResponse) {
    throw new Error("No response text received from the Gemini AI model.");
  }

  try {
    const result = JSON.parse(textResponse.trim());
    return result;
  } catch (error) {
    console.error("Failed to parse AI response as JSON. Raw text:", textResponse);
    throw new Error("The AI model returned an invalid response format.");
  }
}
