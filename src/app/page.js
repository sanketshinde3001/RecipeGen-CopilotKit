// pages/index.js
import { RecipeProvider } from "./context/RecipeContext"; // Update to RecipeProvider
import RecipeList from "./components/RecipeList"; // Update to RecipeList
import { CopilotPopup } from "@copilotkit/react-ui";
import { ModeToggle } from "@/components/Toggle";

export default function Home() {
  return (
    <>
    <nav className="w-full bg-white  dark:bg-black border-b-2 border-indigo-500 py-4 max-sm:px-5 px-20 fixed ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="text-lg font-semibold text-black dark:text-white">
          Recipe Gen
        </div>

        {/* Right Side */}
        <div className="text-lg font-semibold text-gray-500">
          <ModeToggle/>
        </div>
      </div>
    </nav>
      <RecipeProvider>
        <div className="container mx-auto p-4">
          <RecipeList /> 
        </div>
      </RecipeProvider>
      <CopilotPopup
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Recipe Generator",
          initial: "What dish you want to eat ? ",
        }}
      />
    </>
  );
}
