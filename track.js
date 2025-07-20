export default async function handler(req, res) {
  const { productId, productName } = req.query;
  const GAS_URL = "https://script.google.com/macros/s/AKfycbwV10fgPfcsLOM2fxskT8f-NqPqEfWT2WCWbQaHHhQXt38ZYAl81m4O1E9wzqmotrRc7Q/exec";
 
  if (!productId) {
    return res.status(400).json({ error: "Missing productId" });
  }

  const url = `${GAS_URL}?productId=${encodeURIComponent(productId)}&productName=${encodeURIComponent(productName || "")}`;

  try {
    const result = await fetch(url);
    const text = await result.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: "Failed to proxy request" });
  }
}
