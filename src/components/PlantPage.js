import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(plantsArray => setPlants(plantsArray));
  }, []);

  function searchPlants(event) {
    setSearch(event.target.value);
  };

  function addPlant(event) {
    event.preventDefault();
    const plant = {
      id: plants.length + 1,
      name: event.target.name.value,
      image: event.target.image.value,
      price: parseInt(event.target.price.value)
    }
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(plant)
    })
      .then(res => res.json())
      .then(newplant => setPlants([...plants, newplant]));
  };

  const filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search search={search} searchPlants={searchPlants} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
