import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Clapperboard, Images } from "lucide-react";

const data = [
  {
    label: "Posts",
    value: "Posts",
    icon: Images,
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: "Clips",
    value: "Clips",
    icon: Clapperboard,
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];

const ProfileContent = () => {
  return (
    <div className="lg:w-2/3 w-full mx-auto mt-20">
      <Tabs value="Posts">
        <TabsHeader className="bg-blue-300">
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value} className="">
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
