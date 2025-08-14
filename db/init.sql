CREATE TABLE IF NOT EXISTS product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    review_text TEXT,
    review_date DATE,
    sentiment VARCHAR(10),
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
