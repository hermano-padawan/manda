import { mkdir, writeFile } from "node:fs/promises";

const designs = [
  ["mandala-amapola-radial",8,4,"round"],["mandala-dalia-geometrica",12,5,"point"],["mandala-peonia-simetrica",10,4,"soft"],["mandala-tulipanes",8,3,"tulip"],
  ["mandala-lavanda-geometrica",12,3,"leaf"],["mandala-hojas-monstera",6,4,"wide"],["mandala-helechos",10,4,"leaf"],["mandala-ramas-olivo",8,5,"slim"],
  ["mandala-treboles",8,3,"round"],["mandala-jardin-simetrico",10,5,"soft"],["mandala-flor-de-luna",8,4,"crescent"],["mandala-estrella-floral",10,4,"point"],
  ["mandala-luna-botanica",6,4,"crescent"],["mandala-sol-geometrico",12,4,"point"],["mandala-estrellas-y-hojas",8,5,"diamond"],["mandala-corona-botanica",10,3,"wide"],
  ["mandala-hexagonos-florales",6,5,"diamond"],["mandala-rombos-botanicos",8,4,"diamond"],["mandala-mosaico-floral",12,3,"round"],["mandala-arcos-y-petalos",8,5,"soft"],
  ["mandala-ondas-geometricas",10,4,"wave"],["mandala-gotas-y-hojas",8,4,"drop"],["mandala-corazones-botanicos",8,3,"heart"],["mandala-plumas-geometricas",10,4,"slim"],
  ["mandala-conchas-florales",8,5,"shell"],["mandala-cristales-y-hojas",6,5,"diamond"],["mandala-espiral-floral",10,4,"spiral"],["mandala-roseta-geometrica",12,5,"point"],
];

const polar=(r,a)=>[500+r*Math.cos(a),500+r*Math.sin(a)];
const f=(n)=>Number(n.toFixed(2));
const petal=(r,a,len,width,kind)=>{
  const [x,y]=polar(r,a), [tx,ty]=polar(r+len,a), [lx,ly]=polar(r+len*.48,a-width), [rx,ry]=polar(r+len*.48,a+width);
  if(kind==="diamond") return `<path d="M${f(x)} ${f(y)} L${f(lx)} ${f(ly)} L${f(tx)} ${f(ty)} L${f(rx)} ${f(ry)} Z"/>`;
  if(kind==="round") return `<path d="M${f(x)} ${f(y)} C${f(lx)} ${f(ly)} ${f(tx)} ${f(ty)} ${f(tx)} ${f(ty)} C${f(tx)} ${f(ty)} ${f(rx)} ${f(ry)} ${f(x)} ${f(y)}Z"/>`;
  if(kind==="heart") { const [mx,my]=polar(r+len*.44,a); return `<path d="M${f(x)} ${f(y)} C${f(lx)} ${f(ly)} ${f(mx)} ${f(my)} ${f(tx)} ${f(ty)} C${f(mx)} ${f(my)} ${f(rx)} ${f(ry)} ${f(x)} ${f(y)}Z"/>`; }
  if(kind==="crescent") return `<path d="M${f(x)} ${f(y)} Q${f(lx)} ${f(ly)} ${f(tx)} ${f(ty)} Q${f(x+(tx-x)*.65)} ${f(y+(ty-y)*.65)} ${f(x)} ${f(y)}Z"/>`;
  if(kind==="wave"||kind==="spiral"||kind==="shell") return `<path d="M${f(x)} ${f(y)} Q${f(lx)} ${f(ly)} ${f(tx)} ${f(ty)} Q${f(rx)} ${f(ry)} ${f(x)} ${f(y)} M${f(x+(tx-x)*.28)} ${f(y+(ty-y)*.28)} Q${f(lx)} ${f(ly)} ${f(x+(tx-x)*.72)} ${f(y+(ty-y)*.72)}"/>`;
  if(kind==="tulip") return `<path d="M${f(x)} ${f(y)} Q${f(lx)} ${f(ly)} ${f(tx)} ${f(ty)} Q${f((lx+rx)/2)} ${f((ly+ry)/2)} ${f(rx)} ${f(ry)} Q${f(rx)} ${f(ry)} ${f(x)} ${f(y)}Z"/>`;
  return `<path d="M${f(x)} ${f(y)} Q${f(lx)} ${f(ly)} ${f(tx)} ${f(ty)} Q${f(rx)} ${f(ry)} ${f(x)} ${f(y)}Z"/>`;
};

function render([slug,count,layers,kind],index){
  const centerSides=5+(index%7), centerPoints=Array.from({length:centerSides},(_,i)=>polar(28+(index%4)*3,-Math.PI/2+i*Math.PI*2/centerSides).map(f).join(",")).join(" ");
  let shapes=`<circle cx="500" cy="500" r="${50+(index%5)*3}"/><polygon points="${centerPoints}"/>`;
  for(let layer=0;layer<layers;layer++){
    const radius=58+(index%4)*3+layer*(78+(index%3)*3), len=88+(index%5)*3+(layer%2)*16, offset=((layer%2)+(index%2)*.25)*Math.PI/count;
    for(let i=0;i<count;i++) shapes+=petal(radius,offset+i*Math.PI*2/count,len,Math.PI/(count*(kind==="wide"?1.35:1.8)),kind);
    shapes+=`<circle cx="500" cy="500" r="${radius+len}"/>`;
  }
  const outer=405+(index%3)*12;
  for(let i=0;i<count;i++) shapes+=petal(outer-64,i*Math.PI*2/count,58,Math.PI/(count*2.1),index%2?"leaf":"diamond");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" role="img"><rect width="1000" height="1000" fill="white"/><g fill="none" stroke="#17211b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${shapes}<circle cx="500" cy="500" r="455"/><circle cx="500" cy="500" r="438"/></g></svg>`;
}

await mkdir("public/mandalas",{recursive:true});
await Promise.all(designs.map((design,index)=>writeFile(`public/mandalas/${design[0]}.svg`,render(design,index))));
console.log(`Generated ${designs.length} mandalas`);
