DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'messages' AND column_name = 'sender_type'
    ) THEN
        ALTER TABLE messages
        RENAME COLUMN sender_type TO sender;
        
        RAISE NOTICE 'Renamed column sender_type to sender in messages table';
    ELSE
        RAISE NOTICE 'Column sender_type does not exist in messages table, no renaming performed';
    END IF;
END $$;