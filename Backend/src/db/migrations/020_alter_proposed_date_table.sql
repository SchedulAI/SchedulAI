-- Primeiro, remova a chave primária existente
ALTER TABLE proposed_date DROP CONSTRAINT proposed_date_pkey;

-- Adicione uma nova coluna id do tipo uuid
ALTER TABLE proposed_date ADD COLUMN new_id uuid DEFAULT uuid_generate_v4();

-- Remova a coluna id antiga
ALTER TABLE proposed_date DROP COLUMN id;

-- Renomeie a nova coluna para id
ALTER TABLE proposed_date RENAME COLUMN new_id TO id;

-- Por fim, redefina a chave primária
ALTER TABLE proposed_date ADD PRIMARY KEY (id);

ALTER TABLE proposed_date
ALTER COLUMN proposed_date TYPE TIMESTAMPTZ USING proposed_date::TIMESTAMPTZ;