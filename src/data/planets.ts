export interface Planet {
  name: string;
  nameEn: string;
  diameter: number; // km
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  color: string;
  radius: number; // display radius in pixels
  orbitRadius: number; // display orbit radius in pixels
  description: string;
}

export const planets: Planet[] = [
  {
    name: "水星",
    nameEn: "Mercury",
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    color: "#b5b5b5",
    radius: 4,
    orbitRadius: 60,
    description: "水星是太阳系中最小的行星，也是距离太阳最近的行星。它的表面布满陨石坑，与月球表面相似。"
  },
  {
    name: "金星",
    nameEn: "Venus",
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    color: "#e8cda0",
    radius: 7,
    orbitRadius: 95,
    description: "金星是太阳系中最热的行星，表面温度可达465°C。它有着浓密的二氧化碳大气层，产生强烈的温室效应。"
  },
  {
    name: "地球",
    nameEn: "Earth",
    diameter: 12756,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    color: "#4da6ff",
    radius: 8,
    orbitRadius: 130,
    description: "地球是太阳系中唯一已知存在生命的行星。它拥有液态水和适宜的大气层，是人类的家园。"
  },
  {
    name: "火星",
    nameEn: "Mars",
    diameter: 6792,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    color: "#e07040",
    radius: 5,
    orbitRadius: 170,
    description: "火星被称为'红色星球'，因其表面富含氧化铁而呈红色。它拥有太阳系中最高的山——奥林帕斯山。"
  },
  {
    name: "木星",
    nameEn: "Jupiter",
    diameter: 142984,
    distanceFromSun: 778.3,
    orbitalPeriod: 4333,
    color: "#d4a574",
    radius: 18,
    orbitRadius: 225,
    description: "木星是太阳系中最大的行星，质量是其他所有行星总和的2.5倍。它著名的大红斑是一个持续数百年的巨大风暴。"
  },
  {
    name: "土星",
    nameEn: "Saturn",
    diameter: 120536,
    distanceFromSun: 1427,
    orbitalPeriod: 10759,
    color: "#f0d890",
    radius: 15,
    orbitRadius: 285,
    description: "土星以其壮观的环系统而闻名。这些环主要由冰粒和岩石碎片组成，宽度达28万公里，但厚度仅约10米。"
  },
  {
    name: "天王星",
    nameEn: "Uranus",
    diameter: 51118,
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    color: "#7de8e8",
    radius: 11,
    orbitRadius: 340,
    description: "天王星是一颗冰巨星，以近乎90度的倾斜角自转，几乎是'躺着'绕太阳公转。它呈现独特的蓝绿色。"
  },
  {
    name: "海王星",
    nameEn: "Neptune",
    diameter: 49528,
    distanceFromSun: 4497,
    orbitalPeriod: 60190,
    color: "#4466ff",
    radius: 10,
    orbitRadius: 390,
    description: "海王星是太阳系中距离太阳最远的行星。它拥有太阳系中最强的风，风速可达每小时2100公里。"
  }
];
