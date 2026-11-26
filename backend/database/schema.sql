
-- Table 1: Companies
CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    system_prompt TEXT DEFAULT 'You are a helpful assistant.',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Users
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT,
    role TEXT NOT NULL DEFAULT 'customer'
        CHECK (role IN ('admin', 'customer')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (company_id, email),
    UNIQUE (company_id, id),

    FOREIGN KEY (company_id)
        REFERENCES companies(id) ON DELETE CASCADE
);

-- Table 3: Conversations
CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    title TEXT DEFAULT 'New Conversation',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (company_id)
        REFERENCES companies(id) ON DELETE CASCADE,

    FOREIGN KEY (company_id, user_id)
        REFERENCES users(company_id, id)
        ON DELETE CASCADE
);

-- Table 4: Messages
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER NOT NULL,
    role TEXT NOT NULL
        CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (conversation_id)
        REFERENCES conversations(id) ON DELETE CASCADE
);


-- Table 5: Documents
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    uploaded_by INTEGER NOT NULL,
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    mime_type TEXT,
    file_size INTEGER,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN (
            'pending',
            'processing',
            'completed',
            'failed'
        )),
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (company_id)
        REFERENCES companies(id) ON DELETE CASCADE,

    FOREIGN KEY (company_id, uploaded_by)
        REFERENCES users(company_id, id)
);

-- Table 6: Document chunks
CREATE TABLE IF NOT EXISTS document_chunks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id INTEGER NOT NULL,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    embedding BLOB,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (document_id, chunk_index),

    FOREIGN KEY (document_id)
        REFERENCES documents(id) ON DELETE CASCADE
);


-- database indexes

CREATE INDEX IF NOT EXISTS idx_users_company
ON users(company_id);

CREATE INDEX IF NOT EXISTS idx_conversations_user
ON conversations(company_id, user_id);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
ON messages(conversation_id);

CREATE INDEX IF NOT EXISTS idx_documents_company
ON documents(company_id);
