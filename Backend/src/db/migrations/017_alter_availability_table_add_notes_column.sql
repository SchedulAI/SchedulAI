-- Adicionar a coluna 'notes' do tipo 'text'
ALTER TABLE IF EXISTS availability
ADD COLUMN IF NOT EXISTS notes TEXT;