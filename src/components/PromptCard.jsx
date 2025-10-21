import { Card, CardHeader, CardBody, CardFooter, Chip, Button } from "@heroui/react";

const PromptCard = (props) => {
    const { title, type, tags = [], prompt = "" } = props;

    const copyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    return (
        <Card className="max-w-full" shadow="sm">
            <CardHeader className="flex flex-col items-start gap-1">
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h3>
                <Chip size="sm" variant="flat">{type}</Chip>
            </CardHeader>

            <CardBody className="flex flex-col gap-3">
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {tags.map((tags) => (
                        <Chip key={tags} size="sm" variant="bordered">{tags}</Chip>
                    ))}
                </div>

                <div style={{ whiteSpace: "pre-wrap", color: "#333" }}>
                    {prompt || "-"}
                </div>
            </CardBody>

            <CardFooter className="flex justify-end">
                <Button size="sm" onPress={copyPrompt}>Copy prompt</Button>
            </CardFooter>
        </Card>
    );
};

export default PromptCard;
