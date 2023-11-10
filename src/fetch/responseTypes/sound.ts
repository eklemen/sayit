export interface Sound {
  url: string;
  _id: string;
  key: SoundKeys;
  sound: string;
  examples: string[];
  category: string;
  alternateSpellings: string[];
  alternateExamples: string[];
}

export type Sounds = Sound[];

export type SoundKeys =
  | 'b.m4a'
  | 'd.m4a'
  | 'f.m4a'
  | 'g.m4a'
  | 'h.m4a'
  | 'j.m4a'
  | 'k.m4a'
  | 'l.m4a'
  | 'm.m4a'
  | 'n.m4a'
  | 'p.m4a'
  | 'r.m4a'
  | 's.m4a'
  | 't.m4a'
  | 'v.m4a'
  | 'w.m4a'
  | 'y.m4a'
  | 'z.m4a'
  | 'ch.m4a'
  | 'sh.m4a'
  | 'ng.m4a'
  | 'th.m4a'
  | 'zh.m4a'
  | 'wh.m4a'
  | 'ar.m4a'
  | 'er.m4a'
  | 'ir.m4a'
  | 'or.m4a'
  | 'ur.m4a'
  | 'long-a.m4a'
  | 'long-e.m4a'
  | 'long-i.m4a'
  | 'long-o.m4a'
  | 'long-u.m4a'
  | 'short-a.m4a'
  | 'short-e.m4a'
  | 'short-i.m4a'
  | 'short-o.m4a'
  | 'short-u.m4a'
  | 'short-oo.m4a'
  | 'long-oo.m4a'
  | 'ow.m4a'
  | 'oy.m4a';
