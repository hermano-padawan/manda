import type {MetadataRoute} from "next";import {mandalas} from "./data";
export default function sitemap():MetadataRoute.Sitemap{const base="https://tintaquieta.com";return[{url:base,priority:1},{url:`${base}/mandalas`,priority:.9},...mandalas.map(m=>({url:`${base}/mandalas/${m.slug}`,priority:.8}))]}
