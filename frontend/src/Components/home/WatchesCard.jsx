import React from "react";
import Card from "../Card";

const WatchesCard = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-5xl stylish font-bold">new arrivals</h1>
      <div className="container mx-auto my-5 flex flex-wrap justify-center gap-6 w-[100vw]">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default WatchesCard;
