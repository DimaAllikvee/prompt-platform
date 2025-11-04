<?php

require __DIR__ . '/../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$data   = json_decode(file_get_contents("php://input"), true);

$slug   = $data['slug']   ?? '';
$title  = $data['title']  ?? '';
$type   = $data['type']   ?? 'text';
$tags   = $data['tags']   ?? '';
$prompt = $data['prompt'] ?? '';
$userId = $data['user_id'] ?? null;

if (!$userId) {
  echo json_encode(["ok" => false, "error" => "Missing user id"]);
  exit;
}



$tagsJson = json_encode(array_map('trim', explode(',', $tags)), JSON_UNESCAPED_UNICODE);

$stmt = $pdo->prepare("
  INSERT INTO prompts (slug, title, type, tags, prompt, created_at)
  VALUES (?, ?, ?, ?, ?, NOW())
");
$stmt->execute([$slug, $title, $type, $tagsJson, $prompt]);

echo json_encode(["ok" => true, "id" => $pdo->lastInsertId()]);