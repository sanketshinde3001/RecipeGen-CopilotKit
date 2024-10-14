'use client'

import React, { useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const RecipeList = () => {
  const { recipes, addRecipe, deleteRecipe, suggestRecipe } =
    useRecipes();
  const [newRecipeName, setNewRecipeName] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState("");

  const handleAddRecipe = () => {
    addRecipe(newRecipeName);
  };

  const handleSuggestRecipes = () => {
    suggestRecipe(availableIngredients);
  };

  return (
    <div className="p-4 w-full mx-auto mt-20 flex flex-col items-center justify-between">
      <Tabs defaultValue="Add Recipe" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Add Recipe">Add Recipe</TabsTrigger>
          <TabsTrigger value="Suggest">Suggest Recipe</TabsTrigger>
        </TabsList>
        <TabsContent value="Add Recipe">
          <Card>
            <CardHeader>
              <CardTitle>Generate Recipe</CardTitle>
              <CardDescription>Add recipe to your collection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Add Recipe Section */}
              <div className="mb-4">
                <Input
                  value={newRecipeName}
                  onChange={(e) => setNewRecipeName(e.target.value)}
                  placeholder="Dish Name"
                  className="mb-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddRecipe} className="flex-1">
                Generate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Suggest">
          <Card>
            <CardHeader>
              <CardTitle>Suggest Recipe</CardTitle>
              <CardDescription>
                Recipe will be suggested based on the available ingredients.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="mb-4">
                <Input
                  value={availableIngredients}
                  onChange={(e) => setAvailableIngredients(e.target.value)}
                  placeholder="Available Ingredients (comma separated)"
                  className="mb-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSuggestRecipes} className="w-full">
                Suggest Recipes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>


      {/* Recipe Cards */}
      <div className="flex gap-5 mt-10 w-full flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.name}
            recipe={recipe}
            deleteRecipe={deleteRecipe}
          />
        ))}
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe, deleteRecipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="w-full sm:w-80 h-50 cursor-pointer  hover:shadow-lg transition-all"
        onClick={() => setIsModalOpen(true)} // Open modal on card click
      >
        <CardHeader>
          <CardTitle className="text-2xl mb-5">{recipe.name}</CardTitle>
          <CardContent>
          Ingredients: {recipe.ingredients.slice(0, 3).join(", ")}...
          </CardContent>
        </CardHeader>
      </Card>

      {/* Recipe Modal (Popup) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>{recipe.name}</DialogTitle>
            <DialogDescription>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
            </DialogDescription>
          </DialogHeader>

          <CardContent>
            <p>
              <strong>Instructions:</strong> {recipe.instructions.join(" ")}
            </p>
            <br />
            <p>
              <strong>Tips:</strong> {recipe.tips.join(" ")}
            </p>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button
              variant="destructive"
              onClick={() => {
                deleteRecipe(recipe.name);
                setIsModalOpen(false); // Close modal after delete
              }}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </DialogClose>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeList;
