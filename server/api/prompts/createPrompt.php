<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    http_response_code(204); 
    exit; 
}

session_start();

$data = json_decode(file_get_contents("php://input"), true);

$slug   = $data['slug']   ?? '';
$title  = $data['title']  ?? '';
$type   = $data['type']   ?? 'text';
$tags   = $data['tags']   ?? '';
$prompt = $data['prompt'] ?? '';

$tagsJson = json_encode(array_map('trim', explode(',', $tags)), JSON_UNESCAPED_UNICODE);

$userId = $_SESSION['user_id'] ?? null;

$stmt = $pdo->prepare("
  INSERT INTO prompts (slug, title, type, tags, prompt, created_at, user_id)
  VALUES (?, ?, ?, ?, ?, NOW(), ?)
");
$stmt->execute([$slug, $title, $type, $tagsJson, $prompt, $userId]);

echo json_encode([
    "ok" => true, 
    "id" => $pdo->lastInsertId(),
    "user_id" => $userId
]);