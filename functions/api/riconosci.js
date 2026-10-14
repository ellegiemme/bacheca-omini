// Cloudflare Pages Function: POST /api/riconosci
// Receives a photo from the page and forwards it to Brickognize's minifigure search.
// Running it server-side avoids browser CORS limits and keeps the page independent of the API's details.

const BRICKOGNIZE = "https://api.brickognize.com/predict/figs/?top_k_items=5&min_similarity_items=0.3";
const MAX_BYTES = 8 * 1024 * 1024;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export async function onRequestPost({ request }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "bad_request", message: "Invia la foto come multipart/form-data nel campo 'image'." }, 400);
  }

  const image = form.get("image");
  if (!image || typeof image === "string") {
    return json({ error: "no_image", message: "Nessuna foto ricevuta." }, 400);
  }
  if (image.size > MAX_BYTES) {
    return json({ error: "too_large", message: "La foto supera 8 MB." }, 413);
  }

  const upstream = new FormData();
  upstream.append("query_image", image, image.name || "foto.jpg");

  try {
    const r = await fetch(BRICKOGNIZE, {
      method: "POST",
      body: upstream,
      headers: { accept: "application/json" },
    });
    const text = await r.text();
    if (!r.ok) {
      return json({ error: "upstream", status: r.status, message: text.slice(0, 300) }, 502);
    }
    return new Response(text, {
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
  } catch (e) {
    return json({ error: "unreachable", message: String(e).slice(0, 200) }, 502);
  }
}

export function onRequestGet() {
  return json({ ok: true, info: "Invia una foto con POST su questo indirizzo." });
}
