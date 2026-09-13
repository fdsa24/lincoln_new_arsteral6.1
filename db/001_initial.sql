BEGIN;
CREATE TABLE IF NOT EXISTS lincoln_sessions (
  id uuid PRIMARY KEY,
  owner_hash char(64) NOT NULL,
  preset_snapshot jsonb NOT NULL,
  mode text NOT NULL CHECK (mode IN ('demo', 'live')),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS lincoln_sessions_owner_idx ON lincoln_sessions(owner_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS lincoln_sessions_expiry_idx ON lincoln_sessions(expires_at);
CREATE TABLE IF NOT EXISTS lincoln_turns (
  session_id uuid NOT NULL REFERENCES lincoln_sessions(id) ON DELETE CASCADE,
  request_id uuid NOT NULL,
  seq integer NOT NULL,
  text text NOT NULL CHECK (char_length(text) BETWEEN 1 AND 4000),
  state text NOT NULL CHECK (state IN ('pending', 'complete', 'failed', 'blocked')),
  answer jsonb,
  error_code text,
  lease_until timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (session_id, request_id),
  UNIQUE (session_id, seq)
);
CREATE TABLE IF NOT EXISTS lincoln_quotas (
  bucket text PRIMARY KEY,
  used integer NOT NULL CHECK (used >= 0),
  expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS lincoln_quotas_expiry_idx ON lincoln_quotas(expires_at);
COMMIT;
