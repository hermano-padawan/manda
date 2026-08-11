import type {MetadataRoute} from "next";
import {mandalaCategories,mandalas} from "./data";

export default function sitemap():MetadataRoute.Sitemap{
  const base="https://dibulisto.site";
  const lastModified=new Date("2026-08-11");
  return[
    {url:`${base}/`,lastModified,priority:1},
    {url:`${base}/mandalas/`,lastModified,priority:.9},
    ...mandalaCategories.map(category=>({url:`${base}/mandalas/${category.slug}/`,lastModified,images:[`${base}${category.image}`],priority:.85})),
    ...mandalas.map(mandala=>({url:`${base}/mandalas/${mandala.slug}/`,lastModified,images:[`${base}${mandala.image}`],priority:.8}))
  ]
}
