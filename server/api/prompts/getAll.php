<?php
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../../config/db.php';

$stmt = $pdo->query("
  SELECT 
    p.*, 
    u.username AS author_name
  FROM prompts p
  LEFT JOIN users u ON p.user_id = u.id
  ORDER BY p.created_at DESC
");

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($rows as &$row) {
  $row['tags'] = $row['tags'] ? json_decode($row['tags'], true) : [];
}

echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);