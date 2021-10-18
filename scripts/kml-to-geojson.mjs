import { kml } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import { readFile } from "fs/promises";

const sourceKml = new DOMParser().parseFromString(
  await readFile("fed_cf_CA_2_2_kml_en.kml", "utf8")
);

const converted = kml(sourceKml);

console.log(converted);
