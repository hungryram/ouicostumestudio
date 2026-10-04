type GalleryPhoto = readonly [
  filename: string,
  width: number,
  height: number,
  alt: string,
];

export type WorkCollection = {
  href: string;
  title: string;
  heading: string;
  description: string;
  folder: string;
  cover: string;
  photos: readonly GalleryPhoto[];
};

export const photoshoot: WorkCollection = {
  href: "/work/photoshoot",
  title: "Photoshoot",
  heading: "Made to move.",
  description:
    "Custom dancewear, photographed on the dancers it was made for. A closer look at the fit, movement, and details.",
  folder: "photoshoot",
  cover: "/images/photoshoot/04.jpg",
  photos: [
    ["01.jpg", 1277, 1541, "Dancer in black dancewear framing her face with her hands"],
    ["02.jpg", 3024, 4032, "Dancer in a black short-sleeved leotard holding a bowler hat"],
    ["03.jpg", 2500, 2500, "Black asymmetric two-piece dancewear with silver waist chains"],
    ["04.jpg", 1290, 1462, "Dancer leaping in a black top and flowing blue skirt"],
    ["05.jpg", 1533, 1866, "Dancer extending her leg in a blue one-shoulder leotard"],
    ["06.png", 1290, 1290, "Blue two-piece dancewear with an asymmetric neckline"],
    ["07.jpg", 3024, 4032, "Dancer in a red long-sleeved leotard against a yellow backdrop"],
    ["08.jpg", 715, 929, "Dancer balancing on pointe in a coral long-sleeved costume"],
    ["09.jpg", 1800, 1192, "Dancer in a purple costume holding an extended floor pose"],
    ["10.png", 675, 675, "Two dance poses in a purple one-shoulder costume"],
    ["11.png", 579, 579, "Pink and black patterned two-piece dancewear"],
    ["12.jpg", 1200, 1527, "Black leotard with a sheer neckline and waist cutout"],
    ["13.jpg", 743, 723, "Back view of black dancewear with crossing straps"],
    ["14.jpg", 1125, 1520, "Dancer in a black leotard extending one leg on pointe"],
    ["15.jpg", 1125, 1450, "Black-and-white photograph of a dancer leaping in a black leotard"],
    ["16.jpg", 1125, 1569, "Dancer jumping in a black leotard with her arms overhead"],
    ["17.jpg", 1125, 1512, "Dancer on pointe in a black leotard with one arm raised"],
    ["18.jpg", 1125, 1528, "Dancer holding a high leg extension in a black leotard"],
    ["19.jpg", 1125, 1478, "Dancer in a black leotard arching backward in a jump"],
    ["20.jpg", 1110, 1629, "Pink and black dance costume with a colorful tulle skirt and black boots"],
    ["21.jpg", 1102, 1541, "Dancer lifting one boot behind her in a colorful tulle costume"],
    ["22.jpg", 1099, 1627, "Dancer posing with arms overhead in pink dancewear and a tulle skirt"],
    ["23.jpg", 782, 1097, "Neon yellow two-piece dancewear with sheer white sleeves"],
    ["24.jpg", 1113, 1671, "Dancer in leopard-print trousers and a cropped blue jacket"],
  ],
};

export const costumes: WorkCollection = {
  href: "/work/costumes",
  title: "Costumes",
  heading: "The details, up close.",
  description:
    "A look at custom competition costumes in the studio, from appliqué and rhinestones to the finished silhouette.",
  folder: "costumes",
  cover: "/images/costumes/01.jpg",
  photos: [
    ["01.jpg", 2423, 4032, "White two-piece costume with silver appliqué and sheer puff sleeves"],
    ["02.jpg", 3024, 4032, "White halter costume with silver appliqué and detached sheer sleeves"],
    ["03.jpg", 3024, 4032, "White costume with silver puff sleeves and appliqué skirt panels"],
    ["04.jpg", 2413, 3828, "White rhinestone two-piece costume with sheer sleeves and hip straps"],
    ["05.jpg", 4062, 5625, "White gathered crop top with silver sleeves and matching briefs"],
    ["06.jpg", 2268, 4032, "White rhinestone halter costume with flowing sheer sleeves"],
    ["07.jpg", 2262, 3977, "White costume with rhinestone trim and horizontal waist straps"],
    ["08.jpg", 2268, 3951, "White asymmetric top and briefs with silver appliqué"],
    ["09.jpg", 2426, 3817, "White keyhole top with silver sleeves and embellished hip panels"],
    ["10.jpg", 2625, 4032, "White asymmetric costume with a silver lace long sleeve"],
    ["11.jpg", 1859, 3308, "White flowing costume with an embellished bodice and sheer skirt"],
    ["12.jpg", 823, 1350, "White and nude asymmetric costume with a draped sheer panel"],
    ["13.jpg", 2268, 4032, "White costume with rhinestone trim, sheer sleeves, and crossing waist straps"],
    ["14.jpg", 754, 1086, "Nude two-piece costume with crossing straps and a draped hip panel"],
    ["15.jpg", 813, 1086, "Black halter costume with a sheer neckline and crossing waist straps"],
    ["16.jpg", 1839, 3481, "Black and green asymmetric costume with a draped shoulder panel"],
    ["17.jpg", 1951, 3238, "Black long-sleeved leotard with sheer panels and waist cutouts"],
    ["18.jpg", 2998, 5436, "Black and white striped two-piece costume with sequined hip panels"],
    ["19.jpg", 2198, 3852, "Blue halter costume with floral appliqué and crossing waist straps"],
    ["20.jpg", 2366, 3633, "Blue and green sequined leotard with a sheer embellished bodice"],
  ],
};
