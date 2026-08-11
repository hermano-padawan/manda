import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import Header from "../../ui/Header";
import {createMetaDescription,getCategoryForMandala,getMandalasByCategory,mandalaCategories,mandalas} from "../../data";
import Actions from "./Actions";

export function generateStaticParams(){return [...mandalas,...mandalaCategories].map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const category=mandalaCategories.find(item=>item.slug===slug);
  if(category){const url=`/mandalas/${category.slug}/`;return{title:category.title,description:category.description,alternates:{canonical:url},openGraph:{type:"website",url,title:category.title,description:category.description,siteName:"Dibulisto",locale:"es_ES",images:[{url:"/og.png",width:1731,height:907,alt:`${category.title} en Dibulisto`,type:"image/png"}]},twitter:{card:"summary_large_image",title:category.title,description:category.description,images:["/og.png"]}}}
  const mandala=mandalas.find(item=>item.slug===slug);
  if(!mandala)return{};
  const title=`${mandala.title} para imprimir`;
  const description=createMetaDescription(mandala.description);
  const url=`/mandalas/${mandala.slug}/`;
  return{title,description,alternates:{canonical:url},openGraph:{type:"article",url,title,description,siteName:"Dibulisto",locale:"es_ES",images:[{url:"/og.png",width:1731,height:907,alt:"Dibulisto, dibujos listos para imprimir",type:"image/png"}]},twitter:{card:"summary_large_image",title,description,images:["/og.png"]}}
}

function CategoryPage({category}:{category:typeof mandalaCategories[number]}){
  const items=getMandalasByCategory(category.slug);
  const jsonLd={"@context":"https://schema.org","@graph":[{"@type":"CollectionPage",name:category.title,description:category.description,url:`https://dibulisto.site/mandalas/${category.slug}/`,isPartOf:{"@type":"WebSite",name:"Dibulisto",url:"https://dibulisto.site/"}},{"@type":"ItemList",numberOfItems:items.length,itemListElement:items.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.title,url:`https://dibulisto.site/mandalas/${item.slug}/`}))},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Inicio",item:"https://dibulisto.site/"},{"@type":"ListItem",position:2,name:"Mandalas",item:"https://dibulisto.site/mandalas/"},{"@type":"ListItem",position:3,name:category.title,item:`https://dibulisto.site/mandalas/${category.slug}/`}]}]};
  return <><Header/><main className="shell"><nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>→</span><Link href="/mandalas/">Mandalas</Link><span>→</span><span>{category.title}</span></nav><section className="intro compact"><p className="eyebrow">{items.length} dibujos para colorear</p><h1>{category.title} para imprimir</h1><p>{category.description} Abre el diseño que prefieras y utiliza los botones de impresión o compartir.</p></section><div className="drawing-grid">{items.map((item,index)=><Link className="drawing-card" href={`/mandalas/${item.slug}/`} key={item.slug}><span className="drawing-image"><img src={item.image} width="800" height="800" loading={index<3?"eager":"lazy"} decoding="async" alt={`${item.title} para imprimir y colorear`}/></span><strong>{item.title}</strong><small>{item.short}</small></Link>)}</div><section className="seo-copy"><h2>Ideas para colorear estos mandalas</h2><p>{category.tip} No necesitas seguir una combinación concreta: prueba primero en una zona pequeña y repite los colores en posiciones simétricas si quieres un acabado equilibrado.</p><p>Todas las láminas se pueden imprimir gratuitamente para uso personal, familiar o educativo no comercial. Utiliza papel A4 y selecciona «ajustar a página» antes de imprimir.</p></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></main></>;
}

export default async function Drawing({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const category=mandalaCategories.find(item=>item.slug===slug);
  if(category)return <CategoryPage category={category}/>;
  const mandala=mandalas.find(item=>item.slug===slug);
  if(!mandala)notFound();
  const mandalaCategory=getCategoryForMandala(mandala.slug)!;
  const related=getMandalasByCategory(mandalaCategory.slug).filter(item=>item.slug!==mandala.slug).slice(0,3);
  const jsonLd={"@context":"https://schema.org","@graph":[{"@type":"ImageObject",name:mandala.title,description:mandala.description,contentUrl:`https://dibulisto.site${mandala.image}`,encodingFormat:"image/webp",representativeOfPage:true,creditText:"Dibulisto",copyrightNotice:`© ${new Date().getFullYear()} Dibulisto. Uso personal, familiar y educativo no comercial.`,creator:{"@type":"Organization",name:"Dibulisto",url:"https://dibulisto.site/"},license:"https://dibulisto.site/aviso-legal/",acquireLicensePage:"https://dibulisto.site/contacto/"},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Inicio",item:"https://dibulisto.site/"},{"@type":"ListItem",position:2,name:"Mandalas",item:"https://dibulisto.site/mandalas/"},{"@type":"ListItem",position:3,name:mandalaCategory.title,item:`https://dibulisto.site/mandalas/${mandalaCategory.slug}/`},{"@type":"ListItem",position:4,name:mandala.title,item:`https://dibulisto.site/mandalas/${mandala.slug}/`}]}]};
  return <><Header/><main className="shell"><nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>→</span><Link href="/mandalas/">Mandalas</Link><span>→</span><Link href={`/mandalas/${mandalaCategory.slug}/`}>{mandalaCategory.title.replace("Mandalas de ","")}</Link><span>→</span><span>{mandala.title}</span></nav><article className="drawing-detail"><header><p className="eyebrow">Lámina para colorear</p><h1>{mandala.title} para imprimir</h1><p>{mandala.description}</p><Actions/></header><figure><img src={mandala.image} width="800" height="800" decoding="async" alt={`${mandala.title} en blanco y negro para imprimir y colorear`}/><figcaption>Formato cuadrado · impresión recomendada en A4</figcaption></figure></article><section className="drawing-copy"><h2>Cómo colorear este mandala</h2><p>{mandalaCategory.tip} El diseño «{mandala.short.toLowerCase()}» permite trabajar primero las figuras principales y completar después los elementos que las rodean.</p><p>Descarga o imprime esta lámina gratis para utilizarla en casa, en clase o durante una actividad tranquila. Para lápices sirve papel común; con rotuladores recomendamos papel de mayor gramaje.</p></section><section className="related"><div className="section-title"><h2>Más de {mandalaCategory.title.replace("Mandalas de ","").toLowerCase()}</h2><Link href={`/mandalas/${mandalaCategory.slug}/`}>Ver categoría</Link></div><div className="related-grid">{related.map(item=><Link href={`/mandalas/${item.slug}/`} key={item.slug}><img src={item.image} width="800" height="800" loading="lazy" decoding="async" alt=""/><strong>{item.title}</strong></Link>)}</div></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></main></>;
}
