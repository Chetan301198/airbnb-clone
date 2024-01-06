"use client";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import CategoryBox from "./CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This propery is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This propery has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This propery is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This propery is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This propery has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This propery is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This propery is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This propery has skiing activities!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This propery is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This propery has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This propery is in arctic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This propery is in cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This propery is in the desert!",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This propery is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This propery is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const path = usePathname();

  const isMainPage = path === "/" || path === "/filter";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => {
          return (
            <CategoryBox
              key={item.label}
              title={item.label}
              selected={item.label === category}
              icon={item.icon}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;
