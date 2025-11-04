<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require __DIR__ . '/../config/db.php'; 

session_start(); 

$email    = $_POST['email']    ?? '';
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
  echo json_encode(['success' => false, 'message' => 'Please fill in all fields']);
  exit;
}

try {
  
  $stmt = $pdo->prepare('SELECT id, password, username FROM users WHERE email = ? LIMIT 1');
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if (!$user) {
    echo json_encode(['success' => false, 'message' => 'Email not found']);
    exit;
  }

  
  if ($password !== $user['password']) {
    echo json_encode(['success' => false, 'message' => 'Incorrect password']);
    exit;
  }

 
  $_SESSION['user_id']  = $user['id'];
  $_SESSION['email']    = $email;
  $_SESSION['username'] = $user['username'];

  echo json_encode(['success' => true, 'message' => 'Login successful']);
} catch (Throwable $e) {
  echo json_encode(['success' => false, 'message' => 'Database error']);
}

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
      'id' => $user['id'],
      'username' => $user['username']
    ]
  ]);
?>  