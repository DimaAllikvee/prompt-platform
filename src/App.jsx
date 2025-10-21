import './App.css'
import { HeroUIProvider } from "@heroui/react"
import PromptList from "./components/PromptList.jsx"

function App() {
    return (
        <HeroUIProvider>
            <PromptList />
        </HeroUIProvider>
    )
}

export default App
