export type Category = {
  id: string;
  name: string;
};

export type Product = {
  n: number;
  num: string;
  name: string;
  cat: string;
  catName: string;
  full: string;
  specs: string[];
  rows: Record<string, string>;
};

export const CATEGORIES: Category[] = [
  { id: 'springs', name: 'Springs & retaining strips' },
  { id: 'fasteners', name: 'Screws, nuts & pins' },
  { id: 'sheet', name: 'Sheet-metal parts' },
  { id: 'contacts', name: 'Connectors & clips' },
  { id: 'laminate', name: 'LAMTUF cards & arms' },
  { id: 'moulded', name: 'Moulded & rubber parts' },
];

type RawProduct = [number, string, string, string, string[], Record<string, string>];

const RAW: RawProduct[] = [
  [1, 'Helical Spring', 'springs', 'Helical Spring (With Cadmium Plating), QSPA1, QTA2, QL1, ECR, QNN1, QN1/K (Matl: IS.4454 Gr. I Part. 2)', ['Cadmium plated', 'IS 4454 Gr. I Pt. 2'], { Material: 'IS 4454 Gr. I Part 2', Finish: 'Cadmium plated', 'Relay types': 'QSPA1, QTA2, QL1, ECR, QNN1, QN1/K' }],
  [2, 'Stack Screw 4BA (Large)', 'fasteners', 'Stack Screw 4BA (S.S.202) Machine Finish (Large)', ['S.S. 202', 'Machine finish'], { Material: 'S.S. 202', Finish: 'Machine finish', Size: 'Large' }],
  [3, 'Stack Screw 4BA (Small)', 'fasteners', 'Stack Screw 4BA (S.S.202) Machine Finish (Small)', ['S.S. 202', 'Machine finish'], { Material: 'S.S. 202', Finish: 'Machine finish', Size: 'Small' }],
  [4, 'Metal End Block', 'sheet', 'Metal End Block (Thick-2.5mm) (S.S.202/304)', ['S.S. 202 / 304', '2.5 mm'], { Material: 'S.S. 202 / 304', Thickness: '2.5 mm' }],
  [5, 'Interlocking Pin', 'fasteners', 'Interlocking Pin (S.S.202)', ['S.S. 202'], { Material: 'S.S. 202' }],
  [6, 'Operating Arm Pin', 'fasteners', 'Operating Arm Pin (S.S.202)', ['S.S. 202'], { Material: 'S.S. 202' }],
  [7, 'Helical Cap', 'springs', 'Helical Cap (S.S.202)', ['S.S. 202'], { Material: 'S.S. 202' }],
  [8, '4 Way Spacer', 'sheet', '4 Way Spacer (S.S.202/204)', ['S.S. 202 / 204'], { Material: 'S.S. 202 / 204' }],
  [9, 'Double Anchor Block', 'sheet', 'Double Anchor Block (S.S.304) (Thick-3mm)', ['S.S. 304', '3 mm'], { Material: 'S.S. 304', Thickness: '3 mm' }],
  [10, 'Special Screw 4BA', 'fasteners', 'Special Screw 4BA (S.S.304/202)', ['S.S. 304 / 202'], { Material: 'S.S. 304 / 202' }],
  [11, 'Carbon Clip', 'contacts', 'Carbon Clip with TIN Plating', ['Tin plated'], { Finish: 'Tin plated' }],
  [12, 'Removal Connector', 'contacts', 'Removal Connector with TIN Plating', ['Tin plated'], { Finish: 'Tin plated' }],
  [13, 'Adjustment Card (Std)', 'laminate', 'Adjustment Card (Std) (Thick – 1.4mm to 1.6mm) (LAMTUF)', ['LAMTUF', '1.4–1.6 mm'], { Material: 'LAMTUF', Thickness: '1.4 – 1.6 mm', Size: 'Standard' }],
  [14, 'Operating Arm (Std)', 'laminate', 'Operating Arm (Std) (Thick – 1.4mm to 1.6mm) (LAMTUF)', ['LAMTUF', '1.4–1.6 mm'], { Material: 'LAMTUF', Thickness: '1.4 – 1.6 mm', Size: 'Standard' }],
  [15, 'Adjustment Card (Small)', 'laminate', 'Adjustment Card (Small) (Thick – 1.4mm to 1.6mm) (LAMTUF)', ['LAMTUF', '1.4–1.6 mm'], { Material: 'LAMTUF', Thickness: '1.4 – 1.6 mm', Size: 'Small' }],
  [16, 'Operating Arm (Small)', 'laminate', 'Operating Arm (Small) (Thick – 1.4mm to 1.6mm) (LAMTUF)', ['LAMTUF', '1.4–1.6 mm'], { Material: 'LAMTUF', Thickness: '1.4 – 1.6 mm', Size: 'Small' }],
  [17, 'Handle', 'sheet', 'Handle (Thick-1.5mm) (S.S.202)', ['S.S. 202', '1.5 mm'], { Material: 'S.S. 202', Thickness: '1.5 mm' }],
  [18, 'Forging Handle', 'sheet', 'Forging Handle with Polish', ['Polished'], { Process: 'Forged', Finish: 'Polished' }],
  [19, '4BA Hex Nut', 'fasteners', '4BA Hex Nut (S.S.304)', ['S.S. 304'], { Material: 'S.S. 304' }],
  [20, 'Armature Retaining Strip', 'springs', 'Armature Retaining Strip (202), TWIN', ['S.S. 202', 'Twin'], { Material: 'S.S. 202', Type: 'Twin' }],
  [21, 'Returning Strip (Clip)', 'springs', 'Returning Strip(Clip)', [], {}],
  [22, 'Nylock Nut', 'fasteners', 'Nylock Nut', [], {}],
  [23, 'Combined Back Stop', 'sheet', 'Combined Back Stop', [], {}],
  [24, 'Coil Lead Connector', 'contacts', 'Coil Lead Connector (R1,R2)', ['R1, R2'], { Variants: 'R1, R2' }],
  [25, 'Connector', 'contacts', 'Connector', [], {}],
  [26, 'Metal Spacer', 'sheet', 'Metal Spacer', [], {}],
  [27, 'Shunt Magnet Clamp', 'sheet', 'Shunt Magnet Clamp (Small & Large)', ['Small & large'], { Sizes: 'Small, Large' }],
  [28, "'O' Ring", 'moulded', "'O' Ring Silicon", ['Silicone'], { Material: 'Silicone' }],
  [29, 'Rubber Washer', 'moulded', 'Rubber Washer', ['Rubber'], { Material: 'Rubber' }],
  [30, 'Rubber Spacer', 'moulded', 'Rubber Spacer', ['Rubber'], { Material: 'Rubber' }],
  [31, 'Bobin QNN1', 'moulded', 'Bobin QNN1', ['QNN1'], { 'Relay type': 'QNN1' }],
  [32, 'Bobin QNNA1', 'moulded', 'Bobin QNNA1', ['QNNA1'], { 'Relay type': 'QNNA1' }],
  [33, 'Registration Plate', 'sheet', 'Registration Plate', [], {}],
  [34, 'Moulding Cap (Large)', 'moulded', 'Moulding Cap Large', ['Large'], { Size: 'Large' }],
  [35, 'Moulding Cap (Small)', 'moulded', 'Moulding Cap Small', ['Small'], { Size: 'Small' }],
];

const pad = (n: number) => String(n).padStart(2, '0');

export const PRODUCTS: Product[] = RAW.map(([n, name, cat, full, specs, rows]) => ({
  n,
  num: pad(n),
  name,
  cat,
  catName: CATEGORIES.find((c) => c.id === cat)!.name,
  full,
  specs,
  rows,
}));

export function getProduct(n: number): Product | undefined {
  return PRODUCTS.find((p) => p.n === n);
}

export function filterProducts(cat: string, q: string): Product[] {
  const query = q.trim().toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      (cat === 'all' || p.cat === cat) &&
      (!query || (p.full + ' ' + p.catName + ' ' + p.num).toLowerCase().includes(query))
  );
}
