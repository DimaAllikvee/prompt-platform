import { Card, CardHeader, CardBody, CardFooter, Chip, Button, Avatar } from "@heroui/react";

const PromptCard = (props) => {
    const { title, type, tags = [], prompt = "", authorName, createdAt, onTagClick } = props;

    const copyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            video: "primary",
            storyboard: "secondary",
            text: "success"
        };
        return colors[type] || "default";
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <Card className="max-w-full hover:shadow-lg transition-shadow" shadow="sm">
            <CardHeader className="flex flex-col items-start gap-3 pb-2">
                <div className="flex justify-between items-start w-full">
                    <h3 style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "black",
                        lineHeight: 1.3
                    }}>
                        {title}
                    </h3>
                    <Chip
                        size="sm"
                        variant="flat"
                        color={getTypeColor(type)}
                        style={{ fontWeight: 600 }}
                    >
                        {type}
                    </Chip>
                </div>

                {authorName && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%"
                    }}>
                        <Avatar
                            name={authorName}
                            size="sm"
                            style={{
                                width: 28,
                                height: 28,
                                fontSize: 12
                            }}
                        />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}>
                            <span style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#333"
                            }}>
                                {authorName}
                            </span>
                            {createdAt && (
                                <span style={{
                                    fontSize: 12,
                                    color: "#999"
                                }}>
                                    {formatDate(createdAt)}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </CardHeader>

            <CardBody className="flex flex-col gap-3 pt-2">
                {tags.length > 0 && (
                    <div style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap"
                    }}>
                        {tags.map((tag) => (
                            <Chip
                                key={tag}
                                size="sm"
                                variant="bordered"
                                onClick={() => onTagClick && onTagClick(tag)}
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                                className="hover:bg-gray-100"
                            >
                                #{tag}
                            </Chip>
                        ))}
                    </div>
                )}

                <div style={{
                    whiteSpace: "pre-wrap",
                    color: "#444",
                    fontSize: 14,
                    lineHeight: 1.6,
                    padding: "8px 0",
                    borderRadius: 6
                }}>
                    {prompt || "-"}
                </div>
            </CardBody>

            <CardFooter className="flex justify-between items-center pt-2">
                <div style={{ fontSize: 12, color: "#999" }}>
                    {prompt.length} characters
                </div>
                <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={copyPrompt}
                >
                    Copy prompt
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PromptCard;