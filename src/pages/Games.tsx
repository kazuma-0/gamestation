import logo from "@/assets/GamingGarage.jpg";
import BackgroundOverlay from "@/components/background-overlay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

const game = {
  name: "Grand Theft Auto V",
  tags: ["Role Play", "Single Player"],
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt molestiae, labore perspiciatis, a placeat enim voluptas
                hic eaque voluptates reiciendis voluptatibus odit sed et sequi
                velit ratione rerum iure blanditiis eius ipsum. Necessitatibus
                odio sit similique eum repellat aliquam! Optio culpa quia
                distinctio voluptate quae pariatur necessitatibus dolorem nihil?
                Atque laudantium, blanditiis quidem ipsa voluptates ea quasi
                quis aspernatur numquam tenetur provident eligendi ab laborum
                quo assumenda eveniet accusantium, velit, odit aliquam vero
                perspiciatis pariatur illo iusto nobis! Blanditiis quo, harum
                temporibus consequatur, tempora iste beatae aspernatur
                architecto, delectus quia inventore porro! Vel facere placeat
                voluptatem inventore fugit omnis aperiam!
              `,
  background:
    "https://cdn.mos.cms.futurecdn.net/9b9d431b9ef2f35819e1595b52c831eb.jpg",
  cover:
    "https://img.gta5-mods.com/q95/images/gta-v-new-loading-screens-and-new-loading-startups/7a6c78-beach_bg.jpg",
};
export default function Games() {
  return (
    <div className="text-white bg-[#1f1f1f] h-screen w-full">
      <div className="px-10 h-20 flex items-center justify-between border-b-[1px] border-b-[#ffffff30]">
        {/* <img src={logo} alt="" /> */}
        <div></div>
        <div className="space-x-10 flex">
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>GS</AvatarFallback>
          </Avatar>
          <Button className="rounded-full" variant={"destructive"}>
            <LogOutIcon />
          </Button>
        </div>
      </div>

      <div className="py-3 relative">
        <BackgroundOverlay image="https://cdn.mos.cms.futurecdn.net/9b9d431b9ef2f35819e1595b52c831eb.jpg" />
        <div className="relative z-10 container mx-auto pt-24">
          <div className="flex gap-10">
            <div className="shrink-0 h-[550px] w-[350px] bg-red-300 rounded bg-[url(https://img.gta5-mods.com/q95/images/gta-v-new-loading-screens-and-new-loading-startups/7a6c78-beach_bg.jpg)] bg-cover bg-center"></div>
            <div className="pt-5">
              <h1 className="text-5xl font-black">Grand Theft Auto 5</h1>
              <div className="pt-2 flex gap-2">
                <Badge variant={"secondary"}>Role play</Badge>
                <Badge variant={"secondary"}>Single Player</Badge>
              </div>
              <p className="pt-5 text-sm text-pretty">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt molestiae, labore perspiciatis, a placeat enim voluptas
                hic eaque voluptates reiciendis voluptatibus odit sed et sequi
                velit ratione rerum iure blanditiis eius ipsum. Necessitatibus
                odio sit similique eum repellat aliquam! Optio culpa quia
                distinctio voluptate quae pariatur necessitatibus dolorem nihil?
                Atque laudantium, blanditiis quidem ipsa voluptates ea quasi
                quis aspernatur numquam tenetur provident eligendi ab laborum
                quo assumenda eveniet accusantium, velit, odit aliquam vero
                perspiciatis pariatur illo iusto nobis! Blanditiis quo, harum
                temporibus consequatur, tempora iste beatae aspernatur
                architecto, delectus quia inventore porro! Vel facere placeat
                voluptatem inventore fugit omnis aperiam!
              </p>
              <Button
                variant={"secondary"}
                className="mt-5 rounded-full text-2xl px-7 py-7 font-bold"
              >
                Play Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
