INSERT INTO users (public_id, name, email, password_hash, role, is_active, email_verified) VALUES
('user-demo-001', 'Ava Patel', 'ava@example.com', 'pbkdf2:sha256:260000$demo$placeholder', 'user', 1, 1),
('admin-demo-001', 'Noah Singh', 'admin@example.com', 'pbkdf2:sha256:260000$demo$placeholder', 'admin', 1, 1);

INSERT INTO bus_passes (public_id, user_id, route, pass_type, amount, status, notes) VALUES
('pass-demo-001', 1, 'Central - Airport', 'monthly', 45.0, 'approved', 'Sample approved pass');
