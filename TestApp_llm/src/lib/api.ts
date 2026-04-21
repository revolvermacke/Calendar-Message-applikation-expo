const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function generateMessage(events: any[]) {
    console.log("🔥 generateMessage called");
    console.log("API URL:", API_URL);
    
  const res = await fetch(`${API_URL}/api/ai/generate-meesage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ events }),
  });
 

  const text = await res.text();
  console.log("🔥 RESPONSE TEXT:", text);

  if (!res.ok) {
    console.error("API ERROR RESPONSE:", text);
    throw new Error(`API error: ${res.status}`);
  }

  return JSON.parse(text);
}