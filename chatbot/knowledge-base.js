// SpinFans Product Knowledge Base
// Source: https://spinfans.com.sg/

const SPINFANS_KB = {
  brand: {
    name: "SPIN Fans",
    tagline: "Designer Ceiling Fans",
    description:
      "SPIN Fans is a Singaporean designer ceiling fan brand that blends functionality, form, and modern aesthetics. Every fan is engineered for quiet, energy-efficient performance.",
    website: "https://spinfans.com.sg/",
    contact: "https://spinfans.com.sg/contact/",
    showrooms: [
      { name: "Tampines North Showroom", area: "East Singapore" },
      { name: "Bendemeer Road Showroom", area: "Central Singapore" },
    ],
    whereToFind: [
      "SPIN official website (spinfans.com.sg)",
      "Shopee – SPIN Fans official store",
      "Mega Discount Store",
      "Threecubes",
      "Hai Guan Seng (authorised dealer)",
    ],
  },

  collections: {
    signature: {
      name: "Signature Collection",
      description:
        "Minimalist ceiling fans with durable metal alloy housing and ABS airfoils. Available in four core colour options.",
      colours: ["White", "Off-White", "Black", "Brushed Nickel"],
      models: ["Quincy", "Espada", "Caramel", "Savannah"],
      sizes: ['36"', '43"', '52"', '60"'],
      features: [
        "UDDC™ (Ultra Dynamic Direct Current) motor",
        "Whisper-quiet operation",
        "Optional integrated LED lighting",
        "Natural Wind mode",
        "Singapore Safety Mark certified",
        "Remote control included",
      ],
    },
    timber: {
      name: "Timber Collection",
      description:
        "Handcrafted Empress Tree wood blades for a rustic, warm aesthetic. Perfect for Scandinavian and contemporary interiors.",
      colours: ["Ash", "Oak", "Off-White"],
      models: ["Timber Quincy", "Timber Espada"],
      sizes: ['43"', '52"', '60"'],
      features: [
        "Natural Empress Tree wood blades",
        "UDDC™ motor",
        "Warm, organic look",
        "Lightweight yet durable",
        "Energy efficient",
      ],
    },
    sphere: {
      name: "Sphere Collection",
      description:
        "Innovative corner fans designed for targeted cooling in compact spaces. Mounts in room corners with 360° oscillation.",
      models: ["Sphere Corner Fan"],
      sizes: ['16"'],
      features: [
        "360° oscillation",
        "Wall/corner mount",
        "Space-saving design",
        "Ideal for bedrooms and small rooms",
        "Remote control",
      ],
    },
    onix: {
      name: "ONIX / ONIX Pro Collection",
      description:
        "High-Volume Low-Speed (HVLS) fans built for large residential and commercial spaces. Incorporates Korean motor technology.",
      models: ["ONIX", "ONIX Pro"],
      sizes: ['60"', '72"', '84"'],
      colours: ["White", "Black"],
      blades: 9,
      features: [
        "HVLS (High-Volume Low-Speed) technology",
        "Korean high-torque motor",
        "Industrial-grade materials",
        "Optional integrated LED lighting",
        "Suitable for commercial spaces",
        "Energy efficient at large scale",
      ],
    },
    chromatic: {
      name: "Chromatic Collection",
      description:
        "Collaborative limited series with unique colour finishes, sustainable materials, and eco-friendly paints.",
      features: [
        "Unique colour finishes",
        "Sustainable materials",
        "Eco-friendly paint",
        "Limited edition",
      ],
    },
  },

  models: {
    quincy: {
      name: "Quincy",
      collections: ["Signature", "Timber"],
      sizes: ['36"', '43"', '52"', '60"'],
      variants: ["White", "Off-White", "Ash (Timber)", "Oak (Timber)"],
      description:
        "The flagship model of SPIN Fans. Clean lines and versatile colour options make it suitable for most home styles.",
      bestFor: "Living rooms, bedrooms, and open-plan spaces",
    },
    espada: {
      name: "Espada",
      collections: ["Signature", "Timber"],
      sizes: ['36"', '43"', '52"', '60"'],
      variants: ["Black", "Wood Blades (Timber)"],
      description:
        "A bold, sleek design with narrow sword-like blades. Popular for modern and minimalist interiors.",
      bestFor: "Modern apartments and dining areas",
    },
    savannah: {
      name: "Savannah",
      collections: ["Signature"],
      sizes: ['43"', '52"', '60"'],
      variants: ["Walnut Grain"],
      description:
        "Warm walnut grain finish that brings a natural, earthy feel to any room.",
      bestFor: "Cosy living spaces and Japandi-style interiors",
    },
    caramel: {
      name: "Caramel",
      collections: ["Signature"],
      sizes: ['43"', '52"', '60"'],
      variants: ["Natural Grain"],
      description:
        "Light natural grain finish with a warm, inviting look. Pairs well with light wood furniture.",
      bestFor: "Scandinavian and nature-inspired interiors",
    },
    onix: {
      name: "ONIX / ONIX Pro",
      collections: ["ONIX"],
      sizes: ['60"', '72"', '84"'],
      variants: ["White", "Black"],
      blades: 9,
      description:
        "Heavy-duty HVLS fan for large spaces. Features 9 blades for maximum airflow coverage.",
      bestFor: "Large living areas, restaurants, retail spaces, warehouses",
    },
    sphere: {
      name: "Sphere Corner Fan",
      collections: ["Sphere"],
      sizes: ['16"'],
      description:
        "A unique corner-mounted fan with 360° oscillation for targeted, space-efficient cooling.",
      bestFor: "Small bedrooms, home offices, study corners",
    },
  },

  sizing: {
    guide: [
      {
        roomSize: "Up to 75 sq ft (e.g. small bedroom)",
        recommended: '36"',
      },
      {
        roomSize: "75 – 175 sq ft (e.g. standard bedroom)",
        recommended: '43"',
      },
      {
        roomSize: "175 – 350 sq ft (e.g. master bedroom / living room)",
        recommended: '52"',
      },
      {
        roomSize: "350 sq ft and above (e.g. open-plan living/dining)",
        recommended: '60" or larger',
      },
    ],
    tip: "For best airflow, the fan should be installed at least 7 feet (2.1 m) from the floor and at least 18 inches (45 cm) from the nearest wall or ceiling obstruction.",
  },

  technology: {
    uddc: {
      name: "UDDC™ Motor (Ultra Dynamic Direct Current)",
      description:
        "SPIN's proprietary brushless DC motor technology. Delivers whisper-quiet operation, energy savings of up to 70% vs AC motors, and a longer lifespan.",
    },
    naturalWind: {
      name: "Natural Wind Mode",
      description:
        "Simulates the feeling of an outdoor breeze by automatically varying fan speed in a random cycle.",
    },
    hvls: {
      name: "HVLS Technology (ONIX)",
      description:
        "High-Volume Low-Speed technology moves large columns of air slowly, covering more area with less energy — ideal for large or open spaces.",
    },
    safetyMark: {
      name: "Singapore Safety Mark",
      description:
        "All SPIN fans are certified with the Singapore Safety Mark, ensuring they meet national electrical and safety standards.",
    },
  },

  faq: [
    {
      q: "Do SPIN fans come with a warranty?",
      a: "Yes. SPIN fans come with a manufacturer's warranty. For specific warranty terms, please visit spinfans.com.sg or contact the SPIN team directly.",
    },
    {
      q: "Can I install a SPIN fan without a false ceiling?",
      a: "Yes. Most SPIN fans can be installed on a standard ceiling with an extension rod. Contact SPIN or your electrician for advice on the appropriate rod length.",
    },
    {
      q: "Are SPIN fans suitable for outdoor use?",
      a: "SPIN fans are designed for indoor use. For covered outdoor areas like balconies, please check with the SPIN team if a specific model is suitable for your environment.",
    },
    {
      q: "Do SPIN fans come with LED lighting?",
      a: "Selected models in the Signature and ONIX collections offer optional integrated LED lighting kits. Check the specific product listing for details.",
    },
    {
      q: "How do I control the fan speed?",
      a: "All SPIN fans come with a remote control. Some models also support wall switch or smart home integration — check the individual model page for details.",
    },
    {
      q: "Where are SPIN fans made?",
      a: "SPIN is a Singaporean brand. The ONIX series uses Korean motor technology. For full manufacturing details, contact SPIN directly.",
    },
    {
      q: "How energy efficient are SPIN fans?",
      a: "SPIN fans use UDDC™ DC motors that can be up to 70% more energy efficient than traditional AC motor fans, keeping your electricity bills low.",
    },
    {
      q: "Where can I buy SPIN fans?",
      a: "You can buy SPIN fans from the official website (spinfans.com.sg), Shopee, Mega Discount Store, Threecubes, and authorised dealers. Showrooms are at Tampines North and Bendemeer Road.",
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = SPINFANS_KB;
}
