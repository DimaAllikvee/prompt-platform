import { useState, useEffect } from "react";
import { Input, Textarea, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreatePrompt() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("text");
    const [tagsText, setTagsText] = useState("");
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    const save = async (event) => {
        event.preventDefault();


        const promptData = {
            slug: title.toLowerCase().replace(/\s+/g, '-'), // простая генерация slug
            title,
            type,
            tags: tagsText,
            prompt,
            user_id: user?.sub,
        };

        try {
            await fetch("http://localhost/server/api/prompts/createPrompt.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(promptData),
            });
            navigate("/browse");
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Проверка авторизации...</p>
            </div>
        );
    }


    if (!isAuthenticated) return null;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Share Prompt</h1>

            <form onSubmit={save} className="flex flex-col gap-4">
                <Input
                    label="Title"
                    placeholder="Название вашего промпта"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium px-1">Type</label>
                    <select
                        className="border border-default-200 rounded-xl px-3 py-2 bg-background hover:border-default-400 transition-colors outline-none"
                        value={type}
                        onChange={event => setType(event.target.value)}
                    >
                        <option value="video">video</option>
                        <option value="storyboard">storyboard</option>
                        <option value="text">text</option>
                    </select>
                </div>

                <Input
                    label="Tags (comma separated)"
                    placeholder="anime, intro, Sora2"
                    value={tagsText}
                    onChange={event => setTagsText(event.target.value)}
                />

                <Textarea
                    label="Prompt"
                    placeholder="Введите сам текст промпта здесь..."
                    minRows={8}
                    value={prompt}
                    onChange={event => setPrompt(event.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="flat" onPress={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Save Prompt
                    </Button>
                </div>
            </form>
        </div>
    );
}