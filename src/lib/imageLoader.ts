"use client";

export default function wsrvLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  const baseUrl = "[https://filedn.eu/lrPI4UkkIDzQ8H1Xj2o9uzf/lkmail](https://filedn.eu/lrPI4UkkIDzQ8H1Xj2o9uzf/lkmail)";
  const params = new URLSearchParams({
    url: `${baseUrl}/${src}`,
    w: width.toString(),
    q: (quality || 80).toString(),
    output: "webp",
    il: "1",
    fit: "cover",
    a: "attention",
  });
  return `https://wsrv.nl/?${params.toString()}`;
}