<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require __DIR__ . '/../config/db.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Invalid method']); exit;
    }

    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === '' || $email === '' || $password === '') {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields']); exit;
    }

    $q = $pdo->prepare('SELECT 1 FROM users WHERE email = ? LIMIT 1');
    $q->execute([$email]);
    if ($q->fetchColumn()) {
        echo json_encode(['success' => false, 'message' => 'Email already exists']); exit;
    }

    $ins = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    $ins->execute([$username, $email, $password]);

    echo json_encode(['success' => true, 'message' => 'Account created successfully']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
