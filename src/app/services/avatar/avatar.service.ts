import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }

  getBackgroundColorByName(name: string): string {
    const letterToColor: any = {
      a: "bg-[#FD005B]",
      b: "bg-[#6962EC]",
      c: "bg-[#00BFFF]",
      d: "bg-[#FF8C00]",
      e: "bg-[#32CD32]",
      f: "bg-[#FFD700]",
      g: "bg-[#8A2BE2]",
      h: "bg-[#FF69B4]",
      i: "bg-[#40E0D0]",
      j: "bg-[#DC143C]",
      k: "bg-[#00CED1]",
      l: "bg-[#4682B4]",
      m: "bg-[#DA70D6]",
      n: "bg-[#FF4500]",
      o: "bg-[#228B22]",
      p: "bg-[#B22222]",
      q: "bg-[#FF1493]",
      r: "bg-[#00FF7F]",
      s: "bg-[#7B68EE]",
      t: "bg-[#9932CC]",
      u: "bg-[#FF6347]",
      v: "bg-[#00FA9A]",
      w: "bg-[#4169E1]",
      x: "bg-[#6A5ACD]",
      y: "bg-[#20B2AA]",
      z: "bg-[#778899]"
    };

    if (!name || typeof name !== "string") {
      throw new Error("El nombre debe ser un string válido.");
    }
  
    const firstLetter = name.trim().toLowerCase()[0];

    return letterToColor[firstLetter] || "bg-[#000000]";
  }

  getFallback(name: string): string {
    return name.split(' ')[0][0] + name.split(' ')[1][0] || '';
  }
}
