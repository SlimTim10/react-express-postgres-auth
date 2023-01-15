-- A couple dummy users, Alice and Bob
INSERT INTO users (id, username, email, password)
    VALUES (1, 'alice', 'alice@email.com', '1234');
INSERT INTO users (id, username, email, password)
    VALUES (2, 'bob', 'bob@email.com', '1234');

-- A couple dummy posts by Alice
INSERT INTO posts (id, title, body, author_id)
    VALUES (1, 'First Post', 'This is the body of the first post.', 1);
INSERT INTO posts (id, title, body, author_id)
    VALUES (2, 'Second Post', 'This is the body of the second post.', 1);

-- A couple dummy posts by Bob
INSERT INTO posts (id, title, body, author_id)
    VALUES (3, 'Third Post', 'This is the body of the third post.', 2);
INSERT INTO posts (id, title, body, author_id)
    VALUES (4, 'Fourth Post', 'This is the body of the fourth post.', 2);
