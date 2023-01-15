-- A couple dummy users, Alice and Bob
INSERT INTO users (username, email, password)
    VALUES ('alice', 'alice@email.com', '1234');
INSERT INTO users (username, email, password)
    VALUES ('bob', 'bob@email.com', '1234');

-- A couple dummy posts by Alice
INSERT INTO posts (title, body, author_id)
    VALUES ('First Post', 'This is the body of the first post.', (SELECT id FROM users WHERE username = 'alice'));
INSERT INTO posts (title, body, author_id)
    VALUES ('Second Post', 'This is the body of the second post.', (SELECT id FROM users WHERE username = 'alice'));

-- A couple dummy posts by Bob
INSERT INTO posts (title, body, author_id)
    VALUES ('Third Post', 'This is the body of the third post.', (SELECT id FROM users WHERE username = 'bob'));
INSERT INTO posts (title, body, author_id)
    VALUES ('Fourth Post', 'This is the body of the fourth post.', (SELECT id FROM users WHERE username = 'bob'));
