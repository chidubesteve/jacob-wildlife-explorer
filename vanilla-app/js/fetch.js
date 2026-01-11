// This file is to create helper functions to fetch json data for the application
// fetch animals.json
export async function getAnimalData() {
  const response = await fetch("../data/animals.json");
  if (!response.ok) {
    throw new Error("Failed to load animal data");
  }
  return response.json();
}

export async function getKidsTipsData() {
  const response = await fetch("../data/KidsTips.json");
  if (!response.ok) {
    throw new Error("Failed to load kids tips data");
  }
  return response.json();
}

export async function getFunFactsDataFromAnimal(animalId) {
  const response = await fetch("../data/animals.json");
  if (!response.ok) {
    throw new Error("Failed to load animal data");
  }
  const data = await response.json();
  return data.find((animal) => animal.id === animalId).funFact;
}
