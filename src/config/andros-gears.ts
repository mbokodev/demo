export const androsGears = {
  slug: "andros-gears", companyName: "Andros Gears", crmId: "PRO-2026-007", founded: "1989",
  phone: { display: "450-686-2403", href: "tel:+14506862403" }, email: "info@androsgears.com",
  address: { line1: "1406 Rue Berlier", line2: "Laval, QC H7L 4A1", directions: "https://www.google.com/maps/search/?api=1&query=1406+Rue+Berlier+Laval+QC+H7L+4A1" },
  officialWebsite: "https://www.androsgears.com/en-ca/home",
  products: ["Spur gears", "Helical gears", "Worm gears", "Internal gears", "Sprockets", "Racks", "Straight bevel gears", "Spiral bevel gears"],
  capabilities: [
    { type: "Spur & helical gears", diameter: "40 in", pitch: "2 D.P.", face: "15.75 in" },
    { type: "Internal gears & splines", diameter: "14 in", pitch: "3 D.P.", face: "4 in" },
    { type: "Worm gears", diameter: "40 in", pitch: "3 D.P.", face: "15.75 in" },
    { type: "Sprockets", diameter: "40 in", pitch: "3 D.P.", face: "Multiple" },
    { type: "Bevel gears", diameter: "12 in", pitch: "3 D.P.", face: "3.5 in" },
    { type: "Racks", diameter: "—", pitch: "3 D.P.", face: "40 in long" },
    { type: "Worm shafts", diameter: "8 in dia.", pitch: "—", face: "40 in long max." },
  ],
  machinery: [
    ["Slotter", "12 in long internal keyways · any width"], ["CNC lathes", "16 × 80 in long max."], ["CNC milling", "20 × 40 × 25 in high"], ["Lathes", "32 in dia. × 60 in long max."], ["Press", "60 tons"],
  ],
  industries: ["OEM", "Mining", "Printing", "Machine tools", "Pulp & paper", "Food & beverage", "Railway systems", "Marine / Military", "Agriculture & farming", "Electronic equipment", "Heavy industrial equipment"],
} as const;

