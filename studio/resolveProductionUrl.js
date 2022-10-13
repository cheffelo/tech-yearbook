let productionUrl;
try {
  productionUrl = new URL(
    window.location.origin === "http://localhost:3333"
      ? "http://localhost:3000"
      : "https://tech-yearbook.vercel.app"
  );
} catch (err) {
  console.error("Invalid productionUrl", err);
}

export default function resolveProductionUrl(document) {
  if (!productionUrl || !document.slug?.current) {
    return false;
  }
  const searchParams = new URLSearchParams();
  searchParams.set("secret", "1337" || "");
  searchParams.set("slug", document.slug.current);
  return `${productionUrl.origin}/api/preview?${searchParams}`;
}
